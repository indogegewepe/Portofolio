<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <v-snackbar
      v-model="$snackbar.visible.value"
      :timeout="$snackbar.timeout.value"
      color="surface"
      location="bottom right"
      timer
    >
      {{ $snackbar.message }}
      <template #actions>
        <v-btn 
          icon 
          variant="text" 
          size="small"
          @click="$snackbar.close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
const { $snackbar } = useNuxtApp()

useSeoMeta({
  title: 'Bagas Uwaidha',
  ogTitle: 'Bagas Uwaidha - Software Developer',
  description: "Bagas Uwaidha's Personal Portfolio",
  ogDescription: 'Full Stack Developer berpengalaman dalam membangun aplikasi web menggunakan Nuxt.js, Node.js, dan Express.js. Spesialis dalam pengembangan frontend modern dan cloud architecture.',
  ogImage: 'https://bagasuwaidha.my.id/bu.png',
  twitterCard: 'summary_large_image',
})
</script>