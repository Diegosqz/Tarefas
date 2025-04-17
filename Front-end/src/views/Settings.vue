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
      <q-tab name="tarefas"    label="Tarefas" />
      <q-tab name="tags"        label="Tags" />
      <q-tab name="account"     label="Conta" />
      <q-tab name="others"      label="Outros" />
    </q-tabs>

    <q-tab-panels v-model="selectedTab" animated>
      <!-- Aba Categorias -->
      <q-tab-panel name="categories">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Configurando Categorias</div>
            <div class="text-caption text-grey">
              Criação, definição e exclusão de categorias
            </div>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Formulário de Adição de Categoria -->
          <q-card-section>
            <div class="row items-center q-col-gutter-md">
              <q-input
                v-model="newCategory"
                placeholder="Enter new category"
                outlined
                class="col"
              />
              <q-btn icon="add" color="primary" @click="addCategory" flat />
            </div>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Lista de Categorias -->
          <q-card-section>
            <q-list bordered>
              <q-item
                v-for="cat in categories"
                :key="cat.id"
                clickable
              >
                <q-item-section>
                  {{ cat.name }}
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="edit"
                    flat
                    round
                    @click.stop="editCategory(cat)"
                  />
                  <q-btn
                    icon="delete"
                    flat
                    round
                    color="negative"
                    @click.stop="deleteCategory(cat)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Aba Tarefas -->
      <q-tab-panel name="tarefas">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Configurando Tarefas</div>
            <div class="text-caption text-grey">
              Criação, definição e exclusão de tarefas
            </div>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Formulário de adição de Tarefa -->
          <q-card-section>
            <div class="row items-center q-col-gutter-md">
              <q-input
                v-model="newTask"
                placeholder="Adicionar tarefa"
                outlined
                class="col"
              />
              <q-btn icon="add" color="primary" @click="addTask" flat />
            </div>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Lista de Tarefas -->
          <q-card-section>
            <q-list bordered>
              <q-item
                v-for="t in tasks"
                :key="t.id"
                clickable
              >
                <q-item-section>
                  {{ t.name }}
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="edit"
                    flat
                    round
                    @click.stop="editTask(t)"
                  />
                  <q-btn
                    icon="delete"
                    flat
                    round
                    color="negative"
                    @click.stop="deleteTask(t)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Aba Tags -->
      <q-tab-panel name="tags">
        <q-card flat bordered class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Configurando Tags</div>
            <div class="text-caption text-grey">
              Criação, definição e exclusão de tags
            </div>
          </q-card-section>

          <q-separator spaced />

          <!-- Formulário de adição de nova tag -->
          <q-card-section class="row items-center q-col-gutter-md">
            <q-input
              v-model="newTag"
              placeholder="Enter new tag"
              outlined
              class="col"
            />
            <q-btn
              icon="add"
              color="primary"
              @click="addTag"
              :disable="!newTag"
              flat
            />
          </q-card-section>

          <q-separator spaced />

          <!-- Lista de tags existentes -->
          <q-card-section>
            <q-list bordered>
              <q-item
                v-for="tag in tags"
                :key="tag.id"
                clickable
              >
                <q-item-section>
                  {{ tag.name }}
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="edit"
                    flat
                    round
                    @click.stop="editTag(tag)"
                  />
                  <q-btn
                    icon="delete"
                    flat
                    round
                    color="negative"
                    @click.stop="removeTag(tag)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Aba Conta -->
      <q-tab-panel name="account">
        <q-card class="q-pa-md">
          <q-card-section class="text-center">
            <div class="text-h6">Configurando sua Conta</div>
            <div class="text-caption text-grey">
              Definindo e modificando seus detalhes
            </div>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Aba Outros -->
      <q-tab-panel name="others">
        <q-card class="q-pa-md">
          <q-card-section class="text-center">
            <div class="text-h6">Outros</div>
            <div class="text-caption text-grey">
              Configurações adicionais
            </div>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Item { id: number; name: string }

// Estado da aba selecionada
const selectedTab = ref<'categories' | 'tarefas' | 'tags' | 'account' | 'others'>('categories')

// --- Categorias ---
const newCategory = ref('')
const categories = ref<Item[]>([
  { id: 1, name: 'Work' },
  { id: 2, name: 'Personal' },
  { id: 3, name: 'Learning' }
])

function addCategory() {
  if (!newCategory.value.trim()) return
  categories.value.push({
    id: Date.now(),
    name: newCategory.value.trim()
  })
  newCategory.value = ''
}

function editCategory(cat: Item) { /* ... */ }
function deleteCategory(cat: Item) {
  categories.value = categories.value.filter(c => c.id !== cat.id)
}

// --- Tarefas ---
const newTask = ref('')
const tasks = ref<Item[]>([])

function addTask() {
  if (!newTask.value.trim()) return
  tasks.value.push({
    id: Date.now(),
    name: newTask.value.trim()
  })
  newTask.value = ''
}

function editTask(t: Item) { /* ... */ }
function deleteTask(t: Item) {
  tasks.value = tasks.value.filter(x => x.id !== t.id)
}

// --- Tags ---
const newTag = ref('')
const tags = reactive<Item[]>([
  { id: 1, name: 'Feature' },
  { id: 2, name: 'Bug' },
  { id: 3, name: 'Improvement' }
])

function addTag() {
  if (!newTag.value.trim()) return
  tags.push({ id: Date.now(), name: newTag.value.trim() })
  newTag.value = ''
}
function editTag(tag: Item) { /* ... */ }
function removeTag(tag: Item) {
  const i = tags.findIndex(t => t.id === tag.id)
  if (i >= 0) tags.splice(i, 1)
}
</script>
