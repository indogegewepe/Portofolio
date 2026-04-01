<template>
  <v-main class="portfolio-home">
    <v-container class="py-8 py-md-12">
      <v-row class="hero-section align-center" data-reveal-section>
        <v-col cols="12" md="7" class="mb-8 mb-md-0" data-reveal-item>
          <div class="w-full text-right md:text-left">
            <v-chip color="primary" variant="tonal" size="small">
              Available for freelance and full-time
            </v-chip>
          </div>
          <h1 class="hero-name mb-4">Bagas Tsiqoh Fiqyan Uwaidha</h1>
          <h2 ref="title" class="hero-role mb-3"/>
          <p ref="subtitle" class="hero-lead mb-8"/>
          <div class="d-flex flex-wrap ga-3 mb-5">
            <v-btn prepend-icon="mdi-view-carousel" color="primary" variant="flat" size="large" class="text-none" @click="scrollToElement('projects')">
              View Projects
            </v-btn>
            <v-btn prepend-icon="mdi-email" color="primary" variant="outlined" size="large" class="text-none" @click="scrollToElement('contact')">
              Contact Me
            </v-btn>
          </div>
          <div class="d-flex ga-2">
            <v-btn icon="mdi-github" color="primary" variant="tonal" href="https://github.com/indogegewepe" target="_blank" />
            <v-btn icon="mdi-linkedin" color="primary" variant="tonal" href="https://www.linkedin.com/in/bagas-uwaidha/" target="_blank" />
          </div>
        </v-col>

        <v-col cols="12" md="5" data-reveal-item>
          <div ref="mainRef" class="hero-portrait-wrap">
            <div ref="outerRef">
              <v-card variant="elevated" class="hero-portrait-card">
                <v-img ref="logoRef" :lazy-src="profileImage" :src="profileImage" cover>
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
          <h2 class="section-title">Tentang Saya</h2>
          <p class="section-caption">Software Developer</p>
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
        <v-col cols="12" md="8" data-reveal-item>
          <p v-for="(para, i) in paragraphs" :key="i" class="about-paragraph">
            {{ para }}
          </p>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">Skills</h2>
        </v-col>
        <v-col v-for="(tag, i) in tags" :key="i" cols="12" md="6" lg="4" data-reveal-item>
          <v-card class="panel-card pa-4 h-full" variant="text">
            <h3 class="text-h6 font-weight-bold mb-3">{{ tag.category }}</h3>
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
          <h2 class="section-title">Project Showcase</h2>
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
            <v-img v-if="value.img" height="220" :src="value.img" cover class="project-image" />
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
                text="Demo"
                variant="flat"
                color="primary"
                @click.stop
              />
              <v-btn
                v-if="value.github"
                prepend-icon="mdi-open-in-new"
                :href="value.github"
                class="flex-1 text-none"
                target="_blank"
                text="Source Code"
                variant="tonal"
                color="primary"
                @click.stop
              />
            </template>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">Interactive Skills</h2>
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
          <h2 class="section-title">Pengalaman Kerja</h2>
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
          <h2 class="section-title">Pendidikan</h2>
        </v-col>
        <v-col cols="12" data-reveal-item>
          <v-card class="panel-card pa-5" variant="text">
            <h3 class="text-h6 font-weight-bold mb-3">Universitas Ahmad Dahlan</h3>
            <div class="d-flex justify-space-between align-center mb-3 flex-wrap ga-2">
              <p class="text-body-1 text-primary font-weight-medium">S1 Informatika · GPA : 3,71</p>
              <p class="text-caption text-medium-emphasis">2020 - 2025</p>
            </div>
            <ul class="pl-5">
              <li class="text-body-2 mb-2">Peserta Bangkit Academy 2024 - Cloud Computing Learning Path</li>
              <li class="text-body-2 mb-2">Mempelajari Google Cloud Platform, Firestore, dan deployment App Engine</li>
              <li class="text-body-2 mb-2">Skripsi: Optimasi Penjadwalan Universitas menggunakan Grey Wolf Optimizer</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>

      <v-row id="contact" class="section-block" data-reveal-section>
        <v-col cols="12" data-reveal-item>
          <h2 class="section-title">Contact</h2>
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
              Saya selalu terbuka untuk diskusi mengenai proyek baru, peluang kerja, atau sekadar berbagi insight seputar teknologi web.
            </p>
            <v-btn
              block
              color="primary"
              prepend-icon="mdi-send"
              href="mailto:bagasfiqyan@gmail.com"
              class="text-none"
            >
              Kirim Pesan
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import profileImage from "~/assets/profile.png"

gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollTrigger)

const mainRef   = ref<HTMLElement | null>(null)
const outerRef  = ref<HTMLElement | null>(null)
const logoRef   = ref<any>(null)
const title     = ref<HTMLElement | null>(null)
const subtitle  = ref<HTMLElement | null>(null)

const ctx = ref<gsap.Context | null>(null)
const scrambleTweens = ref<gsap.core.Tween[]>([])

const stats = [
  { label: "Spesialisasi", value: "Frontend Developer", sub: "Vue · Nuxt.js · TypeScript · Modern Web Architecture · Pinia" },
  { label: "Background", value: "Informatika", sub: "Full-stack & Cloud Computing" },
  { label: "Hobby", value: "Game · Anime · Comic", sub: "Minecraft · Black Clover · Solo Leveling" }
]

const paragraphs = [
  "Saya adalah seorang Software Developer berlatar belakang Informatika dengan fokus utama pada Frontend Development. Saya membangun aplikasi web modern yang cepat, interaktif, dan skalabel menggunakan Vue dan Nuxt sebagai stack utama.",
  "Selain frontend, saya juga berpengalaman dalam backend development dan cloud architecture — mulai dari membangun RESTful API dengan Node.js, Express.js, dan FastAPI, hingga deployment menggunakan Google Cloud Platform.",
  "Dalam beberapa proyek saya terlibat penuh dalam pengembangan full-stack system: dari perancangan database schema, pengembangan API, hingga integrasi frontend. Saya juga pernah mengembangkan sistem optimasi penjadwalan menggunakan algoritma Grey Wolf Optimizer — yang mencerminkan ketertarikan saya pada problem solving berbasis algoritma.",
  "Saat ini saya terus mengembangkan diri dalam frontend engineering, web performance, dan scalable architecture — dengan tujuan membangun produk digital yang tidak hanya berfungsi optimal, tetapi juga memberikan pengalaman pengguna yang luar biasa."
];

const tags = [
  {
    category: "Frontend",
    children: [
      { name: "Vue.js" },
      { name: "Nuxt.js" },
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
    ]
  },
  {
    category: "Backend",
    children: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Firestore" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "Strapi" }
    ]
  },
  {
    category: "Styling",
    children: [
      { name: "Tailwind" },
      { name: "Bootstrap" },
      { name: "Material UI" },
      { name: "Aceternity" },
      { name: "SCSS" },
      { name: "GSAP" }
    ]
  },
  {
    category: "Tools & Cloud",
    children: [
      { name: "CachyOS" },
      { name: "Google Cloud" },
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "AWS" },
      { name: "Vercel" },
      { name: "Netlify" }
    ]
  },
  {
    category: "Other",
    children: [
      { name: "Unity" },
      { name: "Git" },
      { name: "Figma" },
      { name: "REST API" },
      { name: "ERP Software" }
    ]
  }
];

