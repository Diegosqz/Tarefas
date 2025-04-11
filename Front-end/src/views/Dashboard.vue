<template>
  <q-page>
    <div class="q-mb-md">
      <h4>Dashboard</h4>
      <q-separator />
    </div>

    <div class="row q-col-gutter-md q-mb-md">

      <q-card class="col-12 col-sm-4">
        <q-card-section>
          <div class="text-subtitle2">Tarefas Completas</div>
          <div class="text-h5 q-mt-sm">{{ completedTasksCount }}</div>
          <div class="text-caption text-grey">{{ completedPercentage }}% de todas as tarefas</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-4">
        <q-card-section>
          <div class="text-subtitle2">Tarefas pendentes</div>
          <div class="text-h5 q-mt-sm">{{ pendingTasksCount }}</div>
          <div class="text-caption text-grey">{{ pendingPercentage }}% de todas as tarefas</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-4">
        <q-card-section>
          <div class="text-subtitle2">Tarefas atrasadas</div>
          <div class="text-h5 q-mt-sm" :class="overdueTasksCount > 0 ? 'text-negative' : ''">
            {{ overdueTasksCount }}
          </div>
          <div class="text-caption text-grey">{{ overduePercentage }}% de todas as tarefas</div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <q-card class="col-12 col-sm-6">
        <q-card-section>
          <div class="text-subtitle1">Prazos</div>
          <div class="q-mt-sm">
            <div v-for="task in upcomingTasks" :key="task.id" class="row items-center q-mb-sm">
              <q-icon name="circle" :color="getStatusColor(task.status)" size="12px" class="q-mr-sm" />
              <div class="col">{{ task.titulo }}</div>
              <div class="text-caption text-grey">{{ formatDate(task.data) }}</div>
            </div>
          </div>
          <q-btn label="View all tasks" flat color="blue-3" class="q-mt-md" />
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-6">
        <q-card-section>
          <div class="text-subtitle1">Categorias</div>
          <div class="q-mt-md">
            <div v-for="category in taskCategories" :key="category.name" class="q-mb-md">
              <div class="row justify-between">
                <div>{{ category.name }}</div>
                <div>{{ category.count }}</div>
              </div>
              <q-linear-progress :value="category.count / tasks.length" color="blue-3" rounded />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row">
      <q-card class="col-12">
        <q-card-section>
          <div class="text-subtitle1">Tags</div>
          <div class="q-mt-md">
            <q-chip v-for="tag in taskTags" :key="tag" class="q-mr-sm" :color="getTagColor(tag)" text-color="white"
              outline :label="tag" />

          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <!-- <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-blue-3 text-white">
      <div class="row items-center justify-between q-px-md q-py-sm">
        <q-btn icon="menu" flat round @click="leftDrawerOpen = !leftDrawerOpen" class="q-mr-sm" />
        <div class="text-h6">Tarefas</div>
        <q-btn icon="add" round class="q-mr-md" @click="abrirModal = true" />
      </div>
    </q-header>

    <q-drawer side="left" show-if-above v-model="collapse" :mini="collapse" bordered :width="250"
      content-class="bg-white text-dark">
      <q-separator spaced />
    </q-drawer>

    <q-page-container align="center">
      <q-page class="q-pa-md">

      </q-page>
    </q-page-container>

    <q-dialog v-model="abrirModal">
      <q-card style="min-width: 300px;">
        <q-toolbar class="bg-blue-3 text-white"><q-toolbar-title class="text-white">
            Adicionar Tarefa
          </q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-card-section>
          <q-form @submit="adicionarTarefa">
            <q-input v-model="novaTarefa.titulo" label="Título" :rules="[val => !!val || 'Field is required']" />
            <q-select v-model="novaTarefa.categoria" label="Categoria" :options="['Trabalho', 'Pessoal', 'Estudo']"
              class="q-mt-sm" :rules="[val => !!val || 'Field is required']" />
            <q-input v-model="novaTarefa.data" type="date" label="Data" class="q-mt-sm"
              :rules="[val => !!val || 'Field is required']" />
            <q-select v-model="novaTarefa.status" label="Status" :options="['pendente', 'atrasado', 'concluido']"
              class="q-mt-sm" />
            <q-card-actions align="right" class="q-mt-md">
              <q-btn flat label="Cancelar" v-close-popup />
              <q-btn flat label="Adicionar" color="primary" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout> -->
