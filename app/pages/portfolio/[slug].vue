<template>
  <v-main class="project-detail">
    <v-container class="py-8 py-md-12">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <section class="hero-card mb-6" data-reveal-section>
            <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-5" data-reveal-item>
              <v-btn prepend-icon="mdi-arrow-left" variant="outlined" color="primary" class="text-none" @click="router.back()">
                Back to Portfolio
              </v-btn>
              <div class="d-flex ga-2">
                <v-chip size="small" color="primary" variant="tonal">Project Detail</v-chip>
                <v-chip size="small" color="info" variant="tonal">README Showcase</v-chip>
              </div>
            </div>

            <h1 class="detail-title mb-2" data-reveal-item>{{ projectTitle }}</h1>
            <p class="detail-lead mb-4" data-reveal-item>{{ projectDescription }}</p>

            <div class="d-flex flex-wrap ga-2" data-reveal-item>
              <v-chip v-for="(stack, i) in projectStack" :key="i" size="small" variant="tonal" color="primary" class="stack-chip">
                {{ stack }}
              </v-chip>
            </div>
          </section>

          <v-card class="markdown-card pa-6 pa-md-10" variant="text" data-reveal-section>
            <div v-if="content" class="markdown-body" v-html="content" data-reveal-item />
            <div v-else class="empty-state" data-reveal-item>
              <v-icon size="48">mdi-file-document-outline</v-icon>
              <p class="mt-4 text-medium-emphasis">Data tidak ditemukan.</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { marked } from "marked"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { onMounted, onUnmounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()

const slug = String(route.params.slug || "")
const apiReadmeUrl = `https://api.github.com/repos/indogegewepe/${slug}/readme`
const ctx = ref<gsap.Context | null>(null)

const projectMeta: Record<string, { title: string, desc: string, stack: string[] }> = {
  skripsiku: {
    title: "UAD Course Scheduler",
    desc: "Web-Based Academic Scheduling System with Dynamic Constraints.",
    stack: ["Nuxt.js", "FastAPI", "Supabase"]
  },
  "Bot-Whatsapp": {
    title: "WhatsApp Nutrition Bot",
    desc: "Bot WhatsApp untuk informasi nutrisi makanan secara cepat dan praktis.",
    stack: ["WWeb.js", "Google Translate API", "QR Code Terminal"]
  },
  GameDev: {
    title: "Find The Different",
    desc: "Game edukasi interaktif untuk anak-anak.",
    stack: ["Unity", "C#"]
  },
  Wonosobo: {
    title: "Web PHP CRUD",
    desc: "Website PHP native dengan fitur CRUD dan export PDF.",
    stack: ["PHP", "MySQL", "Bootstrap"]
  },
  "Supra-X-125": {
    title: "Bot Discord",
    desc: "Discord music bot untuk kebutuhan komunitas server.",
    stack: ["Discord.js", "Distube", "JavaScript"]
  },
  "View-saved-wifi-password": {
    title: "View Saved Wifi",
    desc: "Script Python sederhana untuk membaca saved WiFi profile di Windows.",
    stack: ["Windows", "Python"]
  }
}

const { data } = await useFetch<string>(apiReadmeUrl, {
  headers: {
    Accept: "application/vnd.github.raw"
  },
  responseType: "text"
})

const content = computed(() => {
  if (!data.value) return ""
  return marked.parse(data.value as string)
})

const projectTitle = computed(() => projectMeta[slug]?.title || slug)
const projectDescription = computed(() => projectMeta[slug]?.desc || "Repository detail dan dokumentasi project.")
const projectStack = computed(() => projectMeta[slug]?.stack || [])

onMounted(() => {
  ctx.value = gsap.context(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-reveal-section]")
    sections.forEach((section) => {
      const items = section.querySelectorAll("[data-reveal-item]")
      if (!items.length) return

      gsap.from(items, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      })
    })
  })
})

onUnmounted(() => {
  ctx.value?.revert()
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.project-detail::before,
.project-detail::after {
  content: "";
  position: absolute;
  width: 30rem;
  height: 30rem;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.14;
  pointer-events: none;
}

.project-detail::before {
  top: -9rem;
  left: -10rem;
  background: rgb(var(--v-theme-primary));
}

.project-detail::after {
  top: 24rem;
  right: -12rem;
  background: rgb(var(--v-theme-info));
}

.hero-card {
  border-radius: 1rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.24);
  background: color-mix(in srgb, rgb(var(--v-theme-surface)) 84%, rgb(var(--v-theme-primary)) 16%);
  backdrop-filter: blur(2px);
  padding: 1.25rem;
}

.detail-title {
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.detail-lead {
  max-width: 75ch;
  color: rgba(var(--v-theme-on-surface), 0.76);
  line-height: 1.7;
}

.stack-chip {
  border: 1px solid rgba(var(--v-theme-primary), 0.24);
}

.markdown-card {
  border-radius: 1rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  background: color-mix(in srgb, rgb(var(--v-theme-surface)) 92%, rgb(var(--v-theme-primary)) 8%);
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
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.8;
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
  font-family: var(--font-heading);
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
  font-family: var(--font-mono);
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
  font-family: var(--font-heading);
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