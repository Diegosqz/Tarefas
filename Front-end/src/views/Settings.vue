<template>
  <q-page class="q-pa-md">
    <!-- Título da Página -->
    <div class="q-mb-md text-center">
      <h4>Configurações</h4>
      <q-separator />
    </div>
    <!-- Abas de Configurações -->
    <q-tabs v-model="selectedTab" dense align="justify" class="q-mb-md">
      <q-tab name="categories" label="Categorias" />
      <q-tab name="tarefas" label="Tarefas" />
      <q-tab name="tags" label="Tags" />
      <q-tab name="account" label="Conta" />
      <q-tab name="others" label="Outros" />
    </q-tabs>

    <q-tab-panels v-model="selectedTab" animated>
      <!-- Aba Categorias -->
      <q-tab-panel name="categories">
        <q-card class="q-pa-md">
          <q-card-section>
            <structDefaultPage Descricao="Criação, definição e exclusão de Categorias" Titulo="Categorias"
              Placeholder="Adicionar nova categoria" @add="addCategory">
              <template v-slot:lista>
                <q-card-section>
                  <q-list bordered>
                    <q-item v-for="cat in categories" :key="cat.id" clickable>
                      <q-item-section>
                        {{ cat.name }}
                      </q-item-section>
                      <q-item-section side>
                        <q-btn icon="edit" flat round @click.stop="editCategory(cat)" />
                        <q-btn icon="delete" flat round color="negative" @click.stop="deleteCategory(cat)" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </template>
            </structDefaultPage>
          </q-card-section>
          <q-separator class="q-my-md" />
        </q-card>
      </q-tab-panel>
      <!-- Tarefas -->
      <q-tab-panel name="tarefas">
        <q-card class="q-pa-md">
          <q-card-section>
            <structDefaultPage Descricao="Criação, definição e exclusão de Tarefas" Titulo="Tarefas"
              Placeholder="Adicionar nova tarefa" @add="addTask">
              <template v-slot:lista>

              </template>
            </structDefaultPage>
          </q-card-section>
          <q-separator class="q-my-md" />
          <!-- Formulário de adição de Tarefa -->


        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import structDefaultPage from '../components/settings/structDefaultPage.vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
interface Item { id: number; name: string; color: string }
interface Category {
  id: number;
  name: string;
}
interface Tag {
  id: number
  name: string
  color: string
}


//===============================================================================================\\
const { dialog } = useQuasar()
//===============================================================================================\\
//Estado da aba selecionada//
const selectedTab = ref<'categories' | 'tarefas' | 'tags' | 'account' | 'others'>('categories')
//===============================================================================================\\
//Categorias//
const categories = ref<Item[]>([
  { id: 1, name: 'Work', color: '' },
  { id: 2, name: 'Personal', color: '' },
  { id: 3, name: 'Learning', color: '' }
])

function addCategory(category: string) {

  categories.value.push({
    id: Date.now(),
    name: category.trim(),
    color: 'string'
  })
}
function editCategory(cat: Item) { /* ... */ }
function deleteCategory(cat: Item) {
  categories.value = categories.value.filter(c => c.id !== cat.id)
}
//===============================================================================================\\
//Tarefas//
const tasks = ref<Item[]>([])

function addTask(task: string) {
  tasks.value.push({
    id: Date.now(),
    name: task.trim()
  })
}

function editTask(t: Item) { /* ... */ }
function deleteTask(t: Item) {
  tasks.value = tasks.value.filter(x => x.id !== t.id)
}
//===============================================================================================\\
// --- Tags ---

const newTag = reactive<Pick<Tag, 'name' | 'color'>>({ name: '', color: '' })
const colorOptions = [
  'primary',
  'secondary',
  'accent',
  'dark',
  'positive',
  'negative',
  'info',
  'warning',
  'red',
  'green',
  'blue',
  'orange',
  'purple'
]
const tags = reactive<Item[]>([
  { id: 1, name: 'Feature', color: 'blue' },
  { id: 2, name: 'Bug', color: 'negative' },
  { id: 3, name: 'Improvement', color: 'positive' },
])

function addTag() {
  const name = newTag.name.trim()
  const color = newTag.color
  if (!name || !color) return
  const id = tags.length ? Math.max(...tags.map(t => t.id)) + 1 : 1
  tags.push({ id, name, color })
  newTag.name = ''
  newTag.color = ''
}

function editTag(tag: Tag) {
  const editData = reactive({
    name: tag.name,
    color: tag.color
  })
  function removeTag(tag: Tag) {
    const idx = tags.findIndex(t => t.id === tag.id)
    if (idx !== -1) tags.splice(idx, 1)
  }
}
//===============================================================================================\\
</script>
