<template>
  <v-btn text="Register" @click="dialog = true" />
  <v-dialog max-width="500" persistent v-model="dialog">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title class="d-sm-flex justify-space-between">
          Register
          <v-icon v-if="!loading" @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field label=" Username" v-model.lazy.trim="username" :rules="usernameRules" />
          <v-text-field label="Password" v-model.lazy.trim="password" :rules="passwordRules" :append-icon="passwordIcon"
            :type="passwordType" @click:append="showPassword = !showPassword" />
          <v-text-field label="Confirm password" v-model.lazy.trim="confirmPassword" :rules="confirmPasswordRules"
            :append-icon="confirmPasswordIcon" :type="confirmPasswordType"
            @click:append="showConfirmPassword = !showConfirmPassword" />

        </v-card-text>
        <v-card-actions class="d-sm-flex v-card-title">
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="close" :loading="loading" />
          <v-btn variant="outlined" type="submit" text="Submit" :loading="loading" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { confirmPasswordValidation, passwordValidation, requiredValidation, usernameValidation } from '@/utils/form.validation.util'
import { register } from '@/api.service';
import { useGlobalState } from '@/global.store'

const { toggleLoading, loading } = useGlobalState()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const form = ref<HTMLFormElement>()

const dialog = defineModel<boolean>('dialog', { default: false })
const username = defineModel<string>('username', { default: '' })
const usernameRules = [
  requiredValidation,
  usernameValidation
]
const password = defineModel<string>('password', { default: '' })
const passwordRules = [
  requiredValidation,
  passwordValidation
]
const confirmPassword = defineModel<string>('confirmPassword')
const confirmPasswordRules = [
  requiredValidation,
  passwordValidation,
  (value: string) => confirmPasswordValidation(value, password.value)
]

const passwordIcon = computed(() => showPassword.value ? 'mdi-eye' : 'mdi-eye-off')
const passwordType = computed(() => showPassword.value ? 'text' : 'password')
const confirmPasswordIcon = computed(() => showConfirmPassword.value ? 'mdi-eye' : 'mdi-eye-off')
const confirmPasswordType = computed(() => showConfirmPassword.value ? 'text' : 'password')

async function close() {
  dialog.value = false
  form.value?.reset()
}

async function onSubmit() {
  const { valid } = await form.value?.validate()
  if (valid) {
    toggleLoading()
    await register(username.value, password.value)
    toggleLoading()
    close()


  }
}
</script>
