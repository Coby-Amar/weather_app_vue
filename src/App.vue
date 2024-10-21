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
import { getUser, getCurrentWeather, getCurrentWeatherForcast } from './api.service';
import { useGlobalState } from '@/global.store';

const { toggleLoadingScreen, user } = useGlobalState()
onMounted(async () => {
  navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
    toggleLoadingScreen()
    await getUser()
    if (user) {
      await getCurrentWeatherForcast(latitude, longitude)
    } else {
      await getCurrentWeather(latitude, longitude)
    }
    toggleLoadingScreen()
  })
})
</script>
