import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, ScrollView, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const DURUM_ETIKET = {
    aktif: { yazi: 'Aktif Abonelik', renk: '#16a34a' },
    durduruldu: { yazi: 'Durduruldu', renk: '#dc2626' },
};

export default function AnaSayfaScreen({ navigation }) {
    const { berber, cikisYap } = useAuth();
    const [durum, setDurum] = useState(null);
    const [yenileniyor, setYenileniyor] = useState(false);
    const { width } = useWindowDimensions();

    const durumYukle = useCallback(async () => {
        try {
            const d = await api.durumGetir(berber.id);
            setDurum(d);
        } catch (err) {
            Alert.alert('Hata', err.message);
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
        <ScrollView
            style={styles.disContainer}
            refreshControl={<RefreshControl refreshing={yenileniyor} onRefresh={yenile} />}
        >
            <View style={[styles.icContainer, { maxWidth: Math.min(width - 32, 480) }]}>
                <Text style={styles.merhaba}>Merhaba, {berber.ad}</Text>

                {durum && etiket && (
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
                            Hesabınız henüz aktif değil. Ödemeniz onaylandıktan sonra kullanıma açılacaktır.
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

                <TouchableOpacity style={styles.menuButon} onPress={() => navigation.navigate('SmsAyarlari')}>
                    <Text style={styles.menuButonYazi}>⚙️ SMS Ayarları</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cikisButon} onPress={cikisYap}>
                    <Text style={styles.cikisYazi}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    disContainer: { flex: 1, backgroundColor: '#fff' },
    icContainer: { alignSelf: 'center', width: '100%', padding: 20 },
    merhaba: { fontSize: 22, fontWeight: 'bold', color: '#1f2937', marginBottom: 16, marginTop: 8 },
    kart: { backgroundColor: '#f3f4f6', borderRadius: 12, padding: 16, marginBottom: 16 },
    durumSatiri: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    nokta: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    durumYazi: { fontWeight: '700', fontSize: 16 },
    detay: { color: '#4b5563', marginTop: 2 },
    uyariKart: { backgroundColor: '#fee2e2', borderRadius: 12, padding: 14, marginBottom: 16 },
    uyariYazi: { color: '#991b1b' },
    menuButon: { backgroundColor: '#1f2937', borderRadius: 10, padding: 16, marginBottom: 12 },
    pasif: { backgroundColor: '#9ca3af' },
    menuButonYazi: { color: '#fff', fontSize: 16, fontWeight: '600' },
    cikisButon: { marginTop: 20, padding: 12 },
    cikisYazi: { color: '#dc2626', textAlign: 'center' },
});
