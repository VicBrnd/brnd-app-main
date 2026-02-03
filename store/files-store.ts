import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewMode = "grid" | "list";

interface FilesStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useFilesStore = create<FilesStore>()(
  persist(
    (set) => ({
      viewMode: "list",
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "files-store",
      partialize: (state) => ({ viewMode: state.viewMode }),
    },
  ),
);
