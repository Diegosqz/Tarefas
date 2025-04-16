<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="text-center text-h4 q-mb-md">Calendário</div>

    <q-card flat bordered class="q-pa-md cursor-inherit q-hoverable">
      <q-btn-toggle
        v-model="view"
        class="q-mb-md"
        spread
        no-caps
        toggle-color="primary"
        :options="[
          { label: 'Mês', value: 'month' },
          { label: 'Dia', value: 'day' },
          { label: 'Agenda', value: 'agenda' }
        ]"
      />

      <component
        :is="calendarComponent"
        v-model:selected-date="selectedDate"
        :day-min-height="80"
        bordered
        animated
        locale="pt-br"
        @click-date="handleDateClick"
      />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  QCalendarDay,
  QCalendarMonth,
  QCalendarAgenda
} from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

const selectedDate = ref(new Date().toISOString().substring(0, 10))
const view = ref<'month' | 'day' | 'agenda'>('month')

// Define dinamicamente o componente baseado na view
const calendarComponent = computed(() => {
  switch (view.value) {
    case 'day':
      return QCalendarDay
    case 'agenda':
      return QCalendarAgenda
    case 'month':
    default:
      return QCalendarMonth
  }
})

// Troca a visualização para "dia" ao clicar em um dia no modo mês
function handleDateClick({ scope }: any) {
  selectedDate.value = scope.timestamp.date
  view.value = 'day'
}
</script>

<style scoped>
.q-card {
  max-width: 100%;
  overflow-x: auto;
}
</style>
