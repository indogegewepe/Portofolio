<template>
  <v-main class="portfolio-home">
    <v-container class="py-8 py-md-12">
      <v-row class="hero-section align-center" data-reveal-section>
        <v-col cols="12" md="7" class="mb-8 mb-md-0" data-reveal-item>
          <v-chip color="primary" variant="tonal" size="small">
            {{ t('home.availability') }}
          </v-chip>
          <h1 class="hero-name mb-4">{{ t('home.hero.name') }}</h1>
          <h2 ref="title" class="hero-role mb-3">{{ heroTitle }}</h2>
          <p ref="subtitle" class="hero-lead mb-8">{{ heroLead }}</p>
          <div class="d-flex flex-wrap ga-3 mb-5">
            <v-btn prepend-icon="mdi-view-carousel" color="primary" variant="flat" size="large" class="text-none" @click="scrollToElement('projects')">
              {{ t('home.cta.projects') }}
            </v-btn>
            <v-btn prepend-icon="mdi-email" color="primary" variant="outlined" size="large" class="text-none" @click="scrollToElement('contact')">
              {{ t('home.cta.contact') }}
            </v-btn>
          </div>
          <div class="d-flex ga-2">
            <v-btn :aria-label="t('home.social.github')" icon="mdi-github" color="primary" variant="tonal" href="https://github.com/indogegewepe" target="_blank" />
            <v-btn :aria-label="t('home.social.linkedin')" icon="mdi-linkedin" color="primary" variant="tonal" href="https://www.linkedin.com/in/bagas-uwaidha/" target="_blank" />
          </div>
        </v-col>

        <v-col cols="12" md="5" data-reveal-item>
          <div ref="mainRef" class="hero-portrait-wrap">
            <div ref="outerRef">
              <v-card variant="elevated" class="hero-portrait-card">
                <v-img ref="logoRef" :src="profileImage" cover>
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular color="primary" indeterminate />
                    </div>
                  </template>
                </v-img>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.about.title') }}</h2>
          <p class="section-caption">{{ t('home.about.caption') }}</p>
        </v-col>
        <v-col cols="12" md="4" data-reveal-item>
          <v-card
            v-for="(stat, i) in stats"
            :key="i"
            class="panel-card mb-4"
            variant="tonal"
            color="primary"
            :title="stat.label"
            :subtitle="stat.value"
            :text="stat.sub"
          />
        </v-col>
        <v-col cols="12" md="8">
          <p v-for="(para, i) in paragraphs" :key="i" class="about-paragraph" data-reveal-item>
            {{ para }}
          </p>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.skills.title') }}</h2>
        </v-col>
        <v-col v-for="(tag, i) in tags" :key="i" cols="12" md="6" lg="4" data-reveal-item>
          <v-card class="panel-card pa-4 h-full" variant="text">
            <h3 class="text-h6 font-weight-bold mt-0">{{ tag.category }}</h3>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="(child, ci) in tag.children"
                :key="ci"
                variant="tonal"
                color="primary"
                class="skill-chip"
              >
                {{ child.name }}
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row id="projects" class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.showcase.title') }}</h2>
        </v-col>
        <v-col
          v-for="(value, i) in showCase"
          :key="i"
          cols="12"
          md="6"
          lg="4"
          class="d-flex" 
          data-reveal-item
        >
          <v-card class="panel-card project-card d-flex flex-column w-100" variant="text" :to="`/portfolio/${value.slug}`">
            <v-img
              v-if="value.img"
              height="220"
              :src="getProjectImageSrc(value.img)"
              sizes="(max-width: 600px) 92vw, (max-width: 960px) 45vw, 380px"
              cover
              class="project-image"
            />
            <v-card-title class="text-h5 font-weight-bold text-primary">{{ value.title }}</v-card-title>
            <v-card-text class="text-medium-emphasis">{{ value.desc }}</v-card-text>
            <div class="d-flex flex-wrap ga-2 px-4 pb-4">
              <v-chip
                v-for="(item, j) in value.stack"
                :key="j"
                variant="tonal"
                color="primary"
                size="small"
                class="skill-chip"
              >
                {{ item }}
              </v-chip>
            </div>
            <v-spacer />
            <v-divider />
            <template #actions>
              <v-btn
                v-if="value.demo"
                prepend-icon="mdi-open-in-new"
                :href="value.demo"
                class="flex-1 text-none"
                target="_blank"
                variant="flat"
                color="primary"
                @click.stop
              >
                {{ t('home.showcase.actions.demo') }}
              </v-btn>
              <v-btn
                v-if="value.github"
                prepend-icon="mdi-open-in-new"
                :href="value.github"
                class="flex-1 text-none"
                target="_blank"
                variant="tonal"
                color="primary"
                @click.stop
              >
                {{ t('home.showcase.actions.source') }}
              </v-btn>
            </template>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.interactiveSkills.title') }}</h2>
        </v-col>
        <v-col cols="12" md="4" v-for="(value, i) in interactiveSkills" :key="i" data-reveal-item>
          <v-card class="panel-card pa-4" variant="text">
            <div class="d-flex justify-space-between align-center mb-2">
              <h3 class="text-h6">{{ value.title }}</h3>
              <span class="text-caption">{{ value.value }}%</span>
            </div>
            <v-progress-linear
              :color="value.color"
              :model-value="value.value"
              rounded
              width="100%"
              height="10"
              striped
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.experience.title') }}</h2>
        </v-col>
        <v-col cols="12" v-for="(value, i) in experience" :key="i" data-reveal-item>
          <v-card class="panel-card pa-5" variant="text">
            <h3 class="text-h6 font-weight-bold mb-3">{{ value.company }}</h3>
            <div class="d-flex justify-space-between align-center mb-3 flex-wrap ga-2">
              <p class="text-body-1 text-primary font-weight-medium">{{ value.jobDesc }}</p>
              <p class="text-caption text-medium-emphasis">{{ value.startDate }} - {{ value.endDate }}</p>
            </div>
            <ul v-if="value.jobList.length" class="pl-5">
              <li v-for="(item, j) in value.jobList" :key="j" class="text-body-2 mb-2">
                {{ item }}
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.education.title') }}</h2>
        </v-col>
        <v-col cols="12" data-reveal-item>
          <v-card class="panel-card pa-5" variant="text">
            <h3 class="text-h6 font-weight-bold mb-3">{{ t('home.education.school') }}</h3>
            <div class="d-flex justify-space-between align-center mb-3 flex-wrap ga-2">
              <p class="text-body-1 text-primary font-weight-medium">{{ t('home.education.degree') }} · {{ t('home.education.gpa') }}</p>
              <p class="text-caption text-medium-emphasis">{{ t('home.education.period') }}</p>
            </div>
            <ul class="pl-5">
              <li v-for="(item, i) in educationItems" :key="i" class="text-body-2 mb-2">{{ item }}</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>

      <v-row id="contact" class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">{{ t('home.contact.title') }}</h2>
        </v-col>
        <v-col cols="12" md="6" data-reveal-item>
          <v-card class="panel-card pa-2" variant="text">
            <v-list lines="two" class="bg-transparent contact-list">
              <v-list-item
                v-for="(item, i) in contactItems"
                :key="i"
                :prepend-icon="item.icon"
                :title="item.title"
                :subtitle="item.subtitle"
                :href="item.href"
                :target="item.target"
                rounded
              />
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" data-reveal-item>
          <v-card class="panel-card pa-6" variant="text" color="primary">
            <p class="text-body-1 mb-4">
              {{ t('home.contact.message') }}
            </p>
            <v-btn
              block
              color="primary"
              prepend-icon="mdi-send"
              href="mailto:bagasfiqyan@gmail.com"
              class="text-none"
            >
              {{ t('home.contact.button') }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import profileImage from "~/assets/profile.png"

gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollTrigger)

