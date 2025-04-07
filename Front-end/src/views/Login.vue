<template>
  <div class="flex flex-center">
    <q-card class="q-pa-md bg-red" style="min-width:350px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          lazy-rules
          :rules="[val => !!val || 'Email obrigatório']"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="password"
          label="Senha"
          type="password"
          lazy-rules
          :rules="[val => !!val || 'Senha obrigatória']"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="handleLogin" />
      </q-card-actions>
      <q-card-section class="text-center">
        <q-btn flat label="Registrar" @click="goToRegister" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Apenas criamos as variáveis de email e senha, sem lógica de autenticação
const email = ref('')
const password = ref('')

// Funções de navegação (caso necessário)
function handleLogin() {
  console.log("Botão de login pressionado!")
}

function goToRegister() {
  console.log("Redirecionar para o registro")
}
</script>
