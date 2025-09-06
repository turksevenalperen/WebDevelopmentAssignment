# Backend - Web Geliştirme Ödevi

Kullanıcı ve gönderi yönetimi için CRUD API endpoint'leri sağlayan NestJS backend uygulaması.

## 🚀 Teknoloji Yığını

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Tip güvenli backend geliştirme
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework (NestJS altında)
- **Class Validator** - DTO validation
- **CORS** - Cross-origin resource sharing

## 📋 Özellikler

- ✅ **RESTful API**: Standart HTTP metodları ile CRUD işlemleri
- ✅ **TypeScript**: Tamamen tiplenmiş kod tabanı
- ✅ **Moduler Yapı**: Ayrılmış users ve posts modülleri
- ✅ **DTO Validation**: Giriş verilerinin doğrulanması
- ✅ **Error Handling**: Kapsamlı hata yönetimi
- ✅ **CORS Support**: Frontend ile güvenli iletişim
- ✅ **Hot Reload**: Geliştirme sırasında otomatik yeniden başlatma
- ✅ **In-Memory Data**: Hardcoded test verileri

## 🛠️ Kurulum ve Ayarlama

### Gereksinimler
- **Node.js** (v18.0.0 veya üstü) - [nodejs.org](https://nodejs.org/)
- **npm** (Node.js ile birlikte gelir) veya **yarn** paket yöneticisi
- **Git** (opsiyonel) - Proje klonlamak için

### Node.js Versiyonunu Kontrol Edin
```bash
node --version    # v18.0.0 veya üstü olmalı
npm --version     # 8.0.0 veya üstü olmalı
```

### Detaylı Kurulum Adımları

#### 1. Proje Dizinine Geçin
```bash
cd C:\Users\turks\Desktop\CRUDUPDATEPROJECT\backend
```

#### 2. Bağımlılıkları Yükleyin
```bash
# npm kullanıyorsanız
npm install

# veya yarn kullanıyorsanız
yarn install
```

**Bu komut şunları yükleyecek:**
- NestJS core ve common paketleri
- TypeScript derleyici ve tipleri
- Class validator ve transformer
- Rxjs reactive programming
- ESLint ve Prettier

#### 3. Geliştirme Sunucusunu Başlatın
```bash
# npm ile (önerilen)
npm run start:dev

# veya yarn ile
yarn start:dev
```

**Çıktı şöyle olacak:**
```
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [RoutesResolver] UsersController {/users}:
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [RouterExplorer] Mapped {/users, GET} route
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [RouterExplorer] Mapped {/users/:id, GET} route
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [RouterExplorer] Mapped {/users, POST} route
[Nest] 12345  - 06/09/2025, 10:30:45 AM     LOG [NestApplication] Nest application successfully started
```

#### 4. API'yi Test Edin
- Backend **http://localhost:3000** adresinde çalışacak
- Tarayıcıda **http://localhost:3000/users** adresini açın
- JSON formatında kullanıcı listesini görmelisiniz

### Diğer Komutlar

#### Production Build
```bash
npm run build
# veya
yarn build
```

#### Production Modunda Çalıştır
```bash
npm run start:prod
# veya
yarn start:prod
```

#### Testleri Çalıştır
```bash
# Unit testler
npm run test

# E2E testler  
npm run test:e2e

# Test coverage
npm run test:cov
```

#### Kod Kalitesi
```bash
# ESLint kontrolü
npm run lint

# Prettier ile format
npm run format
```

## 🌐 API Endpoint'leri

### 👥 Users (Kullanıcılar)

| Method | Endpoint | Açıklama | Body |
|--------|----------|----------|------|
| GET | `/users` | Tüm kullanıcıları listele | - |
| GET | `/users/:id` | ID'ye göre kullanıcı getir | - |
| POST | `/users` | Yeni kullanıcı oluştur | `CreateUserDto` |
| PUT | `/users/:id` | Kullanıcıyı güncelle | `UpdateUserDto` |
| DELETE | `/users/:id` | Kullanıcıyı sil | - |
| GET | `/users/:id/posts` | Kullanıcının gönderilerini getir | - |

### 📝 Posts (Gönderiler)

| Method | Endpoint | Açıklama | Body |
|--------|----------|----------|------|
| GET | `/posts` | Tüm gönderileri listele | - |
| GET | `/posts/:id` | ID'ye göre gönderi getir | - |
| POST | `/posts` | Yeni gönderi oluştur | `CreatePostDto` |
| PUT | `/posts/:id` | Gönderiyi güncelle | `UpdatePostDto` |
| DELETE | `/posts/:id` | Gönderiyi sil | - |

### 📊 DTO Şemaları

#### CreateUserDto
```typescript
{
  "name": "string (zorunlu)",
  "username": "string (zorunlu)", 
  "email": "string (zorunlu, email formatı)"
}
```

#### CreatePostDto
```typescript
{
  "title": "string (zorunlu)",
  "body": "string (opsiyonel)",
  "userId": "number (zorunlu)"
}
```

## 📁 Proje Yapısı

```
src/
├── app.module.ts           # Ana uygulama modülü
├── main.ts                 # Uygulama giriş noktası
├── users/                  # Kullanıcı modülü
│   ├── users.controller.ts # HTTP endpoint'leri
│   ├── users.service.ts    # İş mantığı
│   ├── users.module.ts     # Modül tanımı
│   └── dto/                # Data Transfer Objects
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── posts/                  # Gönderi modülü
    ├── posts.controller.ts # HTTP endpoint'leri
    ├── posts.service.ts    # İş mantığı
    ├── posts.module.ts     # Modül tanımı
    └── dto/                # Data Transfer Objects
        ├── create-post.dto.ts
        └── update-post.dto.ts
```

## 🔧 Yapılandırma

### CORS Ayarları
```typescript
// main.ts
app.enableCors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
});
```

### Port Yapılandırması
```typescript
// main.ts
await app.listen(3000); // Backend port
```

## 🧪 API Test Örnekleri

### Postman / Insomnia ile Test

#### Kullanıcı Oluşturma
```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com"
}
```

#### Gönderi Oluşturma
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "title": "Yeni Gönderi",
  "body": "Bu bir test gönderisidir.",
  "userId": 1
}
```

### cURL ile Test
```bash
# Kullanıcıları listele
curl http://localhost:3000/users

