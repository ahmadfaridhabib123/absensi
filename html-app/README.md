# Absensi SMAN Gurah

Sistem absensi digital modern untuk SMAN Gurah yang memudahkan proses pencatatan kehadiran siswa, monitoring guru, dan laporan administrasi sekolah yang terintegrasi.

## Fitur Utama

### 🎓 Untuk Siswa
- Absensi masuk dan pulang dengan satu klik
- Kalender kehadiran interaktif
- Riwayat absensi lengkap
- Statistik kehadiran pribadi
- Notifikasi real-time

### 👨‍🏫 Untuk Guru
- Manajemen absensi per kelas (X-1 sampai XII-10)
- Input status kehadiran (Hadir, Izin, Sakit, Alpha)
- Rekap absensi harian/mingguan/bulanan
- Export data ke PDF/Excel
- Monitoring kelas real-time

### 🔧 Untuk Admin
- Dashboard komprehensif
- Statistik kehadiran seluruh sekolah
- Manajemen data siswa dan guru
- Analisis performa kelas
- Export laporan lengkap
- Backup data sistem

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Storage**: LocalStorage untuk data persistence
- **Icons**: Lucide Icons (SVG)
- **Design**: Responsive, Mobile-First, Modern UI

## Struktur File

```
html-app/
├── index.html                 # Halaman login/beranda
├── dashboard-siswa.html       # Dashboard siswa
├── dashboard-guru.html        # Dashboard guru
├── dashboard-admin.html       # Dashboard admin
├── css/
│   └── style.css              # Stylesheet utama
├── js/
│   ├── main.js               # Fungsi global
│   ├── dashboard-siswa.js    # Logic dashboard siswa
│   ├── dashboard-guru.js     # Logic dashboard guru
│   └── dashboard-admin.js    # Logic dashboard admin
└── assets/
    ├── images/               # Gambar dan ilustrasi
    └── icons/                # Ikon tambahan
```

## Cara Penggunaan

### 1. Buka Aplikasi
Buka file `index.html` di browser modern (Chrome, Firefox, Safari, Edge).

### 2. Pilih Peran
Pilih peran Anda (Siswa, Guru, atau Admin) dan klik tombol masuk.

### 3. Navigasi Dashboard
- **Siswa**: Lakukan absensi masuk/pulang, lihat riwayat
- **Guru**: Pilih kelas, input absensi siswa
- **Admin**: Monitor data, generate laporan, export data

## Fitur Desain

### 🎨 Warna Tema
- Biru Sekolah: `#1e40af`
- Hijau Muda: `#16a34a`
- Putih: `#ffffff`
- Abu-abu Netral: Variasi `#f9fafb` - `#111827`

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly interface (minimum 44px touch targets)

### ✨ Animasi & Interaksi
- Smooth transitions (0.2s - 0.5s)
- Hover effects pada semua elemen interaktif
- Loading states dan feedback visual
- Micro-interactions untuk pengalaman yang lebih baik

### ♿ Aksesibilitas
- Semantic HTML5
- ARIA labels dan roles
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance (WCAG AA)

## Data Management

### LocalStorage Structure
```javascript
{
  "currentUser": { id, name, email, role, ... },
  "classes": [ { id, name, grade, program, studentCount, ... } ],
  "students": [ { id, name, nis, className, ... } ],
  "attendances": [ { id, studentId, date, status, ... } ]
}
```

### Status Kehadiran
- **Hadir**: Siswa hadir tepat waktu
- **Izin**: Siswa izin dengan keterangan
- **Sakit**: Siswa sakit dengan surat dokter
- **Alpha**: Siswa tidak hadir tanpa keterangan

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ Internet Explorer (tidak didukung)

## Performance

- Optimized images (WebP format when available)
- Minimal JavaScript (no external dependencies)
- CSS animations menggunakan GPU acceleration
- Efficient DOM manipulation

## Keamanan

- Client-side data validation
- Input sanitization
- XSS prevention
- Secure data handling practices

## Pengembangan

### Environment Setup
1. Clone/download repository
2. Buka `index.html` di browser
3. Tidak perlu installation atau build process

### Customization
- Ubah warna tema di `css/style.css` (CSS Variables)
- Tambah fitur baru di file JavaScript yang sesuai
- Modifikasi struktur data di `js/main.js`

## Troubleshooting

### Common Issues
1. **Data tidak tersimpan**: Pastikan browser mengizinkan LocalStorage
2. **Tampilan rusak**: Gunakan browser modern dengan CSS Grid support
3. **Fitur tidak berfungsi**: Check browser console untuk error messages

### Debug Mode
Buka browser developer tools (F12) dan check tab Console untuk debug information.

## Lisensi

MIT License - Gratis untuk penggunaan edukasi

## Kontak

- Email: support@sman-gurah.sch.id
- Telepon: (031) 1234-5678
- Alamat: Jl. Pendidikan No. 123, Gurah, Kediri

---

**Dikembangkan dengan ❤️ untuk pendidikan Indonesia**