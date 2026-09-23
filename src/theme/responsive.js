import { Dimensions, PixelRatio } from 'react-native';

// Tasarım küçük/orta boy bir telefon baz alınarak yapıldı (iPhone SE / standart Android ~375pt)
const TASARIM_GENISLIK = 375;

// Büyük ekranlarda (tablet vb.) içeriğin uçlara kadar gerilmemesi için
// ortalanmış bir maksimum genişlik kullanıyoruz.
export const MAKS_ICERIK_GENISLIGI = 520;

export function ekranBoyutlariniAl() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}

/**
 * Genişliğe göre ölçekleyip makul bir minimum/maksimum aralığında sınırlar.
 * Küçük telefonlarda çok küçülmesin, tabletlerde de aşırı büyümesin diye.
 */
export function olcekle(deger, { min, max } = {}) {
  const { width } = ekranBoyutlariniAl();
  const oran = width / TASARIM_GENISLIK;
  let sonuc = deger * oran;

  if (typeof min === 'number') sonuc = Math.max(sonuc, min);
  if (typeof max === 'number') sonuc = Math.min(sonuc, max);

  return PixelRatio.roundToNearestPixel(sonuc);
}

/** Yazı tipi boyutunu ölçekler (kullanıcının sistem yazı tipi ayarına da saygılı kalınır). */
export function yaziOlcek(deger) {
  return olcekle(deger, { min: deger * 0.85, max: deger * 1.3 });
}

export function genisEkranMi() {
  const { width } = ekranBoyutlariniAl();
  return width >= 700; // tablet / katlanabilir vb.
}
