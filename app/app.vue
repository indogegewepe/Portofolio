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
const { t, locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale,
  },
})

useSeoMeta({
  title: () => t('seo.title'),
  ogTitle: () => t('seo.ogTitle'),
  description: () => t('seo.description'),
  ogDescription: () => t('seo.ogDescription'),
  ogImage: 'https://bagasuwaidha.my.id/bu.png',
  twitterCard: 'summary_large_image',
})
</script>