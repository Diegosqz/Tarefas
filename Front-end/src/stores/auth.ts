import { defineStore } from 'pinia';

// TODO: Trocar store para composition api: https://pinia.vuejs.org/core-concepts/#Setup-Stores

// EX:
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const name = ref('Eduardo')
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, name, doubleCount, increment }
// })

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
