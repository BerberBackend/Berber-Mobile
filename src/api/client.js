// Backend'in adresini buraya yaz (Railway'e deploy edince oradaki URL'i koyacaksın)
<<<<<<< HEAD
export const API_BASE_URL = 'http://10.0.2.2:3000/api'; // Android emulator için localhost karşılığı
// Fiziksel telefonda test edeceksen bilgisayarının yerel ağ IP'sini kullan, ör: 'http://192.168.1.5:3000/api'

async function istekAt(path, { method = 'GET', body, berberId } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (berberId) headers['X-Berber-Id'] = String(berberId);

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const hata = new Error(data.mesaj || data.hata || 'Bir hata oluştu');
        hata.kod = data.hata;
        hata.status = response.status;
        throw hata;
    }

    return data;
}

export const api = {
    kayitOl: (ad, telefon, sube_adi, sifre) =>
        istekAt('/berber/kayit', { method: 'POST', body: { ad, telefon, sube_adi, sifre } }),

    girisYap: (telefon, sifre) =>
        istekAt('/berber/giris', { method: 'POST', body: { telefon, sifre } }),

    durumGetir: (berberId) => istekAt('/berber/durum', { berberId }),

    smsAyarlariGetir: (berberId) => istekAt('/berber/sms-ayarlari', { berberId }),

    smsAyarlariGuncelle: (berberId, netgsm_usercode, netgsm_password, netgsm_msgheader) =>
        istekAt('/berber/sms-ayarlari', {
            method: 'PUT',
            body: { netgsm_usercode, netgsm_password, netgsm_msgheader },
            berberId,
        }),

    musteriListele: (berberId) => istekAt('/musteri', { berberId }),

    musteriEkle: (berberId, ad, telefon) =>
        istekAt('/musteri', { method: 'POST', body: { ad, telefon }, berberId }),

    doluSaatleriGetir: (berberId, tarih) =>
        istekAt(`/randevu/dolu-saatler?tarih=${tarih}`, { berberId }),

    randevuOlustur: (berberId, musteri_id, tarih_saat) =>
        istekAt('/randevu', { method: 'POST', body: { musteri_id, tarih_saat }, berberId }),

    randevuIptalEt: (berberId, randevuId) =>
        istekAt(`/randevu/${randevuId}/iptal`, { method: 'PATCH', berberId }),

    randevuListele: (berberId, tarih) =>
        istekAt(`/randevu?tarih=${tarih}`, { berberId }),
=======
export const API_BASE_URL =
  "https://berber-mobile-production.up.railway.app/api"; // Android emulator için localhost karşılığı
// Fiziksel telefonda test edeceksen bilgisayarının yerel ağ IP'sini kullan, ör: 'http://192.168.1.5:3000/api'

async function istekAt(path, { method = "GET", body, berberId } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (berberId) headers["X-Berber-Id"] = String(berberId);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const hata = new Error(data.mesaj || data.hata || "Bir hata oluştu");
    hata.kod = data.hata;
    hata.status = response.status;
    throw hata;
  }

  return data;
}

export const api = {
  kayitOl: (ad, telefon, sube_adi, sifre, lisans_anahtari) =>
    istekAt("/berber/kayit", {
      method: "POST",
      body: { ad, telefon, sube_adi, sifre, lisans_anahtari },
    }),

  girisYap: (telefon, sifre) =>
    istekAt("/berber/giris", { method: "POST", body: { telefon, sifre } }),

  durumGetir: (berberId) => istekAt("/berber/durum", { berberId }),

  smsAyarlariGetir: (berberId) => istekAt("/berber/sms-ayarlari", { berberId }),

  smsAyarlariKaydet: (berberId, netgsm_kullanici_kodu, netgsm_sifre, netgsm_baslik) =>
    istekAt("/berber/sms-ayarlari", {
      method: "PUT",
      body: { netgsm_kullanici_kodu, netgsm_sifre, netgsm_baslik },
      berberId,
    }),

  musteriListele: (berberId) => istekAt("/musteri", { berberId }),

  musteriEkle: (berberId, ad, telefon) =>
    istekAt("/musteri", { method: "POST", body: { ad, telefon }, berberId }),

  doluSaatleriGetir: (berberId, tarih) =>
    istekAt(`/randevu/dolu-saatler?tarih=${tarih}`, { berberId }),

  randevuOlustur: (berberId, musteri_id, tarih_saat) =>
    istekAt("/randevu", {
      method: "POST",
      body: { musteri_id, tarih_saat },
      berberId,
    }),

  randevuIptalEt: (berberId, randevuId) =>
    istekAt(`/randevu/${randevuId}/iptal`, { method: "PATCH", berberId }),

  randevuListele: (berberId, tarih) =>
    istekAt(`/randevu?tarih=${tarih}`, { berberId }),
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
};
