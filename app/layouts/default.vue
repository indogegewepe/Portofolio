<template>
  <v-app>
    <div v-if="loading" ref="loaderRoot" class="loader-shell app-atmosphere">
      <div class="app-atmosphere-grain" aria-hidden="true" />
      <div class="loader-editorial">
        <p ref="monoRef" class="loader-mono">BU</p>
        <h2 ref="nameRef" class="loader-name">{{ t('loader.name') }}</h2>
        <p ref="tagRef" class="loader-tag">{{ t('loader.tag') }}</p>
        <div class="loader-rule-wrap" aria-hidden="true">
          <span ref="ruleRef" class="loader-rule" />
        </div>
      </div>
    </div>

    <div v-else :class="['layout-content', { 'layout-content--loading': loading }]">
      <header class="app-utility">
        <div class="app-utility-inner">
          <v-btn
            prepend-icon="mdi-translate"
            :aria-label="t('language.toggleLabel')"
            @click="toggleLocale"
            color="primary"
            variant="tonal"
            rounded="xl"
            size="large"
            border
            class="floating-btn text-none"
          >
            {{ locale.toUpperCase() }}
          </v-btn>

          <v-btn
            :prepend-icon="themeIcon"
            :aria-label="t('theme.toggleLabel')"
            @click="toggleTheme"
            color="primary"
            variant="tonal"
            rounded="xl"
            size="large"
            border
            class="floating-btn text-none"
          >
            {{ t(`theme.${isDark ? 'light' : 'dark'}`) }}
          </v-btn>
        </div>
      </header>
      <v-container fluid class="app-atmosphere">
        <div class="app-atmosphere-grain" aria-hidden="true" />
        <slot />
      </v-container>
      <v-btn
        color="primary"
        variant="tonal"
        aria-label="Scroll to top"
        rounded="xl"
        size="large"
        border
        class="floating-btn floating-btn--corner"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
  import { gsap } from 'gsap'
  import { useTheme } from 'vuetify'

  const loading = ref(true)
  const theme = useTheme()
  const { t, locale, setLocale } = useI18n()
  const loaderRoot = ref<HTMLElement | null>(null)
  const monoRef = ref<HTMLElement | null>(null)
  const nameRef = ref<HTMLElement | null>(null)
  const tagRef = ref<HTMLElement | null>(null)
  const ruleRef = ref<HTMLElement | null>(null)
  let introTl: gsap.core.Timeline | null = null
  let outroTl: gsap.core.Timeline | null = null
  const isDark = computed(() => theme.global.current.value.dark)
  const themeIcon = computed(() => isDark.value ? 'mdi-weather-night' : 'mdi-weather-sunny')

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const awaitTimeline = (timeline: gsap.core.Timeline) => new Promise<void>((resolve) => {
    timeline.eventCallback('onComplete', () => resolve())
  })

  onMounted(async () => {
    const startedAt = performance.now()
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.change(savedTheme)
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
    const nextTheme = theme.global.current.value.dark ? 'light' : 'dark'
    theme.change(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  const toggleLocale = async () => {
    const nextLocale = locale.value === 'id' ? 'en' : 'id'
    await setLocale(nextLocale)
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
  position: fixed;
  inset: 0;
  z-index: 90;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.layout-content--loading {
  visibility: hidden;
}

.app-utility {
  position: fixed;
  inset: 0 0 auto;
  z-index: 30;
  padding: 0.9rem 1rem;
  pointer-events: none;
}

.app-utility-inner {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  pointer-events: auto;
}

.floating-btn {
  background:
    linear-gradient(145deg, rgba(var(--v-theme-surface), 0.86), rgba(var(--v-theme-surface), 0.74));
  backdrop-filter: blur(5px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.floating-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.floating-btn--corner {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 20;
  transform: translateZ(0);
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

@media (max-width: 600px) {
  .app-utility {
    padding: 0.6rem 0.65rem;
  }

  .app-utility-inner {
    gap: 0.4rem;
  }

  .floating-btn {
    min-width: 2.5rem;
    padding-inline: 0.6rem;
  }

  .floating-btn--corner {
    right: 0.75rem;
    bottom: 0.75rem;
  }
}
</style>