<template>
  <q-page class="q-pa-md">

    <!-- Header e Botões -->
    <div class="q-mb-md">
      <h4 align="center">Tarefas</h4>
      <q-separator />
    </div>
    <div class="row items-center justify-between q-mb-md cursor-inherit">
      <q-btn-dropdown
  flat
  color="primary"
  :label="filtersVisible ? 'Esconder filtros' : 'Mostrar filtros'"
  no-caps
  @click="toggleFilters"
        </q-btn-dropdown>

      <!-- Botão Adicionar Tarefa, que abre o modal -->
      <q-btn
        color="primary"
        icon="add"
        label="Adicionar Tarefa"
        no-caps
        @click="showDialog('new')"
        class="cursor-inherit"
      />
    </div>

    <!-- Filtros com transição -->
    <q-slide-transition>
      <q-card v-show="filtersVisible" flat bordered class="q-pa-md q-mb-md">
        <q-input filled v-model="search" label="Search tasks..." class="q-mb-md" />

        <div class="row q-col-gutter-md">
          <q-select
            class="col-12 col-sm-4"
            filled
            v-model="selectedCategory"
            :options="categories"
            label="Category"
          />
          <q-select
            class="col-12 col-sm-4"
            filled
            v-model="selectedPriority"
            :options="priorities"
            label="Priority"
          />
          <q-select
            class="col-12 col-sm-4"
            filled
            v-model="selectedStatus"
            :options="statuses"
            label="Status"
          />
        </div>

        <div class="row q-mt-md">
          <div class="q-mr-sm" v-for="tag in availableTags" :key="tag">
            <q-chip :label="tag" outline />
          </div>
        </div>
        <div align="center">
          <q-btn flat label="Pesquisar" color="primary" class="q-mt-md" />
          <q-btn flat label="Reset Filters" color="primary" class="q-mt-md" />
        </div>
      </q-card>
    </q-slide-transition>

    <!-- Seção de Tarefas com Drag & Drop -->
    <div class="row q-col-gutter-md">
      <!-- Coluna Alta -->
      <div class="col"
           @dragover.prevent
           @drop="handleDrop('High')">
        <h5 class="text-center">Alta</h5>
        <div v-for="task in highTasks" :key="task.id">
          <q-card class="q-mb-sm"
                  draggable="true"
                  @dragstart="handleDragStart(task)">
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
                <q-chip :label="task.temporality" :color="getTemporalityColor(task.temporality)" text-color="black" />
                <q-btn flat dense round icon="more_vert" />
                <q-menu>
                  <q-item clickable v-close-popup :to="'/dashboard'" class="q-hoverable">
                    <q-item-section avatar>
                      <q-icon name="edit"/>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="q-hoverable">
                    <q-icon name="delete"/>
                  </q-item>
                </q-menu>
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
      </div>

      <!-- Coluna Média -->
      <div class="col"
           @dragover.prevent
           @drop="handleDrop('Medium')">
        <h5 class="text-center">Média</h5>
        <div v-for="task in mediumTasks" :key="task.id">
          <q-card class="q-mb-sm"
                  draggable="true"
                  @dragstart="handleDragStart(task)">
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
                <q-chip :label="task.temporality" :color="getTemporalityColor(task.temporality)" text-color="black" />
                <q-btn flat dense round icon="more_vert" />
                <q-menu>
                  <q-item clickable v-close-popup :to="'/dashboard'" class="q-hoverable">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="q-hoverable">
                    <q-icon name="delete" />
                  </q-item>
                </q-menu>
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
      </div>

      <!-- Coluna Baixa -->
      <div class="col"
           @dragover.prevent
           @drop="handleDrop('Low')">
        <h5 class="text-center">Baixa</h5>
        <div v-for="task in lowTasks" :key="task.id">
          <q-card class="q-mb-sm"
                  draggable="true"
                  @dragstart="handleDragStart(task)">
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
                <q-chip :label="task.temporality" :color="getTemporalityColor(task.temporality)" text-color="black" />
                <q-btn flat dense round icon="more_vert" />
                <q-menu>
                  <q-item clickable v-close-popup :to="'/dashboard'" class="q-hoverable">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="q-hoverable">
                    <q-icon name="delete" />
                  </q-item>
                </q-menu>
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import DialogNewTask from '../components/tasks/DialogNewTask.vue'

