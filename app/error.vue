<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="h-screen">
    <v-card elevation="1" class="pa-4 h-100 align-content-center">
      <v-card-title class="text-center mb-2">
        <h1 class="text-h1 font-weight-bold">{{ error?.statusCode }}</h1>
        <h1 class="text-h5 font-weight-bold">{{ error?.statusMessage }}</h1>
        <h1 class="text-h5">Something Wrong</h1>
      </v-card-title>
      <v-card-text class="text-center">
        <v-btn prepend-icon="mdi-door" elevation="24" size="large" rounded="lg" color="primary" @click="handleError">
          Go Home
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
  
</template>