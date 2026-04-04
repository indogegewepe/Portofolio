<script setup lang="ts">
import type { NuxtError } from '#app'
import { computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  error: Object as () => NuxtError
})

const theme = useTheme()

const statusCode = computed(() => props.error?.statusCode ?? 500)
const statusMessage = computed(() => props.error?.statusMessage || 'Unexpected Error')
const detailMessage = computed(() => {
  if (statusCode.value === 404) {
    return 'Halaman yang kamu cari tidak ditemukan. Kemungkinan URL berubah atau halaman sudah dipindahkan.'
  }
  return 'Terjadi kesalahan saat memproses halaman ini. Coba muat ulang, atau kembali ke beranda.'
})

const refreshPage = () => {
  window.location.reload()
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.change(savedTheme)
  }
})
</script>

<template>
  <v-app>
    <main class="error-shell app-atmosphere">
      <div class="app-atmosphere-grain" aria-hidden="true" />

      <v-container class="fill-height d-flex align-center justify-center py-10">
        <v-card class="error-card pa-6 pa-md-10" variant="text" max-width="780">
          <p class="error-code mb-2">{{ statusCode }}</p>
          <h1 class="error-title mb-3">{{ statusMessage }}</h1>
          <p class="error-description mb-8">{{ detailMessage }}</p>

          <div class="button-group d-flex flex-wrap">
            <v-btn color="primary" variant="flat" prepend-icon="mdi-home" size="large" class="text-none" :to="'/'">
              Kembali ke Home
            </v-btn>
            <v-btn color="primary" variant="outlined" prepend-icon="mdi-refresh" size="large" class="text-none" @click="refreshPage">
              Coba Lagi
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </main>
  </v-app>
</template>

<style scoped>
.error-shell {
  min-height: 100vh;
}

.error-card {
  border-radius: 1.25rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.24);
  background: color-mix(in srgb, rgb(var(--v-theme-surface)) 86%, rgb(var(--v-theme-primary)) 14%);
  backdrop-filter: blur(3px);
  box-shadow: 0 25px 48px rgba(9, 20, 38, 0.15);
}

.error-code {
  font-size: clamp(2.8rem, 12vw, 6.8rem);
  line-height: 1;
  letter-spacing: 0.03em;
  font-weight: 800;
  color: rgb(var(--v-theme-primary));
}

.error-title {
  font-size: clamp(1.5rem, 4.8vw, 2.4rem);
  line-height: 1.15;
  font-weight: 700;
}

.error-description {
  max-width: 64ch;
  line-height: 1.7;
  color: rgba(var(--v-theme-on-surface), 0.76);
}

.button-group {
  gap: 12px;
}

@media (max-width: 600px) {
  .error-card {
    border-radius: 1rem;
  }
}
</style>