const showCase = [
  {
    title: "UAD Course Scheduler",
    desc: "Web-Based Academic Scheduling System with Dynamic Constraints",
    img: "https://raw.githubusercontent.com/indogegewepe/Skripsiku/refs/heads/master/fr%20skripsi.png",
    stack: ["Nuxt.js", "FastAPI", "Supabase"],
    demo: "",
    github: "https://github.com/indogegewepe/Skripsiku",
    slug: "skripsiku"
  },
  {
    title: "WhatsApp Nutrition Bot",
    desc: "WhatsApp Nutrition Bot adalah aplikasi berbasis WhatsApp yang memberikan informasi nutrisi dari makanan yang dimasukkan pengguna. Bot ini dirancang untuk membantu pengguna memantau asupan kalori dan nutrisi harian mereka dengan mudah.",
    img: "",
    stack: ["WWeb.js", "Google Translate API", "QR Code Terminal"],
    demo: "",
    github: "https://github.com/indogegewepe/Bot-Whatsapp",
    slug: "Bot-Whatsapp"
  },
  {
    title: "Find The Different",
    desc: "Game edukasi interaktif yang dirancang untuk anak-anak",
    img: "https://raw.githubusercontent.com/indogegewepe/GameDev/refs/heads/main/Assets/Home.jpg",
    stack: ["Unity", "C#"],
    demo: "https://github.com/indogegewepe/GameDev/raw/refs/heads/main/FindTheDifference.apk",
    github: "https://github.com/indogegewepe/GameDev",
    slug: "GameDev"
  },
  {
    title: "Web PHP CRUD",
    desc: "Website PHP naitve dengan fungsionalitas CRUD dan download file pdf",
    img: "https://raw.githubusercontent.com/indogegewepe/Wonosobo/main/assets/img/Untitled.png",
    stack: ["PHP", "MySQL", "Bootstrap"],
    demo: "",
    github: "https://github.com/indogegewepe/Wonosobo",
    slug: "Wonosobo"
  },
  {
    title: "Bot Discord",
    desc: "Play song Bot Discord",
    img: "",
    stack: ["Discord.js", "Distube", "JavaScript"],
    demo: "",
    github: "https://github.com/indogegewepe/Supra-X-125",
    slug: "Supra-X-125"
  },
  {
    title: "View Saved Wifi",
    desc: "View saved wifi password on windows using simple code python",
    img: "",
    stack: ["Windows", "Python"],
    demo: "",
    github: "https://github.com/indogegewepe/View-saved-wifi-password",
    slug: "View-saved-wifi-password"
  },
]

const interactiveSkills = [
  { title: "Frontend", value: 90, color: "primary" }, 
  { title: "Backend", value: 60, color: "info" }, 
  { title: "UI/UX Design", value: 75, color: "error"}
]

const contactItems = [
  {
    icon: "mdi-email",
    title: "Email",
    subtitle: "bagasuwaidha007@gmail.com",
    href: "mailto:bagasuwaidha007@gmail.com",
    target: undefined
  },
  {
    icon: "mdi-whatsapp",
    title: "WhatsApp",
    subtitle: "+62 812-2786-8290",
    href: "https://wa.me/6281227868290",
    target: "_blank"
  },
  {
    icon: "mdi-linkedin",
    title: "LinkedIn",
    subtitle: "bagasuwaidha",
    href: "https://www.linkedin.com/in/bagas-uwaidha/",
    target: "_blank"
  },
  {
    icon: "mdi-github",
    title: "GitHub",
    subtitle: "indogegewepe",
    href: "https://github.com/indogegewepe",
    target: "_blank"
  }
]

