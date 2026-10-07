import { create } from 'zustand';

export const useCrmStore = create((set, get) => ({
  // Navigation & View
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab, isCopilotOpen: false }),

  // Multi-Tenant Org
  currentOrg: 'Acme Enterprise Corp',
  setOrg: (org) => set({ currentOrg: org }),
  availableOrgs: ['Acme Enterprise Corp'],

  // 5-Tier RBAC Role
  currentRole: 'super_admin',
  setRole: (role) => set({ currentRole: role }),

  // Demo Mode
  demoMode: true,
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),

  // Modals & Drawers
  isCopilotOpen: false,
  setCopilotOpen: (open) => set({ isCopilotOpen: open }),
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  isDialerOpen: false,
  setDialerOpen: (open) => set({ isDialerOpen: open }),
  isBenchmarkOpen: false,
  setBenchmarkOpen: (open) => set({ isBenchmarkOpen: open }),

  // Active Customer for Customer 360 View
  activeCustomerId: null,
  setActiveCustomer: (id) => set({ activeCustomerId: id, activeTab: 'customer360', isCopilotOpen: false }),

  // Selected Lead for Lead Intelligence
  activeLeadId: null,
  setActiveLead: (id) => set({ activeLeadId: id, activeTab: 'leads', isCopilotOpen: false }),

  // Global Notifications Count
  notificationsCount: 0,
  securityAlertsCount: 0,

  // Global Search Query
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  // Copilot messages
  copilotMessages: [],
  addCopilotMessage: (msg) =>
    set((state) => ({
      copilotMessages: [...state.copilotMessages, { id: `msg-${Date.now()}`, ...msg }],
    })),
}));
