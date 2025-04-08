<template>
  <div class="flex flex-center">
    <q-card class="q-pa-md" style="min-width: 350px; width: 100%;">
      <q-card-section>
        <div class="text-h6">Registro</div>
      </q-card-section>
      <q-card-section>
        <!-- Campo nome -->
        <q-input
          filled
          v-model="name"
          label="Nome"
          lazy-rules
          :rules="[val => !!val || 'Nome é obrigatório']"
          class="q-mt-md"
        />
        <!-- Campo email -->
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          lazy-rules
          :rules="[val => !!val || 'Email é obrigatório']"
          class="q-mt-md"
        />
        <!-- Campo senha -->
        <q-input
          filled
          v-model="password"
          label="Senha"
          type="password"
          lazy-rules
          :rules="[val => !!val || 'Senha é obrigatória']"
          class="q-mt-md"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Registro" color="primary" @click="handleRegister" />
      </q-card-actions>
      <q-card-section class="text-center">
        <q-btn flat label="Você já possui conta? Se sim, clique aqui" @click="goToLogin" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function handleRegister() {
  try {
    const response = await axios.post('http://localhost:5173/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    const token = response.data.token
    authStore.setToken(token)
    router.push('/')  // Navega para a página principal ou dashboard
  } catch (error) {
    console.error('Erro no registro, entre em contato com o suporte', error)
  }
}

function goToLogin() {
  router.push('/login')
}
</script>
