# Web Geliştirme Ödevi - Full Stack CRUD Uygulaması

Modern teknolojiler kullanılarak geliştirilmiş tam yığın (full-stack) web uygulaması. Kullanıcı ve gönderi yönetimi için kapsamlı CRUD işlemleri sunar.

## 🏗️ Proje Mimarisi

```
WebDevelopmentAssignment/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── users/          # Kullanıcı modülü
│   │   ├── posts/          # Gönderi modülü
│   │   └── main.ts         # Sunucu giriş noktası
│   ├── package.json
│   └── README.md           # Backend kurulum rehberi
├── frontend/               # React TypeScript Client
│   ├── src/
│   │   ├── components/     # React komponentleri
│   │   ├── services/       # API servis katmanı
│   │   └── main.tsx        # Frontend giriş noktası
│   ├── package.json
│   └── README.md           # Frontend kurulum rehberi
└── README.md               # Bu dosya (genel rehber)
```

## 🚀 Teknoloji Yığını

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Tip güvenli backend geliştirme
- **Express.js** - Web framework (NestJS altında)
- **Class Validator** - DTO validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Tip güvenli frontend geliştirme
- **Vite** - Hızlı build aracı ve dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 📋 Özellikler

### ✅ Temel Özellikler
- **Full Stack CRUD**: Kullanıcı ve gönderi için tam CRUD işlemleri
- **RESTful API**: Standart HTTP metodları ile API endpoint'leri
- **Responsive Design**: Mobil-first, tüm cihazlarda uyumlu
- **TypeScript**: Hem frontend hem backend tamamen tiplenmiş
- **Modern UI/UX**: Temiz tasarım, hover efektleri, yükleme durumları

### ✅ İleri Özellikler
- **Real-time Updates**: Backend değişiklikleri frontend'e anında yansır
- **Form Validation**: Gerçek zamanlı doğrulama ve hata mesajları
- **Error Handling**: Kapsamlı hata yönetimi ve kullanıcı bildirimleri
- **User-Post Relationship**: Gönderileri yazara göre filtreleme
- **Hot Reload**: Geliştirme sırasında otomatik yeniden yükleme

## 🛠️ Hızlı Başlangıç

> **💡 Not**: Her klasörde detaylı kurulum rehberleri mevcuttur:
> - **Backend kurulumu**: `backend/README.md` dosyasını inceleyin
> - **Frontend kurulumu**: `frontend/README.md` dosyasını inceleyin
> - Bu bölüm hızlı başlangıç için özet bilgi içerir

