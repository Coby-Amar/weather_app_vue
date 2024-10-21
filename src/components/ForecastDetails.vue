<template>
    <v-card class="ma-5" color="primary">
        <v-card-item :title="name">
            <template v-slot:subtitle>
            </template>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h2" cols="6">
                    {{ forecastWeatherDetails?.current.temp_f }}
                </v-col>

                <v-col class="text-right" cols="6">
                    <img :src="weatherDetails?.current.condition.icon" :alt="weatherDetails?.current.condition.text">
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <div>
                <v-list-item prepend-icon="mdi-weather-windy">
                    <v-list-item-subtitle>{{ weatherDetails?.current.gust_mph }} mp/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item prepend-icon="mdi-compass">
                    <v-list-item-subtitle>{{ weatherDetails?.current.wind_dir }}</v-list-item-subtitle>
                </v-list-item>
            </div>

            <div>
                <v-list-item prepend-icon="mdi-thermometer">
                    <v-list-item-subtitle>{{ weatherDetails?.current.heatindex_f }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item prepend-icon="mdi-water-thermometer">
                    <v-list-item-subtitle>{{ weatherDetails?.current.humidity }}%</v-list-item-subtitle>
                </v-list-item>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/global.store';

const { forecastWeatherDetails } = useGlobalState()
</script>