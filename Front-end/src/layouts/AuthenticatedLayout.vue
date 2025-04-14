<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Tarefas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Botão para reabrir o menu -->
    <q-btn icon="chevron_right" round class="position-absolute q-ma-sm" style="margin-top: 60px;" flat v-if="!leftDrawerOpen"  @click="toggleLeftDrawer">
    </q-btn>

    <q-drawer behavior="default" show-if-above v-model="leftDrawerOpen" side="left" bordered :width="200"
      :breakpoint="200">
      <q-list>
        <!-- Botão dentro do drawer para ocultar -->
        <q-item clickable @click="toggleLeftDrawer">
          <q-item-section avatar>
            <q-icon name="menu" />
          </q-item-section>
          <q-item-section>Menu</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_left" />
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- Itens de navegação -->
        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Calendário</q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="checklist" />
          </q-item-section>
          <q-item-section>Tarefas</q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Configurações</q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
