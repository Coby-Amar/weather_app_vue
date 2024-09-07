<template>
  <v-app>
    <AreYouSure />
    <LoadingScreen />
    <AppBar />
    <v-main>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { user } from './api.service';
import { useGlobalState } from './global.store';

const { toggleLoadingScreen } = useGlobalState()
onMounted(async () => {
  toggleLoadingScreen()
  await user()
  toggleLoadingScreen()
})
</script>
