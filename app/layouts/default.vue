<template>
  <v-app>
    <div v-if="loading" class="flex flex-col h-full items-center justify-center">
      <v-icon size="80" class="mb-4">mdi-vuetify</v-icon>
      <v-progress-circular
        indeterminate
        color="primary"
      />
      <h2 class="text-xl mt-4">Memuat Aplikasi...</h2>
    </div>

    <div v-show="!loading">
      <v-btn
        :icon="theme.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        @click="toggleTheme"
        color="primary"
        variant="text"
      />
      <v-container fluid>
        <slot />
      </v-container>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'
  const loading = ref(true)
  const theme = useTheme()

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.global.name.value = savedTheme
    }
    nextTick(() => {
      loading.value = false
    })
  })

  const toggleTheme = () => {
    theme.toggle()
    localStorage.setItem('theme', theme.global.name.value)
  }
</script>