const experience = [
  { company: "CV Gama Putra Santosa", jobDesc: "Game Designer", startDate: "Sep 2024", endDate: "Des 2024", jobList: [
    "Saya merancang dan membuat Game Design Document (GDD)",
    "Saya membuat sketsa, mockup UI, konsep karakter dan lingkungan untuk mendukung pengembangan game",
    "Saya bertanggung jawab atas konsep keseluruhan dan koordinasi tim"
  ] },
  { company: "CV Andita", jobDesc: "Full Stack Developer", startDate: "Jul 2025", endDate: "Aug 2025", jobList: [
    "Merancang UI/UX aplikasi menggunakan Figma",
    "Mengembangkan frontend aplikasi menggunakan Next.js",
    "Menerapkan styling responsif menggunakan Tailwind CSS untuk memastikan tampilan optimal di berbagai perangkat.",
    "Mengimplementasikan animasi dan interactive UI menggunakan Aceternity untuk meningkatkan user experience.",
    "Membangun backend headless CMS menggunakan Strapi untuk manajemen konten dan integrasi API.",
    "Mengintegrasikan frontend dengan REST API dari Strapi untuk pengelolaan data secara dinamis.",
    "Melakukan deployment frontend menggunakan Vercel dengan optimasi build dan performa.",
    "Melakukan deployment dan pengelolaan backend menggunakan Railway.",
    "Melakukan testing, debugging, dan optimasi performa aplikasi web."
  ] },
  { company: "PT Fimosa Technology Indonesia", jobDesc: "Full Stack Developer", startDate: "Aug 2025", endDate: "Mar 2026", jobList: [
    "Mengembangkan dan memelihara Backend dan Frontend produk milik perusahaan.",
    "Merancang, mengimplementasikan dan mengoptimalkan database.",
    "Memastikan keamanan aplikasi dan data pengguna.",
    "Melakukan debugging dan pemecahan masalah teknis.",
    "Mengoptimalkan performa aplikasi.",
    "Menulis dokumentasi kode dan panduan teknis."
  ] },
]

const scrollToElement = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  scrambleTweens.value = [
    gsap.to(title.value, {
      duration: 5,
      scrambleText: {
        text: "Full-Stack Developer",
        chars: "lowerCase",
        revealDelay: 0.5,
      },
      ease: "power3",
    }),
    gsap.to(subtitle.value, {
      duration: 5,
      scrambleText: {
        text: "Full Stack Developer dengan pengalaman membangun aplikasi web menggunakan Nuxt.js, Node.js, dan Express.js. Berpengalaman dalam pengembangan RESTful API, desain database, autentikasi JWT, serta deployment aplikasi di Google Cloud Platform.",
        chars: "lowerCase",
        revealDelay: 0.5,
      },
      ease: "power3",
    })
  ]

  ctx.value = gsap.context((context) => {
    const logoEl = logoRef.value?.$el ?? logoRef.value

    gsap.set(mainRef.value, { perspective: 1000 })

    const xTo = gsap.quickTo(outerRef.value, "rotationY", { duration: 0.6, ease: "power3" })
    const yTo = gsap.quickTo(outerRef.value, "rotationX", { duration: 0.6, ease: "power3" })
    const logoX = gsap.quickTo(logoEl, "x", { duration: 0.6, ease: "power3" })
    const logoY = gsap.quickTo(logoEl, "y", { duration: 0.6, ease: "power3" })

    const handleMove = ({ clientX, clientY }: PointerEvent) => {
      if (!mainRef.value) return
      const { left, top, width, height } = mainRef.value!.getBoundingClientRect()
      const xRel = (clientX - left) / width
      const yRel = (clientY - top)  / height
      yTo(15 - yRel * 30)
      xTo(-15 + xRel * 30)
      logoX(-20 + xRel * 40)
      logoY(-20 + yRel * 40)
    }

    const handleLeave = () => {
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
          toggleActions: "play none none reverse"
        }
      })
    })

    return () => {
      el?.removeEventListener("pointermove", handleMove)
      el?.removeEventListener("pointerleave", handleLeave)
    }
  }, mainRef.value || undefined)
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

.portfolio-home::before,
.portfolio-home::after {
  content: "";
  position: absolute;
  width: 34rem;
  height: 34rem;
  pointer-events: none;
  filter: blur(72px);
  opacity: 0.16;
}

.portfolio-home::before {
  top: -12rem;
  left: -14rem;
  background: rgb(var(--v-theme-primary));
}

.portfolio-home::after {
  top: 18rem;
  right: -14rem;
  background: rgb(var(--v-theme-info));
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

.about-paragraph {
  line-height: 1.75;
  margin-bottom: 1rem;
}

.skill-chip {
  border: 1px solid rgba(var(--v-theme-primary), 0.25);
}

.project-card {
  transition: transform 220ms ease, box-shadow 220ms ease;
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