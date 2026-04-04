# 🚀 Portfolio

Personal portfolio berbasis **Nuxt** yang menampilkan profil, pengalaman, skill, serta showcase project dengan detail yang diambil langsung dari README GitHub.

🔗 **Live Demo**: [DEMO](https://bagasuwaidha.my.id)

---

## ✨ Features

* 🎯 Hero section dengan animasi teks (GSAP)
* 📁 Showcase project dengan thumbnail responsif
* 📄 Detail project di-render langsung dari README GitHub
* 🌙 Light / Dark mode
* 🔔 Global snackbar notification system
* 📱 Fully responsive (mobile & desktop)

---

## 🛠 Tech Stack

* Nuxt 4
* Vue 3
* TypeScript
* Vuetify 4
* Pinia
* GSAP
* Tailwind CSS
* Cloudinary (Fetch Delivery)

---

## ⚙️ Getting Started

### 1. Clone repository

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run development server

```bash
bun dev
```

App akan berjalan di:

```
http://localhost:3000
```

---

## 📜 Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `bun dev`      | Run development server   |
| `bun build`    | Build for production     |
| `bun generate` | Generate static site     |
| `bun preview`  | Preview production build |
| `bun lint`     | Run linter               |
| `bun lint:fix` | Fix lint issues          |

---

## 📂 Project Structure

```
app/
 ├── pages/
 │    ├── index.vue
 │    └── portfolio/[slug].vue
 │
 ├── layouts/
 │    └── default.vue
 │
 ├── plugins/
 │    └── snackbar.ts
 │
 └── assets/
      └── styles/
```

---

## 🖼 Image Optimization

Project ini menggunakan **Cloudinary Fetch Delivery** untuk mengoptimalkan gambar dari GitHub tanpa perlu upload ulang.

### ⚠️ Important

Jika ingin menjalankan project ini sendiri:

* Pastikan domain sumber gambar diizinkan di Cloudinary
* Gunakan environment variable untuk konfigurasi

Contoh:

```env
CLOUDINARY_BASE_URL=https://res.cloudinary.com/<cloud-name>/image/fetch
```

---

## 🔐 Environment Variables

Buat file `.env`:

```env
CLOUDINARY_BASE_URL=your_cloudinary_url
```

> Jangan commit `.env` ke repository publik.

---

## 🤝 Contributing

Saat ini project bersifat personal, namun tetap terbuka untuk saran atau feedback.

---

## 📄 License

```
MIT License © 2026 Bagas Tsiqoh Fiqyan Uwaidha
```

---

## 💡 Highlights

* Menggunakan pendekatan **dynamic content dari README GitHub**
* Optimasi performa dengan **remote image transformation**
* Arsitektur modular (Nuxt + composables + plugins)
* Fokus pada **UX & UI modern**
