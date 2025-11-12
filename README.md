# 🎯 Jemparingan — Web Permainan Tradisional

Aplikasi web interaktif untuk melestarikan dan memainkan Jemparingan, permainan memanah tradisional Indonesia yang berasal dari Yogyakarta.

## 📖 Tentang Jemparingan

Jemparingan adalah seni memanah tradisional Jawa yang menggunakan busur pendek (jemparing) dan dilakukan dalam posisi duduk bersila. Permainan ini tidak hanya menguji ketepatan, tetapi juga kesabaran, konsentrasi, dan ketenangan jiwa.

## ✨ Fitur

- 🎮 **Gameplay Interaktif** - Simulasi permainan jemparingan yang realistis
- 🏆 **Sistem Skor** - Pelacakan skor dan pencapaian pemain
- 👤 **Autentikasi User** - Login dan registrasi pengguna yang aman
- 📊 **Leaderboard** - Papan peringkat untuk kompetisi antar pemain
- 📱 **Responsive Design** - Tampilan optimal di berbagai perangkat
- 🎨 **UI/UX Modern** - Interface yang menarik dan mudah digunakan
- 💾 **Cloud Storage** - Penyimpanan data yang aman dan scalable

## 🚀 Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| [Next.js](https://nextjs.org/) | Framework React modern untuk web fullstack |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Supabase](https://supabase.com/) | Backend-as-a-Service untuk database, auth, dan storage |
| [pnpm](https://pnpm.io/) | Package manager yang cepat dan efisien |

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (versi 18.x atau lebih baru)
- **pnpm** (versi 8.x atau lebih baru)
- **Git**

Untuk menginstal pnpm:
```bash
npm install -g pnpm
```

## 🛠️ Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/MaulanaFarisA/jemparingan.git
   cd jemparingan
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   
   Buat file `.env.local` di root project:
   ```bash
   cp .env.example .env.local
   ```
   
   Kemudian isi dengan konfigurasi Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup database Supabase**
   
   - Buat project baru di [Supabase](https://supabase.com/)
   - Jalankan migration SQL (jika tersedia di folder `supabase/migrations`)
   - Atau setup tabel secara manual melalui Supabase Dashboard

## 🚀 Development

Jalankan development server:

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### Commands Tersedia

```bash
pnpm dev          # Jalankan development server
pnpm build        # Build aplikasi untuk production
pnpm start        # Jalankan production server
pnpm lint         # Jalankan linter
pnpm format       # Format code dengan Prettier (jika tersedia)
```

## 📁 Struktur Project

```
jemparingan/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── ...                # Pages lainnya
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                   # Utility functions dan configs
│   ├── supabase/         # Supabase client setup
│   └── utils/            # Helper functions
├── public/               # Static assets
│   ├── images/          # Gambar
│   └── sounds/          # Audio files
├── styles/              # Global styles
├── supabase/            # Supabase migrations dan configs
├── .env.local           # Environment variables (tidak di-commit)
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## 🗄️ Database Schema

### Users
- `id` (uuid, primary key)
- `username` (text, unique)
- `email` (text, unique)
- `avatar_url` (text, nullable)
- `created_at` (timestamp)

### Scores
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `score` (integer)
- `level` (integer)
- `created_at` (timestamp)

### Leaderboard
- View yang menampilkan top scores dari semua pemain

## 🔐 Environment Variables

Berikut adalah environment variables yang diperlukan:

| Variable | Deskripsi | Contoh |
|----------|-----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/Public key dari Supabase | `eyJhbGc...` |

## 🚢 Deployment

### Deploy ke Vercel (Recommended)

1. Push code Anda ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan environment variables di Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MaulanaFarisA/jemparingan)

### Deploy ke Platform Lain

Aplikasi ini dapat di-deploy ke platform hosting yang support Next.js seperti:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **DigitalOcean App Platform**

## 🎮 Cara Bermain

1. **Registrasi/Login** - Buat akun atau login dengan akun yang sudah ada
2. **Mulai Permainan** - Klik tombol "Mulai Main" di homepage
3. **Bidik Target** - Gunakan mouse/touch untuk membidik target
4. **Lepaskan Anak Panah** - Klik/tap untuk melepaskan anak panah
5. **Kumpulkan Poin** - Dapatkan poin berdasarkan akurasi tembakan Anda
6. **Naik Level** - Selesaikan level untuk membuka tantangan yang lebih sulit

## 🤝 Contributing

Kontribusi sangat diterima! Berikut cara untuk berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Coding Standards

- Gunakan TypeScript untuk type safety
- Follow Airbnb style guide untuk JavaScript/TypeScript
- Tulis kode yang clean dan mudah dipahami
- Tambahkan komentar untuk logika yang kompleks
- Buat unit test untuk fitur baru (jika applicable)

## 📝 License

Project ini dilisensikan di bawah [MIT License](LICENSE).

## 👨‍💻 Author

**Maulana Faris A**

- GitHub: [@MaulanaFarisA](https://github.com/MaulanaFarisA)

## 🙏 Acknowledgments

- Inspirasi dari permainan tradisional Jemparingan Yogyakarta
- Komunitas Next.js dan React
- Tim Supabase untuk platform yang luar biasa
- Semua kontributor yang telah membantu project ini

## 📞 Support

Jika Anda memiliki pertanyaan atau menemukan bug, silakan:

- Buat [Issue](https://github.com/MaulanaFarisA/jemparingan/issues) di GitHub
- Hubungi melalui email (jika tersedia)

## 🗺️ Roadmap

- [ ] Implementasi multiplayer mode
- [ ] Tambahkan lebih banyak level dan tantangan
- [ ] Integrasi dengan social media untuk sharing skor
- [ ] Mode tutorial interaktif untuk pemula
- [ ] Animasi dan sound effects yang lebih baik
- [ ] Mobile app (React Native)
- [ ] Sistem achievement dan badges
- [ ] Mode practice untuk melatih akurasi

---

**Selamat bermain dan lestarikan budaya tradisional Indonesia! 🇮🇩🎯**