const { t, locale } = useI18n()

const mainRef   = ref<HTMLElement | null>(null)
const outerRef  = ref<HTMLElement | null>(null)
const logoRef   = ref<any>(null)
const title     = ref<HTMLElement | null>(null)
const subtitle  = ref<HTMLElement | null>(null)

const ctx = ref<gsap.Context | null>(null)
const scrambleTweens = ref<gsap.core.Tween[]>([])

type SkillGroup = { category: string, children: { name: string }[] }
type ShowcaseItem = { title: string, desc: string, img: string, stack: string[], demo: string, github: string, slug: string }
type ExperienceItem = { company: string, jobDesc: string, startDate: string, endDate: string, jobList: string[] }
type ContactItem = { icon: string, title: string, subtitle: string, href: string, target: string | null }

const stats = computed(() => [
  {
    label: t('home.stats.0.label'),
    value: t('home.stats.0.value'),
    sub: t('home.stats.0.sub'),
  },
  {
    label: t('home.stats.1.label'),
    value: t('home.stats.1.value'),
    sub: t('home.stats.1.sub'),
  },
  {
    label: t('home.stats.2.label'),
    value: t('home.stats.2.value'),
    sub: t('home.stats.2.sub'),
  },
])
const paragraphs = computed(() => [
  t('home.paragraphs.0'),
  t('home.paragraphs.1'),
  t('home.paragraphs.2'),
  t('home.paragraphs.3'),
])
const tags = computed(() => [
  {
    category: t('home.skills.categories.0.category'),
    children: [
      { name: t('home.skills.categories.0.children.0.name') },
      { name: t('home.skills.categories.0.children.1.name') },
      { name: t('home.skills.categories.0.children.2.name') },
      { name: t('home.skills.categories.0.children.3.name') },
      { name: t('home.skills.categories.0.children.4.name') },
    ],
  },
  {
    category: t('home.skills.categories.1.category'),
    children: [
      { name: t('home.skills.categories.1.children.0.name') },
      { name: t('home.skills.categories.1.children.1.name') },
      { name: t('home.skills.categories.1.children.2.name') },
      { name: t('home.skills.categories.1.children.3.name') },
      { name: t('home.skills.categories.1.children.4.name') },
      { name: t('home.skills.categories.1.children.5.name') },
    ],
  },
  {
    category: t('home.skills.categories.2.category'),
    children: [
      { name: t('home.skills.categories.2.children.0.name') },
      { name: t('home.skills.categories.2.children.1.name') },
      { name: t('home.skills.categories.2.children.2.name') },
      { name: t('home.skills.categories.2.children.3.name') },
      { name: t('home.skills.categories.2.children.4.name') },
      { name: t('home.skills.categories.2.children.5.name') },
    ],
  },
  {
    category: t('home.skills.categories.3.category'),
    children: [
      { name: t('home.skills.categories.3.children.0.name') },
      { name: t('home.skills.categories.3.children.1.name') },
      { name: t('home.skills.categories.3.children.2.name') },
      { name: t('home.skills.categories.3.children.3.name') },
      { name: t('home.skills.categories.3.children.4.name') },
      { name: t('home.skills.categories.3.children.5.name') },
      { name: t('home.skills.categories.3.children.6.name') },
    ],
  },
  {
    category: t('home.skills.categories.4.category'),
    children: [
      { name: t('home.skills.categories.4.children.0.name') },
      { name: t('home.skills.categories.4.children.1.name') },
      { name: t('home.skills.categories.4.children.2.name') },
      { name: t('home.skills.categories.4.children.3.name') },
      { name: t('home.skills.categories.4.children.4.name') },
    ],
  },
])
const showCase = computed(() => [
  {
    title: t('home.showcase.projects.0.title'),
    desc: t('home.showcase.projects.0.desc'),
    img: t('home.showcase.projects.0.img'),
    stack: [
      t('home.showcase.projects.0.stack.0'),
      t('home.showcase.projects.0.stack.1'),
      t('home.showcase.projects.0.stack.2'),
    ],
    demo: '',
    github: 'https://github.com/indogegewepe/Skripsiku',
    slug: 'skripsiku',
  },
  {
    title: t('home.showcase.projects.1.title'),
    desc: t('home.showcase.projects.1.desc'),
    img: '',
    stack: [
      t('home.showcase.projects.1.stack.0'),
      t('home.showcase.projects.1.stack.1'),
      t('home.showcase.projects.1.stack.2'),
    ],
    demo: '',
    github: 'https://github.com/indogegewepe/Bot-Whatsapp',
    slug: 'Bot-Whatsapp',
  },
  {
    title: t('home.showcase.projects.2.title'),
    desc: t('home.showcase.projects.2.desc'),
    img: t('home.showcase.projects.2.img'),
    stack: [
      t('home.showcase.projects.2.stack.0'),
      t('home.showcase.projects.2.stack.1'),
    ],
    demo: 'https://github.com/indogegewepe/GameDev/raw/refs/heads/main/FindTheDifference.apk',
    github: 'https://github.com/indogegewepe/GameDev',
    slug: 'GameDev',
  },
  {
    title: t('home.showcase.projects.3.title'),
    desc: t('home.showcase.projects.3.desc'),
    img: t('home.showcase.projects.3.img'),
    stack: [
      t('home.showcase.projects.3.stack.0'),
      t('home.showcase.projects.3.stack.1'),
      t('home.showcase.projects.3.stack.2'),
    ],
    demo: '',
    github: 'https://github.com/indogegewepe/Wonosobo',
    slug: 'Wonosobo',
  },
  {
    title: t('home.showcase.projects.4.title'),
    desc: t('home.showcase.projects.4.desc'),
    img: '',
    stack: [
      t('home.showcase.projects.4.stack.0'),
      t('home.showcase.projects.4.stack.1'),
      t('home.showcase.projects.4.stack.2'),
    ],
    demo: '',
    github: 'https://github.com/indogegewepe/Supra-X-125',
    slug: 'Supra-X-125',
  },
  {
    title: t('home.showcase.projects.5.title'),
    desc: t('home.showcase.projects.5.desc'),
    img: '',
    stack: [
      t('home.showcase.projects.5.stack.0'),
      t('home.showcase.projects.5.stack.1'),
    ],
    demo: '',
    github: 'https://github.com/indogegewepe/View-saved-wifi-password',
    slug: 'View-saved-wifi-password',
  },
])
const interactiveSkills = computed(() => [
  { title: t('home.interactiveSkills.items.0.title'), value: 90, color: 'primary' },
  { title: t('home.interactiveSkills.items.1.title'), value: 60, color: 'info' },
  { title: t('home.interactiveSkills.items.2.title'), value: 75, color: 'error' },
])
const contactItems = computed(() => [
  {
    icon: 'mdi-email',
    title: t('home.contact.items.0.title'),
    subtitle: t('home.contact.items.0.subtitle'),
    href: 'mailto:bagasuwaidha007@gmail.com',
    target: null,
  },
  {
    icon: 'mdi-whatsapp',
    title: t('home.contact.items.1.title'),
    subtitle: t('home.contact.items.1.subtitle'),
    href: t('home.contact.items.1.href'),
    target: '_blank',
  },
  {
    icon: 'mdi-linkedin',
    title: t('home.contact.items.2.title'),
    subtitle: t('home.contact.items.2.subtitle'),
    href: t('home.contact.items.2.href'),
    target: '_blank',
  },
  {
    icon: 'mdi-github',
    title: t('home.contact.items.3.title'),
    subtitle: t('home.contact.items.3.subtitle'),
    href: t('home.contact.items.3.href'),
    target: '_blank',
  },
])
const experience = computed(() => [
  {
    company: t('home.experience.items.0.company'),
    jobDesc: t('home.experience.items.0.jobDesc'),
    startDate: t('home.experience.items.0.startDate'),
    endDate: t('home.experience.items.0.endDate'),
    jobList: [
      t('home.experience.items.0.jobList.0'),
      t('home.experience.items.0.jobList.1'),
      t('home.experience.items.0.jobList.2'),
    ],
  },
  {
    company: t('home.experience.items.1.company'),
    jobDesc: t('home.experience.items.1.jobDesc'),
    startDate: t('home.experience.items.1.startDate'),
    endDate: t('home.experience.items.1.endDate'),
    jobList: [
      t('home.experience.items.1.jobList.0'),
      t('home.experience.items.1.jobList.1'),
      t('home.experience.items.1.jobList.2'),
      t('home.experience.items.1.jobList.3'),
      t('home.experience.items.1.jobList.4'),
      t('home.experience.items.1.jobList.5'),
      t('home.experience.items.1.jobList.6'),
      t('home.experience.items.1.jobList.7'),
      t('home.experience.items.1.jobList.8'),
    ],
  },
  {
    company: t('home.experience.items.2.company'),
    jobDesc: t('home.experience.items.2.jobDesc'),
    startDate: t('home.experience.items.2.startDate'),
    endDate: t('home.experience.items.2.endDate'),
    jobList: [
      t('home.experience.items.2.jobList.0'),
      t('home.experience.items.2.jobList.1'),
      t('home.experience.items.2.jobList.2'),
      t('home.experience.items.2.jobList.3'),
      t('home.experience.items.2.jobList.4'),
      t('home.experience.items.2.jobList.5'),
    ],
  },
])
const educationItems = computed(() => [
  t('home.education.items.0'),
  t('home.education.items.1'),
  t('home.education.items.2'),
])
const heroTitle = computed(() => t('home.hero.role'))
const heroLead = computed(() => t('home.hero.lead'))

