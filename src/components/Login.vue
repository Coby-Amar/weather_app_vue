<template>
  <v-btn variant="tonal" @click="dialog = true">Login</v-btn>
  <v-dialog max-width="500" persistent v-model="dialog">
    <v-form ref="form" @submit.prevent="submit">
      <v-card>
        <v-card-title class="d-sm-flex justify-space-between">
          Login
          <v-icon v-if="!loading" @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model.lazy.trim="username" :rules="usernameRules" />
          <v-text-field label="Password" v-model.lazy.trim="password" :rules="passwordRules" :append-icon="passwordIcon"
            :type="passwordType" @click:append="showPassword = !showPassword" />

        </v-card-text>
        <v-card-actions class="d-sm-flex v-card-title">
          <v-spacer></v-spacer>

          <v-btn variant="flat" text="Close" @click.prevent="close" :loading="loading" />
          <v-btn variant="outlined" type="submit" text="Submit" :loading="loading" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { passwordValidation, requiredValidation, usernameValidation } from '@/utils/form.validation.util'
import { login } from '@/api.service'
import { useGlobalState } from '@/global.store'

const { toggleLoading, loading } = useGlobalState()
const dialog = defineModel<boolean>('dialog', { default: false })
const showPassword = ref(false)
const form = ref<HTMLFormElement>()

const username = defineModel<string>('username', { default: 'qwe@qwe.qwe' })
const usernameRules = [
  requiredValidation,
  usernameValidation
]
const password = defineModel<string>('password', { default: 'qweQWE123!@#' })
const passwordRules = [
  requiredValidation,
  passwordValidation
]

const passwordIcon = computed(() => showPassword.value ? 'mdi-eye' : 'mdi-eye-off')
const passwordType = computed(() => showPassword.value ? 'text' : 'password')

async function close() {
  dialog.value = false
  form.value?.reset()
}

async function submit() {
  const { valid } = await form.value?.validate()
  if (valid) {
    toggleLoading()
    await login(username.value, password.value)
    toggleLoading()
    close()
  }
}
</script>
