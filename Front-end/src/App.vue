<template>
  <q-layout>
  <q-page-container>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="min-width: 300px; max-width: 400px;">
      <q-card-section>
        <div class="text-h6 q-mb-md">teste</div>
        <q-form @submit="onLoginSubmit">
          <q-input
            v-model="username"
            label="Usuário"
            type="text"
            autofocus
            required
          />
          <q-input
            v-model="password"
            label="Senha"
            type="password"
            required
          />
          <q-btn
            label="Entrar"
            color="primary"
            type="submit"
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</q-page-container>
</q-layout>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const onLoginSubmit = () => {
  if (username.value && password.value) {
    console.log('Login enviado:', { username: username.value, password: password.value });
    // Aqui você pode adicionar a lógica para enviar as credenciais para o servidor.
  } else {
    console.log('Por favor, preencha todos os campos!');
  }
};
</script>

<style scoped>
.q-page {
  background-color: #3f2068;
}
</style>
