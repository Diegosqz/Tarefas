<template>
  <q-page class="q-pa-md">
    <!-- Título -->
    <div class="q-mb-md">
      <h4 align="center">Dashboard</h4>
      <q-separator />
    </div>

    <!-- Cards Tarefas -->
    <div class="row q-col-gutter-md justify-center q-mb-lg">
      <q-card class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md shadow-1 flat bordered
      cursor-inherit q-hoverable"
      align = 'center'
      clickable
      v-ripple
      @click="openTasksCompleteModal(TasksComplete)"
      >
        <q-card-section>
          <div class="text-subtitle2">Tarefas Completas</div>
          <div class="text-h5 q-mt-sm">{{ completedTasksCount }}</div>
          <div class="text-caption text-grey">{{ completedPercentage }}% de todas as tarefas</div>
        </q-card-section>
      </q-card>

      <q-card class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md shadow-1 flat bordered
      cursor-inherit q-hoverable"
      align='center'
      v-ripple
      @click="openTasksPendingModal(TasksPending)"
      >
      <span class="q-focus-helper"></span>
        <q-card-section>
          <div class="text-subtitle2">Tarefas pendentes</div>
          <div class="text-h5 q-mt-sm">{{ pendingTasksCount }}</div>
          <div class="text-caption text-grey">{{ pendingPercentage }}% de todas as tarefas</div>
        </q-card-section>
      </q-card>

      <q-card class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md shadow-1 flat bordered
      cursor-inherit q-hoverable"
      align = 'center'
      v-ripple
      @click="openTasksOverdueModal(Tasksoverdue)"
      >
      <span class ="q-focus-helper"></span>
        <q-card-section>
          <div class="text-subtitle2" >Tarefas atrasadas</div>
          <div class="text-h5 q-mt-sm" :class="overdueTasksCount > 0 ? 'text-negative' : ''">
            {{ overdueTasksCount }}
          </div>
          <div class="text-caption text-grey">{{ overduePercentage }}% de todas as tarefas</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Eventos e Categorias
     Comportamento UX esperado para eventos, categorias e tags é a abertura de um modal diferente
     quando voce clica em 'eventos' e quando voce no evento em especifico. Dá mesma forma
     'categorias' e na categoria em especifica. Ainda nao totalmente implementado-->
    <div class="row q-col-gutter-md q-mb-lg justify-center">
      <q-card class="col-xs-12 col-sm-12 col-md-6 col-lg-4 shadow-1 flat bordered
      cursor-inherit q-hoverable"
      align='center'
      v-ripple
      @click="openEventsModal(Events)">
      <span class="q-focus-helper"></span>

        <q-card-section>
          <div class="text-subtitle1" >Eventos</div>
          <div class="q-mt-sm">
            <q-item
            v-for="task in upcomingTasks"
            :key="task.id"
            clickable
            v-ripple
            @click="openEventsModal(Events)"
            class="row items-center q-mb-sm cursor-inherit">
            <q-item-section>
              <q-icon name="circle" :color="getStatusColor(task.status)" size="12px" class="q-mr-sm" />
              <div class="col">{{ task.titulo }}</div>
              <div class="text-caption text-grey">
                {{ formatDate(task.data) }}
              </div>
            </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </q-card>
    <q-card class="col-xs-12 col-sm-12 col-md-6 col-lg-4 shadow-1 flat bordered cursor-inherit q-hoverable"
    align = center
    v-ripple
      @click="openCategoryModal(category)"
    >
    <span class="q-focus-helper"></span>
  <q-card-section>
    <div class="text-subtitle1">Categorias</div>
    <div class="q-mt-md" >
      <q-item
        v-for="category in taskCategories"
        :key="category.name"
        clickable
        v-ripple
        @click="openCategoryModal(category)"
        class="q-mb-sm q-pa-sm cursor-inherit"
      >
       <q-item-section class="full-width">
          <div class="row justify-between items-center">
            <div>{{ category.name }}</div>
            <div>{{ category.count }}</div>
          </div>
          <q-linear-progress
            :value="category.count / tasks.length"
            color="blue-3"
            rounded
            class="q-mt-sm"
            />
        </q-item-section>
      </q-item>
    </div>
  </q-card-section>
</q-card>
    </div>

    <!-- Tags -->
    <div class="row justify-center">
  <q-card class="col-xs-12 col-sm-10 col-md-8 col-lg-6 shadow-1 flat bordered
  cursor-inherit q-hoverable"
  align = 'center'
  v-ripple
  @click="openTagsModal(Tags)">
  <span class="q-focus-helper"></span>
    <q-card-section>
      <div class="text-subtitle1" align = 'center'>Tags</div>
      <div class="q-mt-md">
        <q-chip
          v-for="tag in taskTags"
          :key="tag"
          class="q-mr-sm q-mb-sm"
          :color="getTagColor(tag)"
          text-color="white"
          outline
          :label="tag"
          clickable
          v-ripple
          @click="openTagModal(tag)"

        />
      </div>
    </q-card-section>
  </q-card>
</div>

  </q-page>
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
  const tags = new Set<string>()
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

const showDialog = (taskStatus: string) => {
  dialog({
    // title,
    // message,
    // ok: {
    //   label: 'OK',
    //   color: 'primary'
    // },
    // cancel: {
    //   label: 'Cancelar',
    //   color: 'negative'
    // }
    component: '',
    componentProps: {
      modelValue: true
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
