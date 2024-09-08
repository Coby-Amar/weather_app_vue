<template>
  <v-app>
    <AreYouSure />
    <LoadingScreen />
    <AppBar />
    <v-main class="bg-grey-darken-3">
      <SearchBar />
      <WeatherDetails />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { user, getCurrentWeather } from './api.service';
import { useGlobalState } from '@/global.store';

const { toggleLoadingScreen } = useGlobalState()
onMounted(async () => {
  navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
    toggleLoadingScreen()
    await getCurrentWeather(latitude, longitude)
    await user()
    toggleLoadingScreen()
  })
})
</script>
