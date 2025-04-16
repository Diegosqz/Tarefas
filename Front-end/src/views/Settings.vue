<template>
  <q-page class="q-pa-md">
    <!-- Título da Página -->
    <div class="q-mb-md text-center">
      <h4>Configurações</h4>
      <q-separator />
    </div>

    <!-- Abas de Configurações -->
    <q-tabs v-model="selectedTab" dense align="justify" class="q-mb-md">
      <q-tab name="categories" label="Categorias"/>
      <q-tab name="tasks" label="Tarefas"/>
      <q-tab name="tags" label="Tags" />
      <q-tab name="account" label="Conta"/>
      <q-tab name="outhers" label="Outros"/>
    </q-tabs>

    <q-tab-panels v-model="selectedTab" animated>
      <!-- Aba Categories -->
      <q-tab-panel name="categories">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Configurando Categorias</div>
            <div class="text-caption text-grey">Create, edit, or delete task categories</div>
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
              <q-item v-for="cat in categories" :key="cat.id" clickable>
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
              <!-- Tarefas -->
               <q-tab-panel name = "tarefas">
                <q-card class="q-pa-md">
                  <q-card-section>
                    <div class="text-h6"> Configurando Tarefas</div>
                    <div class="text-caption text-grey">Criação, definição e exclusão de tarefas</div>
                  </q-card-section>
                  <q-separator class="q-my-md" />
    </q-card>
    </q-tab-panel>

      <!-- Aba Tags (Conteúdo de exemplo) -->
      <q-tab-panel name="tags">
        <q-card class="q-pa-md">
          <q-card-section class="text-center">
            <div class="text-h6">Configurando Tags</div>
            <div class="text-caption text-grey">Criação, definição e exclusão de tags</div>
          </q-card-section>
          <!-- Conteúdo complementar -->
        </q-card>
      </q-tab-panel>

      <!-- Aba Account (Conteúdo de exemplo) -->
      <q-tab-panel name="account">
        <q-card class="q-pa-md">
          <q-card-section class="text-center">
            <div class="text-h6">Configurando sua Conta</div>
            <div class="text-caption text-grey">Definindo e modificando seus detalhes</div>
          </q-card-section>
          <!-- Conteúdo complementar -->
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'


interface Category {
  id: number;
  name: string;
}

const selectedTab = ref('categories')
const newCategory = ref('')

const categories = ref<Category[]>([
  { id: 1, name: 'Work' },
  { id: 2, name: 'Personal' },
  { id: 3, name: 'Learning' }
])

function addCategory() {
  if (newCategory.value.trim()) {
    const newCat: Category = {
      id: Date.now(),
      name: newCategory.value.trim()
    }
    categories.value.push(newCat)
    newCategory.value = ''
  }
}

function editCategory(cat: Category) {
  // Lógica para editar a categoria (por ex., abrir modal de edição)
  console.log('Editar categoria:', cat)
}

function deleteCategory(cat: Category) {
  categories.value = categories.value.filter(c => c.id !== cat.id)
}
</script>
