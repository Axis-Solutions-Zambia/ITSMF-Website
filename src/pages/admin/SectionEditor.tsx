import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, Save, CheckCircle, AlertCircle,
  ArrowLeft, Eye, EyeOff, Loader2, RefreshCw, Plus, Trash2, GripVertical
} from 'lucide-react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { SECTION_SCHEMAS, FieldDef } from '@/src/lib/sectionSchemas';
import { uploadToCloudinary } from '@/src/lib/cloudinary';
import { UploadCloud, ImageIcon } from 'lucide-react';

type ToastType = 'success' | 'error' | null;

function Toast({ type, message }: { type: ToastType; message: string }) {
  if (!type) return null;
  const isSuccess = type === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-8 right-8 z-50 flex items-center px-6 py-4 shadow-2xl border font-black text-xs uppercase tracking-[0.2em] ${
        isSuccess
          ? 'bg-green-500/10 border-green-500 text-green-500'
          : 'bg-red-500/10 border-red-500 text-red-500'
      }`}
    >
      {isSuccess
        ? <CheckCircle className="w-4 h-4 mr-3 shrink-0" />
        : <AlertCircle className="w-4 h-4 mr-3 shrink-0" />}
      {message}
    </motion.div>
  );
}

function ImageUploadField({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder?: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {value ? (
        <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-brand-text/10 group bg-brand-bg">
          <img src={value} alt="Preview" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
             <label className="cursor-pointer px-4 py-2 bg-brand-accent text-brand-dark font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-brand-text transition-colors">
               Change Image
               <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
             </label>
             <button type="button" onClick={() => onChange('')} className="mt-3 text-[10px] font-black uppercase tracking-widest text-brand-text hover:text-red-500 transition-colors">
               Remove
             </button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-brand-accent" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-sm relative">
          <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-text/20 rounded-lg bg-brand-bg/50 hover:bg-brand-bg hover:border-brand-accent transition-all cursor-pointer ${isUploading ? 'pointer-events-none opacity-50' : ''}`}>
            <UploadCloud className="w-6 h-6 text-brand-muted mb-2" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Upload Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
          </label>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-brand-accent" />
            </div>
          )}
        </div>
      )}
      
      {/* Fallback manual URL input */}
      <div className="flex items-center mt-2 space-x-2 w-full max-w-sm">
        <ImageIcon className="w-4 h-4 text-brand-muted shrink-0" />
        <input
          type="url"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Or paste an image URL directly...'}
          className="flex-1 bg-transparent border-b border-brand-text/10 text-[11px] font-medium text-brand-muted outline-none focus:border-brand-accent focus:text-brand-text transition-colors py-1"
        />
      </div>

      {error && <div className="text-[10px] font-black uppercase tracking-widest text-red-500">{error}</div>}
    </div>
  );
}

interface SectionEditorProps {
  pageId?: string;
  sectionId?: string;
  onClose?: () => void;
}

