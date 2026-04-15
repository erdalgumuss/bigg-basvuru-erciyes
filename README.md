# BİGG 2026-1 Başvuru Formu

TÜBİTAK 1812 BİGG 2026-1 Çağrısı başvuru formunu web tarayıcısında doldurup orijinal format ile **PDF olarak indirmenizi** sağlayan modern, sade bir panel.

## Özellikler
- Tek sayfa, modern, mobil uyumlu form paneli
- Orijinal PDF ile aynı düzende (logolar, çerçeveler, başlıklar) **4 sayfalık PDF çıktı**
- Tüm girdiler tarayıcıda `localStorage`'a otomatik kaydedilir
- Türkçe karakter desteği (Roboto font üzerinden)
- Vercel vb. platformlarda tek tıkla deploy

## Kurulum
```bash
npm install
npm run dev
```
Ardından http://localhost:3000 adresini açın.

## Üretim build
```bash
npm run build
npm start
```

## Deploy (Vercel)
```bash
npx vercel --prod
```
Environment variable gerekmez; tamamen client-side çalışır.

## Logolar
`public/logos/` dizininde `bigg-erciyes.png` ve `bigg-wind.png` dosyaları orijinal PDF'ten çıkarılmıştır.

## Teknoloji
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- `@react-pdf/renderer` — tarayıcıda PDF üretimi
- `react-hook-form` tipi yapıya hazır (şu an `useState` ile yönetiliyor)
