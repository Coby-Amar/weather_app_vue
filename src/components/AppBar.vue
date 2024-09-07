<template>
  <v-app-bar class="pe-3">
    <v-app-bar-title>Welcome to the weather app built using
      <strong class="text-green-darken-2">Vue</strong>
      and
      <strong class="text-yellow-darken-2">Python</strong>
    </v-app-bar-title>
    <nav v-if="user">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" prepend-icon="mdi-account">
            {{ user.name }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in acountOption" :key="index" link>
            <v-list-item-title :class="item.class" @click="item.onClick">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </nav>
    <nav v-else>
      <Register />
      <Login />
    </nav>
  </v-app-bar>
</template>

<script setup lang="ts">
import { logout } from '@/api.service';
import { useGlobalState } from '@/global.store'

const { user, setAreYouSure, toggleLoadingScreen } = useGlobalState()
const acountOption = [
  { title: 'History', onClick() { } },
  { title: 'Settings', onClick() { } },
  {
    title: 'Logout',
    class: 'text-red-lighten-1',
    onClick() {
      setAreYouSure({
        content: 'Do you really want to logout?',
        onNo() { },
        async onYes() {
          toggleLoadingScreen()
          await logout()
          toggleLoadingScreen()
        }
      })
    }
  }
]
</script>
