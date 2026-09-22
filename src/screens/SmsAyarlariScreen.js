import React, { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

export default function SmsAyarlariScreen() {
    const { berber } = useAuth();
    const [kullaniciKodu, setKullaniciKodu] = useState('');
    const [sifre, setSifre] = useState('');
    const [baslik, setBaslik] = useState('');
    const [sifreKayitli, setSifreKayitli] = useState(false);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [kaydediliyor, setKaydediliyor] = useState(false);
    const [mesaj, setMesaj] = useState('');
    const [hata, setHata] = useState('');

    useFocusEffect(
        useCallback(() => {
            let aktif = true;
            setYukleniyor(true);
            api.smsAyarlariGetir(berber.id)
                .then((veri) => {
                    if (!aktif) return;
                    setKullaniciKodu(veri.netgsm_kullanici_kodu || '');
                    setBaslik(veri.netgsm_baslik || '');
                    setSifreKayitli(!!veri.sifre_kayitli);
                })
                .catch((e) => setHata(e.message))
                .finally(() => aktif && setYukleniyor(false));
            return () => {
                aktif = false;
            };
        }, [berber.id])
    );

    const kaydet = async () => {
        setHata('');
        setMesaj('');
        if (!kullaniciKodu || !baslik || (!sifre && !sifreKayitli)) {
            setHata('Kullanıcı kodu, başlık ve şifre zorunlu');
            return;
        }
        setKaydediliyor(true);
        try {
            await api.smsAyarlariKaydet(berber.id, kullaniciKodu, sifre || undefined, baslik);
            setSifreKayitli(true);
            setSifre('');
            setMesaj('Kaydedildi. Bundan sonraki SMS\'ler bu hesaptan gönderilecek.');
        } catch (err) {
            setHata(err.message);
        } finally {
            setKaydediliyor(false);
        }
    };

    return (
        <Ekran contentStyle={styles.icerik}>
            <View style={styles.bilgiKart}>
                <Text style={styles.bilgiBaslik}>Nasıl çalışır?</Text>
                <Text style={styles.bilgiYazi}>
                    1. netgsm.com.tr üzerinden kendi hesabınızı ve SMS paketinizi satın alın.{'\n'}
                    2. NetGSM panelinden kullanıcı kodunuzu, şifrenizi ve onaylı mesaj başlığınızı (msgheader) alın.{'\n'}
                    3. Aşağıya girip kaydedin — hoşgeldin, randevu onay ve hatırlatma SMS'leri otomatik olarak bu hesaptan gönderilir.
                </Text>
            </View>

            {!yukleniyor && (
                <>
                    <Text style={styles.etiket}>NetGSM Kullanıcı Kodu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="8503XXXXXXX"
                        placeholderTextColor={renkler.yaziSolukAcik}
                        autoCapitalize="none"
                        value={kullaniciKodu}
                        onChangeText={setKullaniciKodu}
                    />

                    <Text style={styles.etiket}>NetGSM Şifre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={sifreKayitli ? 'Kayıtlı şifreyi değiştirmek için yazın' : 'Şifreniz'}
                        placeholderTextColor={renkler.yaziSolukAcik}
                        secureTextEntry
                        value={sifre}
                        onChangeText={setSifre}
                    />
                    {sifreKayitli && !sifre && (
                        <Text style={styles.yardimYazi}>Bir şifre kayıtlı. Değiştirmek istemiyorsanız boş bırakabilirsiniz.</Text>
                    )}

                    <Text style={styles.etiket}>Onaylı Mesaj Başlığı</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Örn: BERBERIM"
                        placeholderTextColor={renkler.yaziSolukAcik}
                        autoCapitalize="characters"
                        value={baslik}
                        onChangeText={setBaslik}
                    />

                    {!!hata && <Text style={styles.hataYazi}>{hata}</Text>}
                    {!!mesaj && <Text style={styles.basariYazi}>{mesaj}</Text>}

                    <TouchableOpacity style={styles.buton} onPress={kaydet} disabled={kaydediliyor}>
                        <Text style={styles.butonYazi}>{kaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}</Text>
                    </TouchableOpacity>
                </>
            )}
        </Ekran>
    );
}

const styles = StyleSheet.create({
    icerik: { padding: bosluk.lg },
    bilgiKart: { backgroundColor: renkler.kartZemin, borderRadius: yuvarlaklik.lg, padding: bosluk.md, marginBottom: bosluk.lg },
    bilgiBaslik: { fontWeight: '700', color: renkler.yaziAna, marginBottom: bosluk.xs, fontSize: yazi.normal },
    bilgiYazi: { color: renkler.yaziIkincil, fontSize: yazi.normal, lineHeight: yazi.normal * 1.5 },
    etiket: { fontWeight: '600', color: renkler.anaAcik, marginBottom: bosluk.xs, marginTop: bosluk.sm, fontSize: yazi.normal },
    input: {
        borderWidth: 1, borderColor: renkler.kenarlik, borderRadius: yuvarlaklik.sm,
        padding: bosluk.md, fontSize: yazi.govde, color: renkler.yaziAna,
    },
    yardimYazi: { color: renkler.yaziSoluk, fontSize: yazi.kucuk, marginTop: bosluk.xs },
    hataYazi: { color: renkler.tehlike, marginTop: bosluk.md, fontSize: yazi.normal },
    basariYazi: { color: renkler.basari, marginTop: bosluk.md, fontSize: yazi.normal },
    buton: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.sm, padding: bosluk.md, marginTop: bosluk.lg },
    butonYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
});