</template>

<script setup lang="ts">
import type { ICreateUser } from '@/interfaces/IUser'
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

const { dialog } = useQuasar()

const leftDrawerOpen = ref(true)
const abrirModal = ref(false)

// User data
const usuario = ref<ICreateUser>({
  name: 'Diego',
  email: 'diego@example.com',
  avatar: 'https://cdn.quasar.dev/img/avatar.png',
  password: ''
})

// Menu items
const menuItems = ref([
  { name: 'dashboard', label: 'Dashboard', icone: 'dashboard' },
  { name: 'tasks', label: 'Tarefas', icone: 'checklist' },
  { name: 'calendar', label: 'Calendário', icone: 'event' },
  { name: 'settings', label: 'Configurações', icone: 'settings' }
])
const itemAtivo = ref('dashboard')

// Tasks management
const tasks = ref([
  {
    id: 1,
    titulo: 'Go grocery shopping',
    categoria: 'Personal',
    data: '2023-04-01',
    status: 'pending'
  },
  {
    id: 2,
    titulo: 'Complete project proposal',
    categoria: 'Work',
    data: '2023-04-02',
    status: 'overdue'
  },
  {
    id: 3,
    titulo: 'Learn React Hooks',
    categoria: 'Learning',
    data: '2023-04-08',
    status: 'pending'
  }
])

const novaTarefa = ref({
  titulo: '',
  categoria: '',
  data: '',
  status: 'pending'
})

// Computed properties
const completedTasksCount = computed(() =>
  tasks.value.filter(task => task.status === 'completed').length
)

const pendingTasksCount = computed(() =>
  tasks.value.filter(task => task.status === 'pending').length
)

const overdueTasksCount = computed(() =>
  tasks.value.filter(task => task.status === 'overdue').length
)

const completedPercentage = computed(() =>
  Math.round((completedTasksCount.value / tasks.value.length) * 100) || 0
)

const pendingPercentage = computed(() =>
  Math.round((pendingTasksCount.value / tasks.value.length) * 100) || 0
)

const overduePercentage = computed(() =>
  Math.round((overdueTasksCount.value / pendingTasksCount.value) * 100) || 0
)

const upcomingTasks = computed(() =>
  [...tasks.value]
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 3)
)

const taskCategories = computed(() => {
  const categories = ['Work', 'Personal', 'Learning']
  return categories.map(category => ({
    name: category,
    count: tasks.value.filter(task => task.categoria === category).length
  }))
})

const taskTags = computed(() => {
  const tags = new Set()
  tasks.value.forEach(task => {
    tags.add(task.categoria)
    tags.add(task.status)
  })
  return Array.from(tags)
})

// Methods
function adicionarTarefa(nomeTarefa: string) {
  const newTask = {
    id: Date.now(),
    ...novaTarefa.value
  }
  tasks.value.push(newTask)
  novaTarefa.value = { titulo: '', categoria: '', data: '', status: 'pending' }
  abrirModal.value = false

  const tasks = ['varrer a casa', 'passar pano'];

  const tarefaExiste = tasks.includes(nomeTarefa);
  if (tarefaExiste) {
    showDialog('Essa tarefa já existe', 'Tarefa já existente');
    return;
  }

  if (nomeTarefa !== 'teste') {
    console.log('Tarefa de teste');
    return;
  }

  console.log('salvando task');
}

const showDialog = (message: string, title: string) => {
  dialog({
    title,
    message,
    ok: {
      label: 'OK',
      color: 'primary'
    },
    cancel: {
      label: 'Cancelar',
      color: 'negative'
    }
  })
}

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

function getStatusColor(status) {
  const colors = {
    pending: 'yellow',
    overdue: 'red',
    completed: 'green'
  }
  return colors[status] || 'grey'
}

function getTagColor(tag) {
  const colors = {
    Work: 'blue-5',
    Personal: 'green-5',
    Learning: 'amber-5',
    pending: 'yellow-5',
    overdue: 'red-5',
    completed: 'green-5'
  }
  return colors[tag] || 'grey-5'
}
</script>

<style scoped>
.q-drawer {
  display: flex;
  flex-direction: column;
}

.q-scroll-area {
  display: flex;
  flex-direction: column;
}

.q-item {
  margin-bottom: 4px;
}

.q-item.active-class {
  border-left: 4px solid #1976D2;
}
</style>
