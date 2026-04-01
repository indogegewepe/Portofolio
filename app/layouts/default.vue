<template>
  <v-app>
    <div v-if="loading" ref="loaderRoot" class="loader-shell app-atmosphere">
      <div class="app-atmosphere-grain" aria-hidden="true" />
      <div class="loader-editorial">
        <p ref="monoRef" class="loader-mono">BU</p>
        <h2 ref="nameRef" class="loader-name">Bagas Uwaidha</h2>
        <p ref="tagRef" class="loader-tag">Building fast, thoughtful web interfaces</p>
        <div class="loader-rule-wrap" aria-hidden="true">
          <span ref="ruleRef" class="loader-rule" />
        </div>
      </div>
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
  import { nextTick, onMounted, onUnmounted, ref } from 'vue'
  import { gsap } from 'gsap'
  import { useTheme } from 'vuetify'

  const loading = ref(true)
  const theme = useTheme()
  const loaderRoot = ref<HTMLElement | null>(null)
  const monoRef = ref<HTMLElement | null>(null)
  const nameRef = ref<HTMLElement | null>(null)
  const tagRef = ref<HTMLElement | null>(null)
  const ruleRef = ref<HTMLElement | null>(null)
  let introTl: gsap.core.Timeline | null = null
  let outroTl: gsap.core.Timeline | null = null

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const awaitTimeline = (timeline: gsap.core.Timeline) => new Promise<void>((resolve) => {
    timeline.eventCallback('onComplete', () => resolve())
  })

  onMounted(async () => {
    const startedAt = performance.now()
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.global.name.value = savedTheme
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    await nextTick()

    if (!reduceMotion && loaderRoot.value && monoRef.value && nameRef.value && tagRef.value && ruleRef.value) {
      introTl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      introTl
        .set([monoRef.value, nameRef.value, tagRef.value], { opacity: 0, y: 16 })
        .set(ruleRef.value, { scaleX: 0, transformOrigin: 'left center' })
        .to(monoRef.value, { opacity: 1, y: 0, duration: 0.32 })
        .to(nameRef.value, { opacity: 1, y: 0, duration: 0.36 }, '-=0.1')
        .to(tagRef.value, { opacity: 1, y: 0, duration: 0.3 }, '-=0.16')
        .to(ruleRef.value, { scaleX: 1, duration: 0.45 }, '-=0.05')

      await awaitTimeline(introTl)
    }

    await document.fonts.ready
    await nextTick()

    const minDuration = 1000
    const elapsed = performance.now() - startedAt
    if (elapsed < minDuration) {
      await wait(minDuration - elapsed)
    }

    if (!reduceMotion && loaderRoot.value && monoRef.value && nameRef.value && tagRef.value && ruleRef.value) {
      outroTl = gsap.timeline({ defaults: { ease: 'power2.in' } })
      outroTl
        .to([tagRef.value, ruleRef.value], { opacity: 0, y: -6, duration: 0.18 })
        .to([monoRef.value, nameRef.value], { opacity: 0, y: -14, duration: 0.24 }, '-=0.08')
        .to(loaderRoot.value, { opacity: 0, duration: 0.16 }, '-=0.1')

      await awaitTimeline(outroTl)
    }

    loading.value = false
  })

  onUnmounted(() => {
    introTl?.kill()
    outroTl?.kill()
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

.loader-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.loader-editorial {
  width: min(620px, 92vw);
  text-align: center;
  padding: 1.25rem;
}

.loader-mono {
  margin: 0;
  font-size: clamp(2.4rem, 8vw, 4rem);
  line-height: 1;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.loader-name {
  margin: 0.25rem 0 0;
  font-size: clamp(1.25rem, 3vw, 1.9rem);
  line-height: 1.2;
  font-weight: 700;
}

.loader-tag {
  margin: 0.75rem auto 0;
  max-width: 44ch;
  color: rgba(var(--v-theme-on-surface), 0.72);
}

.loader-rule-wrap {
  margin: 1rem auto 0;
  width: min(260px, 72vw);
  height: 2px;
  background: rgba(var(--v-theme-on-surface), 0.16);
  border-radius: 999px;
  overflow: hidden;
}

.loader-rule {
  display: block;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-info)));
}

@media (prefers-reduced-motion: reduce) {
  .loader-editorial,
  .loader-mono,
  .loader-name,
  .loader-tag,
  .loader-rule {
    transition: none !important;
    animation: none !important;
  }
}
</style>