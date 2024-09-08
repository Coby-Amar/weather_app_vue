<template>
    <v-toolbar class="pa-2">
        <v-combobox autofocus clearable prepend-icon="mdi-magnify" placeholder="Search weather in cities"
            item-title="description" return-object :items="suggestions" @update:search="value => query = value"
            @update:modelValue="onSelected" :loading="loading" />
    </v-toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlacesAutocomplete, geocodeByPlaceId } from 'vue-use-places-autocomplete'

import { getCurrentWeather } from '@/api.service';

const query = ref('')
import.meta.env.BASE_URL
const { suggestions, loading, } = usePlacesAutocomplete(query, {
    apiKey: import.meta.env.VITE_VUE_GOOGLE_API_KEY,
    debounce: 700,
    minLengthAutocomplete: 3,
    apiOptions: {
        language: 'en'
    },
    autocompletionRequest: {
        componentRestrictions: {
            country: ['us']
        },
        types: ['(cities)']
    }
})

async function onSelected(value: any) {
    if (!value || typeof value === 'string') {
        return
    }
    const results = await geocodeByPlaceId(value.place_id)
    const { lat, lng } = results.pop().geometry.location
    await getCurrentWeather(lat(), lng())
    query.value = ''
}
</script>