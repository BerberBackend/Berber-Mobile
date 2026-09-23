<<<<<<< HEAD
# Berber Randevu - Mobil Uygulama (React Native / Expo)
=======
# Berber Randevu Uygulaması - Backend
>>>>>>> 5916eb435ede3b3e50fb58f762bb612b918738f5

## Kurulum

```bash
npm install
<<<<<<< HEAD
```

`src/api/client.js` içindeki `API_BASE_URL`'i backend'inin adresine göre ayarla:
- Android emülatörde test: `http://10.0.2.2:3000/api` (zaten varsayılan)
- Fiziksel telefonda test: bilgisayarının yerel ağ IP'si, ör. `http://192.168.1.5:3000/api`
- Railway'e deploy ettikten sonra: Railway'in verdiği public URL, ör. `https://berber-backend.up.railway.app/api`

## Çalıştırma

```bash
npx expo start
```
Açılan QR kodu **Expo Go** uygulamasıyla telefonundan okutarak canlı önizleme yapabilirsin
(fiziksel telefonda test ediyorsan backend'in de aynı Wi-Fi ağında/erişilebilir olması gerekir).

## Ekranlar

| Ekran | Açıklama |
|---|---|
| GirisScreen / KayitScreen | Berber girişi ve kaydı (kayıtta 14 günlük deneme başlar) |
| AnaSayfaScreen | Abonelik durumu (deneme/aktif/durduruldu) ve SMS kota göstergesi |
| MusteriListesiScreen / YeniMusteriScreen | Müşteri listesi ve ekleme (ekleme → hoşgeldin SMS'i) |
| RandevuTakvimiScreen | Gün bazlı randevu listesi, ok butonlarıyla gün değiştirme, uzun basarak iptal |
| YeniRandevuScreen | Müşteri + saat seçimi. **Dolu saatler kırmızı ve seçilemez** durumda gösterilir |

## Önemli Davranışlar

- **Çakışma engelleme:** Saat seçim ekranı backend'den o günün dolu saatlerini çeker ve
  kırmızı/disabled gösterir. Yine de iki kişi aynı anda aynı saati seçerse backend
  `409` hatası döner, uygulama bunu yakalayıp kullanıcıyı uyarır ve listeyi tazeler.
- **Abonelik durduruldu ise:** Ana sayfadaki "Müşteriler" ve "Randevular" butonları
  gri/pasif hale gelir; backend zaten `403` döndürüyor, mobil taraf bunu görsel olarak
  da yansıtıyor.
- **Oturum saklama:** Giriş bilgisi `AsyncStorage`'da tutulur, uygulama kapanıp
  açıldığında tekrar giriş istenmez.

## Sıradaki Adımlar

- Backend README'sinde belirtilen JWT auth sistemine geçince, `AuthContext` ve
  `api/client.js`'deki `X-Berber-Id` header'ı yerine `Authorization: Bearer <token>`
  kullanılacak şekilde güncellenmeli.
- İkon/splash screen, gerçek uygulama görseliyle değiştirilmeli.
- EAS Build ile gerçek `.apk`/`.ipa` üretimi için `eas.json` yapılandırması eklenmeli.
=======
cp .env.example .env
# .env dosyasını kendi DATABASE_URL ve SMS bilgilerinle doldur
npm run migrate   # veritabanı tablolarını oluşturur
npm run dev       # geliştirme modunda başlatır (nodemon)
```

## Klasör Yapısı

```
src/
  db.js                    -> PostgreSQL bağlantı havuzu
  schema.sql               -> veritabanı tabloları
  migrate.js               -> schema.sql'i veritabanına uygular
  server.js                -> Express uygulaması giriş noktası
  routes/
    berber.js               -> kayıt, giriş, abonelik/kota durumu
    musteri.js               -> müşteri kaydı (+ hoşgeldin SMS)
    randevu.js               -> dolu saatler, randevu oluşturma (+ onay SMS), iptal, listeleme
  services/
    smsService.js            -> tüm SMS gönderimlerinin geçtiği tek nokta (kota kontrollü)
    subscriptionService.js   -> dönem/abonelik yenileme-durdurma mantığı
  middleware/
    auth.js                  -> ŞİMDİLİK basit header tabanlı kimlik doğrulama (bkz. not aşağıda)
    subscriptionCheck.js     -> her istekte abonelik aktif mi kontrolü
  jobs/
    reminderJob.js            -> her 5 dakikada bir: randevudan 2 saat önce hatırlatma SMS
    subscriptionJob.js        -> her gün 00:00: dönemi dolan berberleri yenile/durdur
```

## Önemli Notlar / Sıradaki Adımlar

1. **auth.js şu an geçici bir çözüm.** Mobil uygulama isteklerde `X-Berber-Id` header'ı gönderiyor
   varsayımıyla çalışıyor. Üretime geçmeden önce telefon+şifre ile login yapıp JWT token
   dönen gerçek bir auth sistemine çevirmemiz gerekiyor.
2. **Ödeme entegrasyonu henüz yok.** `odeme_bu_donem_alindi` alanı şu an manuel olarak
   (örn. senin admin panelinden veya doğrudan veritabanından) TRUE yapılmalı. İleride
   iyzico/PayTR entegrasyonu bu alanı otomatik güncelleyecek.
3. **SMS sağlayıcısı NetGSM için hazırlandı.** `.env` içindeki `SMS_PROVIDER=netgsm` olmadığı
   sürece SMS'ler gerçekte gönderilmez, konsola yazdırılır (test modu).
4. Basit test için:
   ```bash
   curl -X POST http://localhost:3000/api/berber/kayit \
     -H "Content-Type: application/json" \
     -d '{"ad":"Ahmet Usta","telefon":"5551234567","sifre":"1234"}'
   ```

## API Uç Noktaları (Özet)

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | /api/berber/kayit | Yeni berber kaydı (deneme sürümü başlar) |
| POST | /api/berber/giris | Giriş |
| GET | /api/berber/durum | Abonelik/kota durumu |
| POST | /api/musteri | Müşteri kaydı (+ hoşgeldin SMS) |
| GET | /api/musteri | Müşteri listesi |
| GET | /api/randevu/dolu-saatler?tarih=YYYY-MM-DD | O gün dolu saatler |
| POST | /api/randevu | Randevu oluştur (+ onay SMS) |
| PATCH | /api/randevu/:id/iptal | Randevu iptali |
| GET | /api/randevu?tarih=YYYY-MM-DD | Randevu listesi |
>>>>>>> 5916eb435ede3b3e50fb58f762bb612b918738f5
