<template>
  <div class="q-pa-md" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
    <q-card class="q-pa-md bg-transparent" style="min-width: 350px; width: 100%;">
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
      <q-card-actions align="center">
        <q-btn label="Login" color="primary" @click="handleLogin" align="center" />
      </q-card-actions>
      <q-card-section class="text-center">
        <q-btn flat label="Registrar" :to="{name: 'register'}"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
// Apenas criamos as variáveis de email e senha, sem lógica de autenticação
const email = ref('')
const password = ref('')

const router = useRouter()

// Funções de navegação (caso necessário)
async function handleLogin() {
  console.log("Botão de login pressionado!")
  try {
  const response = await axios.post('http://localhost:5173/app/controllers/Http/login', {
    email: email.value,
    password: password.value
  })
  const token = response.data.token
  AuthStore.setToken(token)
  router.push('/')
} catch(error) {
  console.error("Erro ao fazer login:", error)
  alert("Erro ao fazer login. Verifique suas credenciais.")
}
}

function goToRegister() {
  console.log("Redirecionar para o registro")
  router.push({name: 'register'})
  // ideal utlizar o name pois, sendo assim quando voce precisar alterar a rota, apenas mudar o nome. router.push('/register ')

}
</script>
