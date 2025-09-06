# Frontend - Web Geliştirme Ödevi

Kullanıcı ve gönderi yönetimi için CRUD işlemleri içeren modern React TypeScript frontend uygulaması.

## 🚀 Teknoloji Yığını

- **React 19** - Hook'lar ile modern React
- **TypeScript** - Tip güvenli geliştirme
- **Vite** - Hızlı build aracı ve geliştirme sunucusu
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - İstemci tarafı yönlendirme
- **ESLint** - Kod linting ve kalite kontrol

## 📋 Özellikler

- ✅ **Kullanıcı Yönetimi**: Kullanıcı oluştur, oku, güncelle, sil
- ✅ **Gönderi Yönetimi**: Gönderi oluştur, oku, güncelle, sil
- ✅ **Responsive Tasarım**: Mobil öncelikli, uyarlanabilir düzenler
- ✅ **TypeScript**: Tamamen tiplenmiş komponentler ve servisler
- ✅ **Modern UI/UX**: Temiz kartlar, hover efektleri, yükleme durumları
- ✅ **Form Doğrulama**: Gerçek zamanlı doğrulama ve geri bildirim
- ✅ **Hata Yönetimi**: Kullanıcı dostu hata mesajları
- ✅ **Kullanıcı-Gönderi İlişkisi**: Gönderileri yazara göre filtrele

## 🛠️ Kurulum ve Ayarlama

### Gereksinimler
- Node.js (v18 veya üstü)
- npm veya yarn paket yöneticisi

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

Uygulama **http://localhost:5173** adresinde başlayacak

### 3. Production İçin Build Et
```bash
npm run build
```

### 4. Production Build'ini Önizle
```bash
npm run preview
```

### 5. Kodu Lint Et
```bash
npm run lint
```

## 🌐 API Entegrasyonu

Bu frontend, **http://localhost:3000** adresinde çalışan NestJS backend ile iletişim kurar

### Kullanılan API Endpoint'leri:
- `GET /users` - Tüm kullanıcıları getir
- `GET /users/:id` - ID'ye göre kullanıcı getir
- `POST /users` - Yeni kullanıcı oluştur
- `PUT /users/:id` - Kullanıcı güncelle
- `DELETE /users/:id` - Kullanıcı sil
- `GET /posts` - Tüm gönderileri getir
- `GET /posts/:id` - ID'ye göre gönderi getir
- `POST /posts` - Yeni gönderi oluştur
- `PUT /posts/:id` - Gönderi güncelle
- `DELETE /posts/:id` - Gönderi sil
- `GET /users/:id/posts` - Kullanıcının gönderilerini getir

## 📁 Proje Yapısı

```
src/
├── components/          # React komponentleri
│   ├── Homepage.tsx     # Ana sayfa
│   ├── UserList.tsx     # Kullanıcı listeleme sayfası
│   ├── UserForm.tsx     # Kullanıcı oluştur/düzenle formu
│   ├── PostList.tsx     # Gönderi listeleme sayfası
│   └── PostForm.tsx     # Gönderi oluştur/düzenle formu
├── services/            # API servis katmanı
│   ├── api.ts          # Temel API yardımcıları
│   ├── userService.ts  # Kullanıcı CRUD işlemleri
│   └── postService.ts  # Gönderi CRUD işlemleri
├── App.tsx             # Ana uygulama komponenti
└── main.tsx           # Uygulama giriş noktası
```

## 🎨 UI/UX Özellikleri

- **Tutarlı Renk Teması**: Profesyonel mavi ve gri palet
- **Responsive Grid'ler**: Tüm ekran boyutları için uyarlanabilir düzenler
- **İnteraktif Öğeler**: Hover efektleri, geçişler, odak durumları
- **Yükleme Durumları**: Dönen simgeler ve iskelet yükleme
- **Boş Durumlar**: Veri olmadığında yardımcı mesajlar
- **Form UX**: Karakter sayaçları, doğrulama, önizleme modları
- **Navigasyon**: Açık breadcrumb'lar ve eylem butonları

## 🔧 Geliştirme

### Kod Kalitesi
- TypeScript ve React için ESLint yapılandırması
- Sıkı TypeScript ayarları
- `any` tiplerine izin verilmez
- Hook'lar ile modern React kalıpları

### Performans
- Hızlı geliştirme ve build için Vite
- Optimize edilmiş Tailwind CSS
- Verimli state yönetimi
- Minimal yeniden render'lar

## 📱 Responsive Tasarım

- **Mobile First**: Mobil için tasarlandı, masaüstü için geliştirildi
- **Breakpoint'ler**: sm (640px), md (768px), lg (1024px)
- **Dokunma Dostu**: Büyük tıklanabilir alanlar
- **Esnek Düzenler**: Grid ve flexbox düzenleri

## 🚦 Başlangıç

1. Backend'in 3000 portunda çalıştığından emin olun
2. Frontend bağımlılıklarını yükleyin: `npm install`
3. Geliştirme sunucusunu başlatın: `npm run dev`
4. Tarayıcınızda http://localhost:5173 adresini açın
5. Kullanıcılar ve Gönderiler bölümleri arasında gezinin
6. Öğe oluşturma, düzenleme ve silme işlemlerini deneyin

## 🔗 İlgili

- **Backend**: `../backend/` dizinindeki NestJS API sunucusu
- **Dokümantasyon**: API detayları için backend README'ye bakın
