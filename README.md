# Berber Randevu - Mobil Uygulama (React Native / Expo)

## Kurulum

```bash
npm install
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
