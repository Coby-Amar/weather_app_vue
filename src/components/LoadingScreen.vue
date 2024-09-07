<template>
    <v-dialog persistent v-model="loadingScreen" class="d-flex justify-center" max-width="150">
        <v-card class="align-center" title="Loading...">
            <v-card-text class="d-flex flex-column align-center">
                <v-progress-circular class="mb-5" color="primary" indeterminate size="24"
                    width="2"></v-progress-circular>
                Please wait
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/global.store'

const { loadingScreen } = useGlobalState()
</script>