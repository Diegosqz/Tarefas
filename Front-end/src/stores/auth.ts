import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as any, // ou você pode tipar corretamente seu objeto de usuário
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    clearAuth() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});
