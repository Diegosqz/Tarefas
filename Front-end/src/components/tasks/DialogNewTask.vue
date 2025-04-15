<template>
  <q-dialog v-model="internalModelValue" persistent>
    <q-card style="min-width: 500px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6">Adicionar nova tarefa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          filled
          v-model="form.title"
          label="Título da tarefa"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="form.description"
          label="Descrição"
          type="textarea"
          autogrow
          class="q-mb-md"
        />

        <div class="row q-col-gutter-md q-mb-md">
          <q-select
            class="col-12 col-sm-6"
            filled
            v-model="form.category"
            :options="categories"
            label="Categoria"
          />
          <q-select
            class="col-12 col-sm-6"
            filled
            v-model="form.priority"
            :options="priorities"
            label="Prioridade"
          />
        </div>

        <q-input
          filled
          v-model="form.dueDate"
          label="Due Date"
          mask="date"
          class="q-mb-md"
        >
          <template #append>
            <q-icon name="event" class="cursor-inherit">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.dueDate" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="text-subtitle2 q-mb-sm">Tags</div>
        <div class="row q-gutter-sm">
          <q-chip
            v-for="tag in availableTags"
            :key="tag"
            clickable
            :color="form.tags.includes(tag) ? 'primary' : 'grey-3'"
            :text-color="form.tags.includes(tag) ? 'white' : 'black'"
            @click="toggleTag(tag)"
            outline
          >
            {{ tag }}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="closeDialog" />
        <q-btn color="primary" label="Criar Tarefa" @click="submitTask" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

// Props & Emits
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

// Local state control (ref espelho do v-model)
const internalModelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalModelValue.value = val
})

watch(internalModelValue, (val) => {
  emit('update:modelValue', val)
  if (!val) resetForm()
})

// Form data
const form = reactive({
  title: '',
  description: '',
  category: '',
  priority: 'Medium',
  dueDate: '',
  tags: [] as string[]
})

const availableTags = ['Feature', 'Bug', 'Documentation', 'Improvement', 'Priority']
const categories = ['Personal', 'Work', 'Learning']
const priorities = ['High', 'Medium', 'Low']

function toggleTag(tag: string) {
  const index = form.tags.indexOf(tag)
  if (index === -1) {
    form.tags.push(tag)
  } else {
    form.tags.splice(index, 1)
  }
}

function submitTask() {
  emit('submit', { ...form })
  internalModelValue.value = false
}

function resetForm() {
  form.title = ''
  form.description = ''
  form.category = ''
  form.priority = 'Medium'
  form.dueDate = ''
  form.tags = []
}

function closeDialog() {
  internalModelValue.value = false
}
</script>