const runtimeConfig = useRuntimeConfig()
const cloudinaryCloudName = runtimeConfig.public.cloudinaryCloudName as string

const getProjectImageSrc = (url: string, width = 800) => {
  if (!url) return ''
  const encoded = encodeURIComponent(url)
  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/fetch/f_auto,q_auto,c_fill,w_${width},h_450/${encoded}`
}

const getProjectImageSrcSet = (url: string) => {
  if (!url) return ''
  const widths = [360, 560, 800, 1200]
  return widths
    .map(width => `${getProjectImageSrc(url, width)} ${width}w`)
    .join(', ')
}

const scrollToElement = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const playHeroScramble = () => {
  scrambleTweens.value.forEach(tween => tween.kill())
  scrambleTweens.value = []

  if (title.value) {
    scrambleTweens.value.push(
      gsap.to(title.value, {
        duration: 2,
        scrambleText: {
          text: heroTitle.value,
          chars: "lowerCase",
          revealDelay: 0.5,
        },
        ease: "power3",
      })
    )
  }

  if (subtitle.value) {
    scrambleTweens.value.push(
      gsap.to(subtitle.value, {
        duration: 2.5,
        scrambleText: {
          text: heroLead.value,
          chars: "lowerCase",
          revealDelay: 0.5,
        },
        ease: "power3",
      })
    )
  }
}

watch(locale, async () => {
  await nextTick()
  playHeroScramble()
})

onMounted(async () => {
  await nextTick()

  playHeroScramble()

  ctx.value = gsap.context(() => {
    const logoEl = logoRef.value?.$el ?? logoRef.value

    if (mainRef.value) {
      gsap.set(mainRef.value, { perspective: 1000 })
    }

    const xTo = outerRef.value ? gsap.quickTo(outerRef.value, "rotationY", { duration: 0.6, ease: "power3" }) : null
    const yTo = outerRef.value ? gsap.quickTo(outerRef.value, "rotationX", { duration: 0.6, ease: "power3" }) : null
    const logoX = logoEl ? gsap.quickTo(logoEl, "x", { duration: 0.6, ease: "power3" }) : null
    const logoY = logoEl ? gsap.quickTo(logoEl, "y", { duration: 0.6, ease: "power3" }) : null

    const handleMove = ({ clientX, clientY }: PointerEvent) => {
      if (!mainRef.value || !xTo || !yTo || !logoX || !logoY) return
      const { left, top, width, height } = mainRef.value!.getBoundingClientRect()
      const xRel = (clientX - left) / width
      const yRel = (clientY - top)  / height
      yTo(15 - yRel * 30)
      xTo(-15 + xRel * 30)
      logoX(-20 + xRel * 40)
      logoY(-20 + yRel * 40)
    }

    const handleLeave = () => {
      if (!xTo || !yTo || !logoX || !logoY) return
      yTo(0); xTo(0); logoX(0); logoY(0)
    }

    const el = mainRef.value
    el?.addEventListener("pointermove", handleMove)
    el?.addEventListener("pointerleave", handleLeave)

    const sections = gsap.utils.toArray<HTMLElement>("[data-reveal-section]")
    sections.forEach((section) => {
      const items = section.querySelectorAll("[data-reveal-item]")
      if (!items.length) return

      gsap.from(items, {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none"
        }
      })
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      el?.removeEventListener("pointermove", handleMove)
      el?.removeEventListener("pointerleave", handleLeave)
    }
  })
})

onUnmounted(() => {
  ctx.value?.revert()
  scrambleTweens.value.forEach(t => t.kill())
})
</script>

<style scoped>
.portfolio-home {
  position: relative;
  overflow: hidden;
}

.hero-section {
  min-height: 88vh;
}

.hero-name {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  letter-spacing: 0.01em;
  font-weight: 700;
}

.hero-role {
  font-size: clamp(1.15rem, 2vw, 1.65rem);
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.hero-lead {
  max-width: 64ch;
  line-height: 1.7;
  border-left: 3px solid rgba(var(--v-theme-primary), 0.5);
  padding-left: 1rem;
  color: rgba(var(--v-theme-on-surface), 0.76);
}

.hero-portrait-wrap {
  perspective: 1000px;
}

.hero-portrait-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(4, 18, 30, 0.2);
}

.section-block {
  margin-top: 1.8rem;
}

.section-title {
  font-size: clamp(1.45rem, 2.5vw, 2.15rem);
  letter-spacing: 0.01em;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.section-caption {
  color: rgba(var(--v-theme-on-surface), 0.68);
}

.panel-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  background: color-mix(in srgb, rgb(var(--v-theme-surface)) 88%, rgb(var(--v-theme-primary)) 12%);
  backdrop-filter: blur(2px);
}

@media (max-width: 959px) {
  .panel-card {
    backdrop-filter: none;
  }
}

.about-paragraph {
  line-height: 1.75;
  margin-bottom: 1rem;
}

.skill-chip {
  border: 1px solid rgba(var(--v-theme-primary), 0.25);
}

.project-card {
  transition: transform 220ms ease, box-shadow 220ms ease;
  will-change: transform;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 34px rgba(4, 18, 30, 0.16);
}

.project-image {
  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.portfolio-home :deep(.v-btn:focus-visible) {
  outline: 2px solid rgba(var(--v-theme-primary), 0.45);
  outline-offset: 2px;
}

.contact-list :deep(.v-list-item) {
  margin-bottom: 6px;
  transition: background-color 180ms ease;
}

.contact-list :deep(.v-list-item:hover) {
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.contact-list :deep(.v-list-item--link:focus-visible) {
  outline: 2px solid rgba(var(--v-theme-primary), 0.5);
  outline-offset: 2px;
}

@media (max-width: 959px) {
  .hero-section {
    min-height: auto;
  }
}
</style>