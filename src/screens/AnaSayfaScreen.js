import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

const DURUM_ETIKET = {
    deneme: { yazi: 'Deneme Sürümü', renk: renkler.uyari },
    aktif: { yazi: 'Aktif Abonelik', renk: renkler.basari },
    durduruldu: { yazi: 'Durduruldu', renk: renkler.tehlike },
};

export default function AnaSayfaScreen({ navigation }) {
    const { berber, cikisYap } = useAuth();
    const [durum, setDurum] = useState(null);
    const [yenileniyor, setYenileniyor] = useState(false);

    const durumYukle = useCallback(async () => {
        try {
            const d = await api.durumGetir(berber.id);
            setDurum(d);
        } catch (err) {
            // Sessizce geç - kart görünmez, sayfa hâlâ kullanılabilir
        }
    }, [berber.id]);

    useFocusEffect(
        useCallback(() => {
            durumYukle();
        }, [durumYukle])
    );

    const yenile = async () => {
        setYenileniyor(true);
        await durumYukle();
        setYenileniyor(false);
    };

    const etiket = durum ? DURUM_ETIKET[durum.abonelik_durum] : null;
    const kotaKalan = durum ? durum.sms_kotasi_toplam - durum.sms_kotasi_kullanilan : null;
    const durduruldu = durum?.abonelik_durum === 'durduruldu';

    return (
        <Ekran
            contentStyle={styles.icerik}
            refreshControl={<RefreshControl refreshing={yenileniyor} onRefresh={yenile} colors={[renkler.ana]} tintColor={renkler.ana} />}
        >
            <Text style={styles.merhaba}>Merhaba, {berber.ad}</Text>

            {durum && (
                <View style={styles.kart}>
                    <View style={styles.durumSatiri}>
                        <View style={[styles.nokta, { backgroundColor: etiket.renk }]} />
                        <Text style={[styles.durumYazi, { color: etiket.renk }]}>{etiket.yazi}</Text>
                    </View>
                    <Text style={styles.detay}>
                        Dönem bitişi: {new Date(durum.donem_bitis).toLocaleDateString('tr-TR')}
                    </Text>
                    <Text style={styles.detay}>
                        SMS kotası: {kotaKalan} / {durum.sms_kotasi_toplam} kaldı
                    </Text>
                </View>
            )}

            {durduruldu && (
                <View style={styles.uyariKart}>
                    <Text style={styles.uyariYazi}>
                        Aboneliğiniz durduruldu. Devam etmek için ödeme yapmanız gerekiyor.
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.menuButon, durduruldu && styles.pasif]}
                disabled={durduruldu}
                onPress={() => navigation.navigate('MusteriListesi')}
            >
                <Text style={styles.menuButonYazi}>👤 Müşteriler</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.menuButon, durduruldu && styles.pasif]}
                disabled={durduruldu}
                onPress={() => navigation.navigate('RandevuTakvimi')}
            >
                <Text style={styles.menuButonYazi}>📅 Randevular</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuButonIkincil}
                onPress={() => navigation.navigate('SmsAyarlari')}
            >
                <Text style={styles.menuButonIkincilYazi}>💬 SMS Ayarları</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cikisButon} onPress={cikisYap}>
                <Text style={styles.cikisYazi}>Çıkış Yap</Text>
            </TouchableOpacity>
        </Ekran>
    );
}

const styles = StyleSheet.create({
    icerik: { padding: bosluk.lg },
    merhaba: { fontSize: yazi.baslik, fontWeight: 'bold', color: renkler.yaziAna, marginBottom: bosluk.md, marginTop: bosluk.xs },
    kart: { backgroundColor: renkler.kartZemin, borderRadius: yuvarlaklik.lg, padding: bosluk.md, marginBottom: bosluk.md },
    durumSatiri: { flexDirection: 'row', alignItems: 'center', marginBottom: bosluk.xs },
    nokta: { width: 10, height: 10, borderRadius: 5, marginRight: bosluk.xs },
    durumYazi: { fontWeight: '700', fontSize: yazi.govde },
    detay: { color: renkler.yaziIkincil, marginTop: 2, fontSize: yazi.normal },
    uyariKart: { backgroundColor: renkler.tehlikeAcikZemin, borderRadius: yuvarlaklik.lg, padding: bosluk.sm + 6, marginBottom: bosluk.md },
    uyariYazi: { color: renkler.tehlikeYazi, fontSize: yazi.normal },
    menuButon: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.md, padding: bosluk.md, marginBottom: bosluk.sm },
    menuButonYazi: { color: renkler.beyaz, fontSize: yazi.govde, fontWeight: '600', textAlign: 'center' },
    menuButonIkincil: {
        backgroundColor: renkler.arkaplan, borderWidth: 1.5, borderColor: renkler.ana,
        borderRadius: yuvarlaklik.md, padding: bosluk.md, marginBottom: bosluk.sm,
    },
    menuButonIkincilYazi: { color: renkler.ana, fontSize: yazi.govde, fontWeight: '600', textAlign: 'center' },
    pasif: { backgroundColor: renkler.yaziSolukAcik },
    cikisButon: { marginTop: bosluk.md, padding: bosluk.sm + 4 },
    cikisYazi: { color: renkler.tehlike, textAlign: 'center', fontSize: yazi.normal },
});
