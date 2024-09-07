<template>
  <v-dialog max-width="500" persistent v-model="showAreYouSure">
    <v-card :title="areYouSure?.title ?? 'Are you sure?'">
      <v-card-text v-if="areYouSure?.content">
        {{ areYouSure?.content }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="areYouSure?.onNo" text="No" @click="onNo" />
        <v-btn v-if="areYouSure?.onYes" variant="outlined" text="Yes" @click="onYes" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalState } from '@/global.store';

const { areYouSure, setAreYouSure } = useGlobalState()
const showAreYouSure = computed(() => !!areYouSure.value)

async function onNo() {
  if (areYouSure.value?.onNo) {
    await areYouSure.value.onNo()
  }
  setAreYouSure(null)
}

async function onYes() {
  if (areYouSure.value?.onYes) {
    await areYouSure.value.onYes()
  }
  setAreYouSure(null)
}
</script>
