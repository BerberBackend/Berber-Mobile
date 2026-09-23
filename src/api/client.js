// Backend'in Railway canlı adresi
export const API_BASE_URL =
  "https://berber-mobile-production.up.railway.app/api";

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

  smsAyarlariKaydet: (
    berberId,
    netgsm_kullanici_kodu,
    netgsm_sifre,
    netgsm_baslik,
  ) =>
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
};
