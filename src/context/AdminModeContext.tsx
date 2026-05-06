import React, { createContext, useContext, useState } from 'react';

interface AdminModeContextType {
  isAdminMode: boolean;
  pageId: string | null;
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
}

const AdminModeContext = createContext<AdminModeContextType>({
  isAdminMode: false,
  pageId: null,
  activeSectionId: null,
  setActiveSectionId: () => {},
});

export function useAdminMode() {
  return useContext(AdminModeContext);
}

export function AdminModeProvider({
  children,
  isAdminMode,
  pageId,
}: {
  children: React.ReactNode;
  isAdminMode: boolean;
  pageId: string | null;
}) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  return (
    <AdminModeContext.Provider
      value={{
        isAdminMode,
        pageId,
        activeSectionId,
        setActiveSectionId,
      }}
    >
      {children}
    </AdminModeContext.Provider>
  );
}
