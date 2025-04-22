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
      <structDefaultPage
        Descricao="Criação, definição e exclusão de Tarefas"
        Titulo="Tarefas"
        Placeholder="Adicionar nova tarefa"
        :error="taskInputError"
        errorMessage="O nome da tarefa não pode estar vazio"
        :resetOnAdd="true"
        @add="addTask"
      >
        <template v-slot:lista>
          <q-card-section>
            <div v-if="tasks.length === 0" class="text-grey text-center q-mb-md">
              Nenhuma tarefa cadastrada ainda. 📝
            </div>
            <q-list bordered v-else>
              <q-item v-for="t in tasks" :key="t.id" clickable>
                <q-item-section>
                  {{ t.name }}
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon="edit"
                    flat
                    round
                    @click.stop="editTask(t)"
                    :aria-label="'Editar tarefa ' + t.name"
                  />
                  <q-btn
                    icon="delete"
                    flat
                    round
                    color="negative"
                    @click.stop="deleteTask(t)"
                    :aria-label="'Excluir tarefa ' + t.name"
                  />
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
<!-- Aba Tags -->
<q-tab-panel name="tags">
  <q-card class="q-pa-md">
    <q-card-section>
      <structDefaultPage Descricao="Criação, definição e exclusão de Tags" Titulo="Tags"
      Placeholder="Adicionar nova tags"
      @add="addTags">
      <!-- Slot do formulário de adição -->
      <template v-slot:form>
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
        </template>

        <!-- Slot da lista de tags -->
        <template v-slot:lista>
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
        </template>
      </structDefaultPage>
    </q-card-section>
    <q-separator spaced />
  </q-card>
</q-tab-panel>

<!-- Aba Conta -->
<q-tab-panel name="account">
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <structDefaultPage
        Titulo="Configurando sua Conta"
        Descricao="Definindo e modificando seus detalhes"
      >
        <!-- Slot de conteúdo da conta -->
        <template v-slot:default>
          <q-card-section class="text-center">
            <div class="text-h6">Configurando sua Conta</div>
            <div class="text-caption text-grey">
              Definindo e modificando seus detalhes
            </div>
          </q-card-section>
        </template>
      </structDefaultPage>
    </q-card-section>
    <q-separator spaced />
  </q-card>
</q-tab-panel>

<!-- Aba Outros-->
<q-tab-panel name="others">
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <structDefaultPage
        Titulo="Outros"
        Descricao="Configurações adicionais"
      >
        <!-- Slot de conteúdo de outros -->
        <template v-slot:default>
          <q-card-section class="text-center">
            <div class="text-h6">Outros</div>
            <div class="text-caption text-grey">
              Configurações adicionais
            </div>
          </q-card-section>
        </template>
      </structDefaultPage>
    </q-card-section>
    <q-separator spaced />
  </q-card>
</q-tab-panel>

</q-tab-panels>




</q-page>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import structDefaultPage from '../components/settings/structDefaultPage.vue';
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
function deleteCategory(categories: Item) {
  categories.value = categories.value.filter(c => c.id !== cat.id) //Quando for implementar realmente, trocar parametro cat para categories\\
}
//===============================================================================================\\
//Tarefas//
const tasks = ref<Item[]>([])
const taskInputError = ref(false)
function addTask(taskName: string) {
  const name = taskName.trim()
  taskInputError.value = false
  if (!name) return

  const alreadyExists = tasks.value.some(t => t.name.toLowerCase() === name.toLowerCase())
  if (alreadyExists) {
    taskInputError.value = true
    dialog.notify({
      message: 'Essa tarefa já existe!',
      type: 'warning',
      position: 'top'
    })
    return
  }
  tasks.value.push({
    id: Date.now(),
    name
  })

  dialog.notify({
    message: 'Tarefa adicionada com sucesso!',
    type: 'positive',
    position: 'top'
  })
    newTaskInput.value = ''

}

function editTask(t: Item) {
  dialog({
  title: 'Editar Tarefa',
  message: 'Atualize o nome da tarefa:',
  prompt: {
    model: task.name,
    type: 'text'
  },
  cancel: true,
  persistent: true
}).onOk((newName: string) => {
  const name = newName.trim()
  if (!name) return
  const t = tasks.value.find(t => t.id === task.id)
  if (t) t.name = name
})

  }

  function deleteTask(task: Item) {
  dialog({
    title: 'Excluir Tarefa',
    message: 'Tem certeza que deseja excluir a tarefa "${task.name}"?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Sim',
      color: 'negative'
    },
    cancelLabel: 'Cancelar',
    type: 'confirm'
  }).onOk(() => {
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    dialog.notify({
      message: 'Tarefa excluída com sucesso!',
      type: 'positive',
      position: 'top'
  })})}
// Quando for implementar realmente, trocar parametro t para tasks\\

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