/* Variáveis de controle para filtros e UX */
const filtersVisible = ref(false)
const search = ref('')
const selectedCategory = ref(null)
const selectedPriority = ref(null)
const selectedStatus = ref(null)
const showDialogNewTask = ref(false)
const $q = useQuasar()

const showDialog = (taskStatus: string) => {
  $q.dialog({
    component: DialogNewTask,
    componentProps: {
      modelValue: true
    }
  })
  .onOk(newTask => {
      // Calcula um ID único para a nova tarefa
      const newId =
        tasks.value.length > 0
          ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1
      // Se desejar, pode ajustar o valor da data (aqui usamos o "dueDate" do formulário)
      // ou definir outra data, como a data atual:
      const today = new Date().toLocaleDateString()
      // Adiciona a nova tarefa ao array de tarefas
      tasks.value.push({
        id: newId,
        title: newTask.title,
        description: newTask.description,
        category: newTask.category,
        temporality: newTask.temporality,
        priority: newTask.priority,
        dueDate: newTask.dueDate || today,
        completed: false
      })
    })
    // Se o usuário cancelar, não é necessário fazer nada
    .onCancel(() => {
      // Pode tratar algum feedback se necessário
      console.log('Dialog cancelado')
    })
}

/* Opções para selects e chips */
const categories = ['All categories', 'Personal', 'Work', 'Learning']
const priorities = ['All priorities', 'High', 'Medium', 'Low']
const temporality = ['All temporalitys', 'Green', 'Orange', 'Yellow', 'Red', 'Black']
const statuses = ['All tasks', 'Pending', 'Completed']
const availableTags = ['Feature', 'Bug', 'Documentation', 'Improvement', 'Priority']

/* Array único de tarefas */
const tasks = ref([
  {
    id: 1,
    title: 'Go grocery shopping',
    category: 'Personal',
    date: 'Apr 01',
    temporality: 'Black',
    priority: 'Medium',
    completed: false
  },
  {
    id: 2,
    title: 'Complete project proposal',
    category: 'Work',
    date: 'Apr 02',
    temporality: 'Black',
    priority: 'High',
    completed: false
  },
  {
    id: 3,
    title: 'Learn React Hooks',
    category: 'Learning',
    date: 'Apr 08',
    temporality: 'Black',
    priority: 'Low',
    completed: false
  }
])

/* Computed para filtrar as tarefas de acordo com a prioridade */
const highTasks = computed(() => tasks.value.filter(task => task.priority === 'High'))
const mediumTasks = computed(() => tasks.value.filter(task => task.priority === 'Medium'))
const lowTasks = computed(() => tasks.value.filter(task => task.priority === 'Low'))

/* Variável para armazenar a tarefa que está sendo arrastada */
const draggedTask = ref(null)

function handleDragStart(task: any) {
  draggedTask.value = task
}

function handleDrop(newPriority: string) {
  if (draggedTask.value) {
    // Atualiza a prioridade da tarefa com base na coluna destino.
    draggedTask.value.priority = newPriority
    // Limpa o estado de drag.
    draggedTask.value = null
  }
}

/* Alterna a visibilidade dos filtros */
function toggleFilters() {
  filtersVisible.value = !filtersVisible.value
}

/* Funções utilitárias para definir as cores dos chips */
function getPriorityColor(priority: string) {
  switch (priority) {
    case 'High': return 'red-2'
    case 'Medium': return 'yellow-2'
    case 'Low': return 'green-2'
    default: return 'grey'
  }
}

function getTemporalityColor(temporality: string) {
  switch (temporality) {
    case 'Green': return 'green-2'
    case 'Orange': return 'orange-2'
    case 'Yellow': return 'yellow-2'
    case 'Red': return 'red-2'
    case 'Black': return 'black'
    default: return 'grey'
  }
}
</script>
