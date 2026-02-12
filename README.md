# Rize Özel Okullar Birliği - Web Sitesi & CMS

Next.js 14 ile geliştirilmiş dinamik web sitesi ve CMS paneli.

## Kurulum

```bash
npm install
cp .env.example .env
# .env dosyasında NEXTAUTH_SECRET ve NEXTAUTH_URL değerlerini ayarlayın
npx prisma db push
npm run db:seed
npm run dev
```

- **Site:** http://localhost:3000
- **CMS paneli:** http://localhost:3000/admin
- **Varsayılan giriş:** admin@rizeoob.org.tr / admin123

## Özellikler

- **Dinamik içerik:** Okullar, haberler, yönetim kurulu üyeleri veritabanından gelir.
- **CMS paneli:** Okul ekleme/düzenleme, haber yönetimi, yönetim kurulu, iletişim mesajları, bursluluk başvuruları.
- **Sayfalar:** Anasayfa, Hakkımızda, Üye Okullar, Okul Detay, Haberler, Haber Detay, İletişim, Bursluluk Sınavı Başvurusu, Başvuru Tamamlandı.

## Stitch referansı

Tasarım ve bileşenler `stitch/` klasöründeki HTML ve görseller referans alınarak uyumlu şekilde uygulanmıştır.
