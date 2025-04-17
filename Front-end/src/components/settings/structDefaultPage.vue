<template>
  <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">{{Titulo}}</div>
            <div class="text-caption text-grey">
              {{Descricao}}
            </div>
          </q-card-section>

          <q-separator class="q-my-md" />
          <!--===============================================================================================-->
          <!-- Formulário de Adição de Categoria -->
          <!--===============================================================================================-->
          <q-card-section>
            <q-input
              v-model="value"
              :placeholder='Placeholder'
              outlined
            >
              <template v-slot:after>
                <q-btn icon="add" color="primary" @click="$emit('add', value)" flat />
              </template>
            </q-input>

          </q-card-section>

          <q-separator class="q-my-md" />

          <q-card-section>
            <slot name="lista">
            </slot>

          </q-card-section>
        </q-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';

 const props = defineProps<{
  Titulo: string;
  Descricao:string;
  Placeholder:string;
 }>()

 defineEmits<{
  (event: 'add', value: string): void;
 }>()

 const value = ref<string>('');
</script>





