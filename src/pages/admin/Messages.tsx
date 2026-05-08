import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Trash2, Loader2, ChevronRight, User, Phone, Clock, X, Inbox } from 'lucide-react';
import { db } from '@/src/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: any;
}

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
      setMessages(msgs);
      setLoading(false);
    }, (err) => {
      console.error('Messages listener error:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const markAsRead = async (msg: ContactMessage) => {
    if (!msg.read) {
      await updateDoc(doc(db, 'contact_messages', msg.id), { read: true });
    }
    setSelectedMessage(msg);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'contact_messages', id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return '—';
    const d = timestamp.toDate();
    return d.toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-32">
        <Loader2 className="w-8 h-8 animate-spin text-brand-accent mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Loading messages…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">
            CONTACT<br />MESSAGES.
          </h2>
          <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">
            {messages.length} total · {unreadCount} unread
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-brand-dark border border-brand-text/5 p-16 text-center">
          <Inbox className="w-12 h-12 text-brand-text/10 mx-auto mb-6" />
          <p className="text-xs font-black uppercase tracking-widest text-brand-muted">No messages yet</p>
          <p className="text-[10px] text-brand-muted/60 uppercase tracking-wider mt-2 font-bold">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2 space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-brand-dark border p-5 cursor-pointer transition-all group relative ${
                  selectedMessage?.id === msg.id
                    ? 'border-brand-accent'
                    : msg.read
                      ? 'border-brand-text/5 hover:border-brand-text/20'
                      : 'border-brand-accent/30 hover:border-brand-accent/60'
                }`}
                onClick={() => markAsRead(msg)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {!msg.read ? (
                      <Mail className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-brand-muted/40 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <div className={`text-xs font-black uppercase tracking-widest truncate ${!msg.read ? 'text-brand-text' : 'text-brand-text/70'}`}>
                        {msg.name}
                      </div>
                      <div className="text-[10px] text-brand-muted font-bold truncate mt-1">{msg.email}</div>
                      <div className="text-[10px] text-brand-muted/60 font-bold truncate mt-1 leading-relaxed line-clamp-2">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-brand-muted/50 whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </span>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_6px_var(--color-brand-accent)]"></span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail Pane */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-brand-dark border border-brand-text/5 p-8 md:p-10 sticky top-28"
                >
                  <div className="flex items-start justify-between mb-8 pb-6 border-b border-brand-text/10">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-1">{selectedMessage.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                        <span className="flex items-center"><Mail className="w-3 h-3 mr-1.5 text-brand-accent" />{selectedMessage.email}</span>
                        {selectedMessage.phone && (
                          <span className="flex items-center"><Phone className="w-3 h-3 mr-1.5 text-brand-accent" />{selectedMessage.phone}</span>
                        )}
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5 text-brand-accent" />{formatDate(selectedMessage.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        disabled={deletingId === selectedMessage.id}
                        className="p-2 text-brand-muted hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all disabled:opacity-50"
                        title="Delete message"
                      >
                        {deletingId === selectedMessage.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-text/5 transition-all lg:hidden"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-brand-text/80 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>

                  <div className="mt-10 pt-6 border-t border-brand-text/10">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry to itSMF Zambia`}
                      className="bg-brand-accent text-brand-dark px-8 py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-text transition-all inline-flex items-center"
                    >
                      Reply via Email <ChevronRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-brand-dark border border-brand-text/5 border-dashed p-16 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <Mail className="w-10 h-10 text-brand-text/10 mb-6" />
                  <p className="text-xs font-black uppercase tracking-widest text-brand-muted">Select a message to read</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
