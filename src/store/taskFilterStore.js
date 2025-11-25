"use client";

import { create } from "zustand";

export const useTaskFilterStore = create((set) => ({
  status: "all",
  priority: "all",
  search: "",
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setSearch: (search) => set({ search }),
}));