export default function SectionEditor({ pageId: propPageId, sectionId: propSectionId, onClose }: SectionEditorProps = {}) {
  const params = useParams<{ pageId: string; sectionId: string }>();
  const pageId = propPageId || params.pageId;
  const sectionId = propSectionId || params.sectionId;
  const navigate = useNavigate();

  const schema = pageId && sectionId ? SECTION_SCHEMAS[pageId]?.[sectionId] : null;

  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({ type: null, message: '' });

  // Load existing content from Firestore
  useEffect(() => {
    if (!pageId || !sectionId) return;

    async function loadContent() {
      setLoading(true);
      try {
        const ref = doc(db, 'pages', pageId!, 'sections', sectionId!);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setFormValues((data.content as Record<string, any>) ?? {});
        } else {
          setFormValues({});
        }
      } catch (err) {
        console.error('Failed to load section content:', err);
        setFormValues({});
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [pageId, sectionId]);

  function handleChange(key: string, value: any) {
    setFormValues(prev => ({ ...prev, [key]: value }));
  }

  function handleListChange(listKey: string, index: number, itemKey: string, value: string) {
    setFormValues(prev => {
      const currentList = Array.isArray(prev[listKey]) ? [...prev[listKey]] : [];
      if (!currentList[index]) {
        currentList[index] = {};
      }
      currentList[index] = { ...currentList[index], [itemKey]: value };
      return { ...prev, [listKey]: currentList };
    });
  }

  function handleAddListItem(listKey: string, itemFields: FieldDef[]) {
    setFormValues(prev => {
      const currentList = Array.isArray(prev[listKey]) ? [...prev[listKey]] : [];
      const newItem: Record<string, string> = {};
      itemFields.forEach(f => {
        newItem[f.key] = ''; // Initialize empty fields
      });
      currentList.push(newItem);
      return { ...prev, [listKey]: currentList };
    });
  }

  function handleRemoveListItem(listKey: string, index: number) {
    setFormValues(prev => {
      const currentList = Array.isArray(prev[listKey]) ? [...prev[listKey]] : [];
      currentList.splice(index, 1);
      return { ...prev, [listKey]: currentList };
    });
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message });
    setTimeout(() => setToast({ type: null, message: '' }), 4000);
  }

  async function handleSave() {
    if (!pageId || !sectionId) return;
    setSaving(true);
    try {
      await setDoc(
        doc(db, 'pages', pageId, 'sections', sectionId),
        { content: formValues },
        { merge: true }
      );
      // Also update the parent page's lastEdited timestamp
      await setDoc(
        doc(db, 'pages', pageId),
        { lastEdited: serverTimestamp() },
        { merge: true }
      );
      showToast('success', 'Section published successfully');
    } catch (err) {
      console.error('Failed to save:', err);
      showToast('error', 'Save failed — check your connection');
    } finally {
      setSaving(false);
    }
  }

  if (!schema) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 md:py-32 text-center">
        <AlertCircle className="w-10 h-10 text-brand-muted mb-6" />
        <p className="text-xs font-black uppercase tracking-widest text-brand-muted">
          Section schema not found for <span className="text-brand-accent">{pageId} / {sectionId}</span>
        </p>
        <button
          onClick={() => navigate(`/admin/content/${pageId}`)}
          className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent hover:underline flex items-center"
        >
          <ArrowLeft className="w-3 h-3 mr-2" /> Back to Page
        </button>
      </div>
    );
  }

  const renderFieldInput = (field: FieldDef, value: any, onChange: (val: string) => void) => {
    if (field.type === 'textarea') {
      return (
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-4 py-3 bg-brand-bg border border-brand-text/10 text-sm font-medium text-brand-text placeholder-brand-muted/40 outline-none focus:border-brand-accent transition-colors resize-y leading-relaxed"
        />
      );
    }
    if (field.type === 'image') {
      return <ImageUploadField value={value ?? ''} onChange={onChange} placeholder={field.placeholder} />;
    }
    return (
      <input
        type={field.type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full px-4 py-3 bg-brand-bg border border-brand-text/10 text-sm font-medium text-brand-text placeholder-brand-muted/40 outline-none focus:border-brand-accent transition-colors"
      />
    );
  };

  const isPanel = !!onClose;

  return (
    <div className={isPanel ? "h-full flex flex-col" : "max-w-4xl"}>
      {/* Breadcrumb / Close Button */}
      {isPanel ? (
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-text/10">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Edit Section</span>
          <button 
            onClick={onClose}
            className="text-[10px] font-black uppercase tracking-widest text-brand-accent hover:text-brand-text transition-colors"
          >
            Close Panel
          </button>
        </div>
      ) : (
        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-brand-muted mb-8 flex-wrap gap-1">
          <Link to="/admin/content" className="hover:text-brand-accent transition-colors">Content</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/admin/content/${pageId}`} className="hover:text-brand-accent transition-colors capitalize">{pageId}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-text">{schema.name}</span>
        </div>
      )}

      {/* Header */}
      <div className={`flex flex-col ${isPanel ? 'gap-4 mb-8' : 'md:flex-row justify-between items-start md:items-center gap-6 mb-10'}`}>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">
            {schema.name}
          </h2>
          {schema.description && (
            <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">{schema.description}</p>
          )}
        </div>
        <div className="flex space-x-3">
          {!isPanel && (
            <a
              href={pageId === 'site' ? (sectionId === 'privacy' ? '/privacy' : '/') : `/${pageId === 'home' ? '' : pageId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center px-5 py-3 border border-brand-text/10 text-[10px] font-black uppercase tracking-[0.3em] hover:border-brand-accent transition-all"
            >
              <Eye className="w-4 h-4 mr-2" /> Preview
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center px-6 py-3 bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-text transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
          >
            {saving
              ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              : <Save className="w-4 h-4 mr-2" />}
            {saving ? 'Saving…' : 'Publish Changes'}
          </button>
        </div>
      </div>

      {/* Form */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 border border-brand-text/5 bg-brand-dark">
          <Loader2 className="w-8 h-8 animate-spin text-brand-accent mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Loading content from Firestore…</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-dark border border-brand-text/5 divide-y divide-brand-text/5"
        >
          {/* Section Visibility Toggle */}
          <div className="p-6 bg-brand-bg/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-brand-text mb-2">Section Visibility</div>
              <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest leading-relaxed">
                Turn this off to hide the section from the public website. You can still edit it here.
              </div>
            </div>
            <button
              onClick={() => setFormValues({ ...formValues, _hidden: formValues._hidden === 'true' ? 'false' : 'true' })}
              className={`w-14 h-7 rounded-full transition-colors relative shrink-0 ${formValues._hidden === 'true' ? 'bg-red-500/20 border border-red-500/50' : 'bg-green-500'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-brand-dark absolute top-[3px] transition-all ${formValues._hidden === 'true' ? 'left-[3px] bg-red-500' : 'left-[32px] bg-brand-dark'}`} />
            </button>
          </div>

          {schema.fields.map((field) => (
            <div key={field.key} className="p-6 relative group transition-colors">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">
                  {field.label}
                  {field.hint && (
                    <span className="ml-3 font-bold normal-case tracking-normal text-brand-muted/60">{field.hint}</span>
                  )}
                </label>
                <button
                  title={`Toggle visibility of ${field.label}`}
                  onClick={() => setFormValues({ ...formValues, [`_hide_${field.key}`]: formValues[`_hide_${field.key}`] === 'true' ? 'false' : 'true' })}
                  className={`flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest transition-colors ${formValues[`_hide_${field.key}`] === 'true' ? 'text-red-500' : 'text-brand-accent hover:text-brand-text'}`}
                >
                  {formValues[`_hide_${field.key}`] === 'true' ? (
                    <><EyeOff className="w-3 h-3" /> <span>Hidden</span></>
                  ) : (
                    <><Eye className="w-3 h-3" /> <span className="opacity-0 group-hover:opacity-100 transition-opacity">Visible</span></>
                  )}
                </button>
              </div>

              <div className={`${formValues[`_hide_${field.key}`] === 'true' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                {field.type === 'list' && field.itemFields ? (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {(Array.isArray(formValues[field.key]) ? formValues[field.key] : []).map((item: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-brand-bg border border-brand-text/10 p-4 relative group"
                        >
                          <div className="absolute top-4 right-4 flex items-center space-x-2">
                            <span className="text-[9px] font-black text-brand-muted font-mono uppercase tracking-widest">Item {index + 1}</span>
                            <button
                              onClick={() => handleRemoveListItem(field.key, index)}
                              className="p-1.5 text-brand-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Remove Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="pr-16 space-y-4">
                            {field.itemFields!.map(itemField => (
                              <div key={itemField.key}>
                                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">
                                  {itemField.label}
                                </label>
                                {renderFieldInput(itemField, item[itemField.key], (val) => handleListChange(field.key, index, itemField.key, val))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    <button
                      onClick={() => handleAddListItem(field.key, field.itemFields!)}
                      className="flex items-center px-4 py-3 border border-brand-text/10 text-[10px] font-black uppercase tracking-[0.3em] text-brand-text hover:border-brand-accent hover:text-brand-accent transition-all w-full justify-center border-dashed"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add {field.label} Item
                    </button>
                  </div>
                ) : (
                  renderFieldInput(field, formValues[field.key], (val) => setFormValues({ ...formValues, [field.key]: val }))
                )}
              </div>
            </div>
          ))}

          {/* Reset to Firestore Button */}
          <div className="p-6 flex justify-end">
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  const ref = doc(db, 'pages', pageId!, 'sections', sectionId!);
                  const snap = await getDoc(ref);
                  if (snap.exists()) {
                    setFormValues((snap.data().content as Record<string, any>) ?? {});
                  }
                } finally {
                  setLoading(false);
                }
              }}
              className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted hover:text-brand-text transition-colors"
            >
              <RefreshCw className="w-3 h-3 mr-2" /> Reset to Saved
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {toast.type && <Toast type={toast.type} message={toast.message} />}
      </AnimatePresence>
    </div>
  );
}
