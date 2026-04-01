<template>
  <v-app>
    <div v-if="loading" class="flex flex-col h-full items-center justify-center">
      <span class="loader"></span>
      <h2 class="text-xl mt-4">Memuat Aplikasi...</h2>
    </div>

    <div v-else>
      <v-btn
        :icon="theme.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        @click="toggleTheme"
        color="primary"
        variant="tonal"
        class="fixed top-0 left-0 z-10 border ma-4 backdrop-blur-sm elevation-4"
      />
      <v-container fluid class="app-atmosphere">
        <div class="app-atmosphere-grain" aria-hidden="true" />
        <slot />
      </v-container>
      <v-btn
        icon="mdi-arrow-up"
        color="primary"
        variant="tonal"
        class="fixed bottom-0 right-0 z-10 border ma-4 backdrop-blur-sm elevation-4"
        @click="scrollToTop"
      />
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'
  const loading = ref(true)
  const theme = useTheme()

  onMounted(async () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.global.name.value = savedTheme
    }
    await document.fonts.ready
    await nextTick()

    loading.value = false
  })

  const toggleTheme = () => {
    theme.toggle()
    localStorage.setItem('theme', theme.global.name.value)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<style scoped>
.v-container {
  padding: 0;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: rgb(var(--v-theme-on-surface)) rgb(var(--v-theme-on-surface)) transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent transparent rgb(var(--v-theme-primary)) rgb(var(--v-theme-primary));
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}
.loader::before {
  width: 32px;
  height: 32px;
  border-color: rgb(var(--v-theme-on-surface)) rgb(var(--v-theme-on-surface)) transparent transparent;
  animation: rotation 1.5s linear infinite;
}
    
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>