<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="content-center">
          <h1 class="text-4xl font-bold text-primary my-12">
            Bagas Tsiqoh Fiqyan Uwaidha
          </h1>
          <h1 ref="title" class="text-xl font-semibold mb-4">
            Front-End Developer
          </h1>
          <p class="text-medium-emphasis border-s-2 pl-4 mb-12">
            Full Stack Developer dengan pengalaman membangun aplikasi web menggunakan Nuxt.js, Node.js, dan Express.js. Berpengalaman dalam pengembangan RESTful API, desain database, autentikasi JWT, serta deployment aplikasi di Google Cloud Platform. Memiliki minat pada pengembangan sistem terdistribusi, optimasi algoritma, dan scalable backend architecture.
          </p>
          <v-card-actions>
            <v-btn
              icon="mdi-github"
              color="primary"
              variant="text"
              href="https://github.com/indogegewepe"
              target="_blank"
            />
            <v-btn
              icon="mdi-linkedin"
              color="primary"
              variant="text"
              href="https://www.linkedin.com/in/bagas-uwaidha/"
              target="_blank"
            />
          </v-card-actions>
          <v-card-actions>
            <v-btn
              prepend-icon="mdi-view-carousel"
              color="primary"
              variant="flat"
              size="large"
              @click="scrollToElement('projects')"
            >
              View Projects
            </v-btn>
            <v-btn
              prepend-icon="mdi-email"
              color="primary"
              variant="tonal"
              size="large"
              @click="scrollToElement('contact')"
            >
              Contact Me
            </v-btn>
          </v-card-actions>
        </v-col>
        <v-col cols="12" md="4">
          <div ref="mainRef">
            <div ref="outerRef">
              <v-card variant="elevated" class="border bg-primary">
                <v-img
                  ref="logoRef"
                  lazy-src="/assets/profile.png"
                  src="/assets/profile.png"
                >
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
      <v-row>
        <v-col cols="12">
          <h1 class="text-4xl font-bold my-4">
            Tentang Saya
          </h1>
          <p class="text-h5 text-medium-emphasis mb-4">Software Developer</p>
          
          <v-row>
            <v-col cols="12" md="3">
              <v-card class="border mb-4" variant="tonal" color="primary" v-for="(stat, i) in stats" :key="i" :title="stat.label" :subtitle="stat.value" :text="stat.sub"/>
            </v-col>
            <v-col cols="12" md="9" class="mb-4">
              <h1
                v-for="(para, i) in paragraphs"
                :key="i"
                class="text-xl mb-8"
              >
                {{ para }}
              </h1>
            </v-col>
          </v-row>
          <div ref="tagsRef">
            <h1 class="text-4xl font-bold my-4">Skills</h1>
            <div
              v-for="(tag, i) in tags"
              :key="i"
              variant="tonal"
              color="primary"
            >
              <h1 class="text-xl mt-4">{{ tag.category }}</h1>
              <v-chip
                v-for="(child, ci) in tag.children"
                :key="ci"
                variant="tonal"
                color="primary"
                class="border mr-2 my-1"
              >
                {{ child.name }}
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row id="projects">
        <v-col cols="12">
          <h1 class="text-4xl font-bold my-4">Project Showcase</h1>
        </v-col>
        <v-col 
          cols="12" 
          md="6" 
          lg="4"
          v-for="value, i in showCase"
          :key="i"
          class="d-flex"
        >
          <v-card
            class="border d-flex flex-column w-100"
            variant="text"
            elevation="1"
            :to="`/portfolio/${value.slug}`"
          >
            <v-img
              v-show="value.img"
              height="250"
              :src="value.img"
              cover
            />
            <v-card-title class="text-2xl font-bold text-primary">{{ value.title }}</v-card-title>
            <v-card-text>{{ value.desc }}</v-card-text>
            <div class="flex flex-wrap gap-1 mx-4">
              <v-chip variant="tonal" class="border" color="primary" v-for="item, j in value.stack" :key="j">{{ item }}</v-chip>
            </div>
            <v-divider class="mt-4"/>
            <template v-slot:actions>
              <v-btn
                v-if="value.demo"
                prepend-icon="mdi-open-in-new"
                :href="value.demo"
                class="flex-1"
                target="_blank"
                text="Demo"
                variant="flat"
                color="primary"
              />
              <v-btn
                v-if="value.github"
                prepend-icon="mdi-open-in-new"
                :href="value.github"
                class="flex-1 border"
                target="_blank"
                text="Source Code"
                variant="tonal"
                color="primary"
              />
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col 
          cols="12"
          v-for="value, i in interactiveSkills"
          :key="i"
        > 
          <h1 class="text-xl font-semibold my-4">{{ value.title }}</h1>
          <v-progress-linear
            :color="value.color"
            :model-value="value.value"
            rounded
            width="100%"
            height="10"
            striped
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1 class="text-4xl font-bold mt-4">Pengalaman Kerja</h1>
        </v-col>
        <v-col 
          cols="12"
          v-for="value, i in experience "
          :key="i"
        >
          <h1 class="text-xl font-semibold mb-4">{{ value.company }}</h1>
          <div class="d-flex justify-space-between align-center mb-2">
            <p class="text-h6 text-primary">{{ value.jobDesc }}</p>
            <p class="text-caption text-medium-emphasis">{{ value.startDate }} — {{ value.endDate }}</p>
          </div>
          <ul v-if="value.jobList.length" class="ml-4">
            <li v-for="item, j in value.jobList" :key="j" class="text-body-2 mb-1">
              <v-badge location="left center" :offset-x="-18" color="on-surface" dot>{{ item }}</v-badge>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1 class="text-4xl font-bold mt-4">Pendidikan</h1>
        </v-col>
        <v-col 
          cols="12"
        >
          <h1 class="text-xl font-semibold mb-4">Universitas Ahmad Dahlan</h1>
          <div class="d-flex justify-space-between align-center mb-2">
            <p class="text-h6 text-primary">S1 Informatika · GPA : 3,71</p>
            <p class="text-caption text-medium-emphasis">2020 — 2025</p>
          </div>
          <ul class="ml-4">
            <li class="text-body-2 mb-1">
              <v-badge location="left center" :offset-x="-18" color="on-surface" dot>Peserta Bangkit Academy 2024 – Cloud Computing Learning Path</v-badge>
            </li>
            <li class="text-body-2 mb-1">
              <v-badge location="left center" :offset-x="-18" color="on-surface" dot>Mempelajari Google Cloud Platform, Firestore, dan deployment App Engine</v-badge>
            </li>
            <li class="text-body-2 mb-1">
              <v-badge location="left center" :offset-x="-18" color="on-surface" dot>Skripsi: Optimasi Penjadwalan Universitas menggunakan Grey Wolf Optimizer</v-badge>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row id="contact">
        <v-col cols="12">
          <h1 class="text-4xl font-bold mt-4">Contact</h1>
        </v-col>
        <v-col cols="12" md="6">
          <v-list lines="two" class="bg-transparent">
            <v-list-item
              prepend-icon="mdi-email"
              title="Email"
              subtitle="bagasuwaidha007@gmail.com"
              href="mailto:bagasuwaidha007@gmail.com"
            />
            <v-list-item
              prepend-icon="mdi-whatsapp"
              title="WhatsApp"
              subtitle="+62 812-2786-8290"
              href="https://wa.me/6281227868290"
              target="_blank"
            />
            <v-list-item
              prepend-icon="mdi-linkedin"
              title="LinkedIn"
              subtitle="bagasuwaidha"
              href="https://www.linkedin.com/in/bagas-uwaidha/"
              target="_blank"
            />
            <v-list-item
              prepend-icon="mdi-github"
              title="GitHub"
              subtitle="indogegewepe"
              href="https://github.com/indogegewepe"
              target="_blank"
            />
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-card variant="tonal" color="primary" class="pa-4 border">
            <p class="text-body-1 mb-4">
              Saya selalu terbuka untuk diskusi mengenai proyek baru, peluang kerja, atau sekadar berbagi insight seputar teknologi web.
            </p>
            <v-btn
              block
              color="primary"
              prepend-icon="mdi-send"
              href="mailto:bagasfiqyan@gmail.com"
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
import { VRow } from "vuetify/components"

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
  { label: "Hobby", value: "Game · ANIMEK · Comic", sub: "Minecraft · Black Clover · Solo Leveling" }
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
        text: "Front-End Developer",
        chars: "lowerCase",
        revealDelay: 0.5,
      },
      ease: "power3",
    }),
    gsap.to(subtitle.value, {
      duration: 5,
      scrambleText: {
        text: "Specialized in Vue, Nuxt, and modern web architecture",
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