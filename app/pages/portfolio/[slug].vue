<template>
  <v-row justify="center" class="markdown-page">
    <v-col cols="12" md="10" lg="8">
      <div class="back-btn-wrapper mb-6 mt-4">
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="flat"
          color="primary"
          @click="router.back()"
        >
          Back to Portfolio
        </v-btn>
      </div>

      <v-card variant="tonal" rounded="xl" class="markdown-card pa-8 pa-md-12">
        <div v-if="content" class="markdown-body" v-html="content" />
        <div v-else class="empty-state">
          <v-icon size="48">mdi-file-document-outline</v-icon>
          <p class="mt-4 text-medium-emphasis">Data tidak ditemukan.</p>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { marked } from "marked"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const slug = route.params.slug
const url = `https://raw.githubusercontent.com/indogegewepe/${slug}/master/README.md`

const { data } = await useFetch(url)

const content = computed(() => {
  if (!data.value) return ""
  return marked.parse(data.value as string)
})
</script>

<style scoped>
.markdown-page {
  min-height: 100vh;
  padding: 24px 16px 64px;
}

.markdown-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  text-align: center;
}

/* ===== Markdown Body ===== */
.markdown-body {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1rem;
  line-height: 1.85;
  word-break: break-word;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

/* Headings */
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

.markdown-body :deep(h1) {
  font-size: 2rem;
  border-bottom: 3px solid rgb(var(--v-theme-primary));
  padding-bottom: 0.3em;
  margin-top: 0;
}

.markdown-body :deep(h2) {
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding-bottom: 0.25em;
}

.markdown-body :deep(h3) {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-primary));
}

.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  font-size: 1rem;
}

/* Paragraphs */
.markdown-body :deep(p) {
  margin-top: 0;
  margin-bottom: 1.2em;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

/* Links */
.markdown-body :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.2s;
}

.markdown-body :deep(a:hover) {
  opacity: 0.75;
}

/* Lists */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.6em;
  margin-bottom: 1.2em;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.markdown-body :deep(li) {
  margin-bottom: 0.4em;
  line-height: 1.75;
}

.markdown-body :deep(li::marker) {
  color: rgb(var(--v-theme-primary));
}

/* Blockquote */
.markdown-body :deep(blockquote) {
  margin: 1.5em 0;
  padding: 1em 1.25em;
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  background-color: rgba(var(--v-theme-primary), 0.06);
  font-style: italic;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.markdown-body :deep(blockquote p) {
  margin: 0;
  color: inherit;
}

/* Code — inline */
.markdown-body :deep(code) {
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-size: 0.875em;
  background-color: rgba(var(--v-theme-on-surface), 0.06);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 4px;
  padding: 0.15em 0.45em;
  white-space: pre-wrap;
  color: rgb(var(--v-theme-secondary));
}

/* Code — block */
.markdown-body :deep(pre) {
  background-color: rgba(var(--v-theme-on-surface), 0.92);
  border-radius: 12px;
  padding: 1.25em 1.5em;
  overflow-x: auto;
  margin-bottom: 1.5em;
}

.markdown-body :deep(pre code) {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 0.9em;
  white-space: pre;
  line-height: 1.7;
  color: rgba(var(--v-theme-surface), 0.92);
}

/* Tables */
.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  font-size: 0.95em;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.markdown-body :deep(th) {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-family: 'Segoe UI', sans-serif;
  font-weight: 600;
  padding: 0.75em 1em;
  text-align: left;
}

.markdown-body :deep(td) {
  padding: 0.65em 1em;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.markdown-body :deep(tr:last-child td) {
  border-bottom: none;
}

.markdown-body :deep(tr:nth-child(even) td) {
  background-color: rgba(var(--v-theme-on-surface), 0.03);
}

/* Horizontal Rule */
.markdown-body :deep(hr) {
  border: none;
  border-top: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
  margin: 2em 0;
}

/* Images */
.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 1em 0;
}

/* Badges (img inside p, e.g. shields.io) */
.markdown-body :deep(p > img) {
  border-radius: 4px;
  margin: 0 4px 4px 0;
  display: inline-block;
}
</style>