# Yeni kullanıcı oluştur
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","username":"janedoe","email":"jane@example.com"}'
```

## ⚠️ Yaygın Sorunlar ve Çözümleri

#### ❌ Port 3000 Kullanımda
```bash
# main.ts dosyasında portu değiştirin
await app.listen(3001);
```

#### ❌ CORS Hatası
- `main.ts` dosyasında CORS ayarlarını kontrol edin
- Frontend URL'inin doğru olduğundan emin olun

#### ❌ TypeScript Hataları
```bash
# TypeScript'i yeniden derleyin
npm run build
```

#### ❌ Bağımlılık Sorunları
```bash
# node_modules ve package-lock.json'u silin
rm -rf node_modules package-lock.json
npm install
```

## 🚦 Başlangıç

1. **Node.js yükleyin**: v18+ gerekli
2. **Bağımlılıkları yükleyin**: `npm install`
3. **Sunucuyu başlatın**: `npm run start:dev`
4. **API'yi test edin**: http://localhost:3000/users
5. **Frontend'i bağlayın**: 5173 portunda çalışan React uygulaması

## 🔗 İlgili

- **Frontend**: `../frontend/` dizinindeki React TypeScript uygulaması
- **NestJS Docs**: [https://docs.nestjs.com](https://docs.nestjs.com)
- **TypeScript**: [https://www.typescriptlang.org](https://www.typescriptlang.org)