### Gereksinimler
- **Node.js** v18.0.0+ - [nodejs.org](https://nodejs.org/)
- **npm** v8.0.0+ (Node.js ile birlikte gelir)
- **Git** (opsiyonel) - Proje klonlamak için
- **Modern tarayıcı** (Chrome, Firefox, Safari, Edge)

### Sistem Kontrolü
```bash
# Versiyonları kontrol edin
node --version    # v18.0.0+
npm --version     # 8.0.0+
git --version     # 2.0.0+
```

## 📥 Projeyi Klonlama ve Kurulum

### 1. Projeyi İndirin
```bash
# Git ile klonlama (önerilen)
git clone https://github.com/turksevenalperen/WebDevelopmentAssignment.git
cd WebDevelopmentAssignment

# veya ZIP olarak indirip çıkarın
# https://github.com/turksevenalperen/WebDevelopmentAssignment/archive/main.zip
```

### 2. Backend Kurulumu
```bash
# Backend dizinine geçin
cd backend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run start:dev
```

**Backend çıktısı:**
```
[Nest] Starting Nest application...
[Nest] Nest application successfully started
Server running on: http://localhost:3000
```

### 3. Frontend Kurulumu (Yeni Terminal)
```bash
# Yeni bir terminal açın dosya dizisine gidin sonrasında 
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

**Frontend çıktısı:**
```
VITE ready in 500 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Uygulamayı Açın
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Test**: http://localhost:3000/users

## 🎯 Kullanım Rehberi

### İlk Çalıştırma
1. **Backend başlatın** (Terminal 1): `cd backend && npm run start:dev`
2. **Frontend başlatın** (Terminal 2): `cd frontend && npm run dev`
3. **Tarayıcıda açın**: http://localhost:5173
4. **API'yi test edin**: http://localhost:3000/users

### Ana Özellikler
- **Anasayfa**: Kullanıcılar ve Gönderiler bölümlerine erişim
- **Kullanıcı Yönetimi**: Kullanıcı listeleme, ekleme, düzenleme, silme
- **Gönderi Yönetimi**: Gönderi listeleme, ekleme, düzenleme, silme
- **Filtreleme**: Gönderileri yazara göre filtreleme
- **Responsive**: Mobil ve masaüstü uyumlu arayüz

## 📊 User-Post İlişkisi ve Örnek Kullanım

### Veri Modeli İlişkisi
Bu projede **User** ve **Post** arasında **One-to-Many** (Bir-Çok) ilişki vardır:
- 🧑 **Bir kullanıcı** → 📝 **Birden fazla gönderi** oluşturabilir
- 📝 **Her gönderi** → 🧑 **Tek bir kullanıcıya** aittir
- 🔗 **Bağlantı**: `userId` foreign key ile sağlanır

### Pratikte Nasıl Çalışır?

#### 1️⃣ Yeni Kullanıcı Oluşturma
Frontend'te "Kullanıcılar" sayfasına gidin ve "Yeni Kullanıcı Ekle" butonuna tıklayın:
- **İsim**: "Ahmet Kaya" yazın
- **Kullanıcı Adı**: "ahmet2024" yazın  
- **E-posta**: "ahmet@example.com" yazın
- **Kaydet** butonuna tıklayın

**Sonuç**: Yeni kullanıcı otomatik ID ile oluşturulur (örnek: ID: 6)

#### 2️⃣ Kullanıcının Gönderileri Oluşturma
"Gönderiler" sayfasına gidin ve "Yeni Gönderi Ekle" butonuna tıklayın:

**Ahmet'in ilk gönderisi:**
- **Başlık**: "Merhaba Dünya!" yazın
- **İçerik**: "Bu benim ilk gönderi. Çok heyecanlıyım!" yazın
- **Yazar**: Dropdown'dan "Ahmet Kaya" seçin
- **Kaydet** butonuna tıklayın

**Ahmet'in ikinci gönderisi:**
- **Başlık**: "React Öğreniyorum" yazın
- **İçerik**: "React hooks gerçekten çok güçlü!" yazın
- **Yazar**: Dropdown'dan "Ahmet Kaya" seçin
- **Kaydet** butonuna tıklayın

#### 3️⃣ Filtreleme ile Kullanıcının Gönderilerini Görme
- **Frontend'te**: Gönderi listesinde "Ahmet Kaya" filtresi seçin
- **API ile**: `GET /posts` endpoint'i `userId=6` ile filtrelenebilir
- **Sonuç**: Sadece Ahmet'in yazdığı gönderiler görünür

### 🎯 Gerçek Hayat Örneği
```
👤 Kullanıcı: Ayşe Demir (ID: 2)
├── 📝 "React ile E-ticaret" (Post ID: 1)
├── 📝 "TypeScript Avantajları" (Post ID: 3)
└── 📝 "Modern CSS Teknikleri" (Post ID: 7)

👤 Kullanıcı: Mehmet Öz (ID: 3)
├── 📝 "NestJS ile API Geliştirme" (Post ID: 2)
└── 📝 "Database Tasarımı" (Post ID: 4)
```

### 🛠️ UI/UX Deneyimi
1. **Gönderi Oluştururken**: Dropdown'dan yazar seçin
2. **Gönderi Listesinde**: Her gönderinin yanında yazar adı görünür
3. **Filtreleme**: "Tüm Yazarlar" veya spesifik yazar seçebilirsiniz
4. **Kullanıcı Silme**: Kullanıcı silinirse, onun gönderileri de silinir (cascade)

### 🔍 Doğrulama Kuralları
- ✅ **Gönderi oluştururken** `userId` zorunludur
- ✅ **Geçerli kullanıcı ID'si** olmalıdır (var olan kullanıcı)
- ✅ **Kullanıcı silinirse** gönderileri de otomatik silinir
- ✅ **Frontend'te** sadece aktif kullanıcılar dropdown'da görünür

## 📡 API Endpoint'leri

### 👥 Kullanıcılar
```bash
GET    /users          # Tüm kullanıcıları listele
GET    /users/:id      # Belirli kullanıcıyı getir
POST   /users          # Yeni kullanıcı oluştur
PUT    /users/:id      # Kullanıcıyı güncelle
DELETE /users/:id      # Kullanıcıyı sil
GET    /users/:id/posts # Kullanıcının gönderilerini getir
```

### 📝 Gönderiler
```bash
GET    /posts          # Tüm gönderileri listele
GET    /posts/:id      # Belirli gönderiyi getir
POST   /posts          # Yeni gönderi oluştur
PUT    /posts/:id      # Gönderiyi güncelle
DELETE /posts/:id      # Gönderiyi sil
```

## 🧪 API Testleri

### Tarayıcıda Test
```bash
# Kullanıcıları görüntüle
http://localhost:3000/users

# Gönderileri görüntüle
http://localhost:3000/posts
```

### Frontend Arayüzü ile Test
API'yi test etmenin en kolay yolu frontend arayüzünü kullanmaktır:

#### Kullanıcı Testleri:
1. **Kullanıcı Listesi**: Anasayfada "Kullanıcılara Git" butonuna tıklayın
2. **Yeni Kullanıcı**: "Yeni Kullanıcı Ekle" butonuna tıklayın ve formu doldurun
3. **Kullanıcı Düzenleme**: Bir kullanıcının yanındaki "Düzenle" butonuna tıklayın  
4. **Kullanıcı Silme**: "Sil" butonuna tıklayın ve onaylayın

#### Gönderi Testleri:
1. **Gönderi Listesi**: Anasayfada "Gönderilere Git" butonuna tıklayın
2. **Yeni Gönderi**: "Yeni Gönderi Ekle" butonuna tıklayın ve formu doldurun
3. **Yazar Filtreleme**: Dropdown'dan bir yazar seçin ve sadece o yazarın gönderilerini görün
4. **Gönderi Düzenleme**: Bir gönderinin yanındaki "Düzenle" butonuna tıklayın

## 🔧 Geliştirme Komutları

### Backend Komutları
```bash
cd backend
npm run start:dev     # Geliştirme modunda başlat
npm run build         # Production build
npm run start:prod    # Production modunda çalıştır
npm run test          # Unit testleri çalıştır
npm run lint          # ESLint kontrolü
```

### Frontend Komutları
```bash
cd frontend
npm run dev           # Geliştirme sunucusu
npm run build         # Production build
npm run preview       # Build önizlemesi
npm run lint          # ESLint kontrolü
```

## ⚠️ Yaygın Sorunlar ve Çözümleri

### ❌ Port Çakışması
```bash
# Backend için (varsayılan: 3000)
cd backend/src/main.ts
# await app.listen(3001); // Port değiştir

# Frontend için (varsayılan: 5173)
npm run dev -- --port 3002
```

### ❌ CORS Hatası
- Backend `main.ts` dosyasında CORS ayarlarını kontrol edin
- Frontend URL'inin doğru olduğundan emin olun: `http://localhost:5173`

### ❌ Bağımlılık Sorunları
```bash
# Her iki dizinde de:
rm -rf node_modules package-lock.json
npm install
```

### ❌ TypeScript Hataları
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npx tsc --noEmit
```

## 📱 Responsive Tasarım

- **Mobile First**: 320px+ ekranlar için optimize
- **Tablet**: 768px+ için geliştirilmiş düzen
- **Desktop**: 1024px+ için tam özellik seti
- **Touch Friendly**: Büyük butonlar ve tıklama alanları

## 🎨 UI/UX Özellikleri

- **Modern Tasarım**: Temiz, minimal arayüz
- **Consistent Colors**: Profesyonel mavi-gri tema
- **Smooth Animations**: Yumuşak geçişler ve hover efektleri
- **Loading States**: Kullanıcı dostu yükleme göstergeleri
- **Error Handling**: Açık hata mesajları ve çözüm önerileri

## 📈 Performans

- **Fast Development**: Vite ile hızlı HMR
- **Optimized Build**: Production için optimize edilmiş
- **Minimal Bundle**: Sadece gerekli kod
- **Efficient API**: RESTful design patterns

## 🔐 Güvenlik

- **CORS Protection**: Frontend-backend arasında güvenli iletişim
- **Input Validation**: DTO validation ile veri doğrulama
- **TypeScript**: Tip güvenliği ile runtime hataları önleme
- **Error Boundaries**: Kontrollü hata yönetimi

## 📚 Öğrenme Kaynakları

### React & TypeScript
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

### NestJS & Backend
- [NestJS Documentation](https://docs.nestjs.com)
- [Node.js Guides](https://nodejs.org/en/learn/)

### CSS & Design
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🤝 Katkıda Bulunma

1. **Fork** edin
2. **Feature branch** oluşturun: `git checkout -b feature/amazing-feature`
3. **Commit** yapın: `git commit -m 'Add amazing feature'`
4. **Push** edin: `git push origin feature/amazing-feature`
5. **Pull Request** açın

## 📞 Destek

Sorun yaşıyorsanız:

1. **GitHub Issues**: Hata bildirimi için
2. **Documentation**: Backend ve Frontend README'leri inceleyin
3. **Console Logs**: Tarayıcı geliştirici araçlarını kontrol edin
4. **API Testing**: Tarayıcı arayüzü ile endpoint'leri test edin

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir. MIT Lisansı altında dağıtılmaktadır.

---

**🚀 Geliştirme için hazır! İyi kodlamalar!**
