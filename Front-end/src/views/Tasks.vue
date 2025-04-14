<template>
  <q-page class="q-pa-md">
    <!-- Header e Botões -->
    <div class="row items-center justify-between q-mb-md">
      <q-btn
        flat
        :label="filtersVisible ? 'Hide Filters' : 'Show Filters'"
        no-caps
        @click="toggleFilters"
      />

      <!-- Botão que abre o modal -->
         <color
            color ="primary"
            icon="add"
            label="Adicionar Tarefa"
            no-caps
            @click="showDialogNewTask = true"></color>
            <!-- criar funçao de acordo com o exemplo que esta no dashboard -->

            />

            <!-- Componente do Dialog
              <DialogNewTask
              :model-value="showDialogNewTask"
              @submit="handleTaskSubmit"
              /> https://quasar.dev/quasar-plugins/dialog#writing-the-custom-component-->


    </div>

    <!-- Filtros com transição -->
    <q-slide-transition>
      <q-card v-show="filtersVisible" flat bordered class="q-pa-md q-mb-md">
        <q-input filled v-model="search" label="Search tasks..." class="q-mb-md" />

        <div class="row q-col-gutter-md">
          <q-select class="col-12 col-sm-4" filled v-model="selectedCategory" :options="categories" label="Category" />
          <q-select class="col-12 col-sm-4" filled v-model="selectedPriority" :options="priorities" label="Priority" />
          <q-select class="col-12 col-sm-4" filled v-model="selectedStatus" :options="statuses" label="Status" />
        </div>

        <div class="row q-mt-md">
          <div class="q-mr-sm" v-for="tag in availableTags" :key="tag">
            <q-chip :label="tag" outline />
          </div>
        </div>

        <q-btn flat label="Reset Filters" color="primary" class="q-mt-md" />
      </q-card>
    </q-slide-transition>

    <!-- Resto da interface (exemplo de lista de tarefas) -->
    <div class="q-mt-lg">
      <q-card v-for="task in tasks" :key="task.id" class="q-mb-sm">
        <q-card-section class="row items-center justify-between">
          <div class="col">
            <div class="row items-center q-gutter-sm">
              <q-checkbox v-model="task.completed" />
              <div class="text-subtitle1">{{ task.title }}</div>
            </div>
            <div class="text-caption text-grey row items-center q-gutter-sm">
              <div>{{ task.category }}</div>
              <div>
                <q-icon name="event" size="16px" class="q-mx-xs" /> {{ task.date }}
              </div>
            </div>
          </div>
          <div class="row items-center q-gutter-sm">
            <q-chip :label="task.priority" :color="getPriorityColor(task.priority)" text-color="black" />
            <q-btn flat dense round icon="more_vert" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat label="Show more" color="primary" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DialogNewTask from '../components/tasks/DialogNewTask.vue'

// const {dialog} = useQuasar()

const filtersVisible = ref(false)
const search = ref('')
const selectedCategory = ref(null)
const selectedPriority = ref(null)
const selectedStatus = ref(null)
const showDialogNewTask = ref(false)


const categories = ['All categories', 'Personal', 'Work', 'Learning']
const priorities = ['All priorities', 'High', 'Medium', 'Low']
const statuses = ['All tasks', 'Pending', 'Completed']
const availableTags = ['Feature', 'Bug', 'Documentation', 'Improvement', 'Priority']

const tasks = ref([
  {
    id: 1,
    title: 'Go grocery shopping',
    category: 'Personal',
    date: 'Apr 01',
    priority: 'Medium',
    completed: false
  },
  {
    id: 2,
    title: 'Complete project proposal',
    category: 'Work',
    date: 'Apr 02',
    priority: 'High',
    completed: false
  },
  {
    id: 3,
    title: 'Learn React Hooks',
    category: 'Learning',
    date: 'Apr 08',
    priority: 'Low',
    completed: false
  }
])

function toggleFilters() {
  filtersVisible.value = !filtersVisible.value
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'High': return 'red-2'
    case 'Medium': return 'yellow-2'
    case 'Low': return 'green-2'
    default: return 'grey'
  }
}
</script>
