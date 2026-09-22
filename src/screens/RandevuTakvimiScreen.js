import React, { useCallback, useState } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

function tarihStr(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

export default function RandevuTakvimiScreen({ navigation }) {
    const { berber } = useAuth();
    const [secilenGun, setSecilenGun] = useState(new Date());
    const [randevular, setRandevular] = useState([]);
    const [hata, setHata] = useState('');

    const yukle = useCallback(async () => {
        try {
            const liste = await api.randevuListele(berber.id, tarihStr(secilenGun));
            setRandevular(liste);
            setHata('');
        } catch (err) {
            setHata(err.message);
        }
    }, [berber.id, secilenGun]);

    useFocusEffect(
        useCallback(() => {
            yukle();
        }, [yukle])
    );

    const gunDegistir = (fark) => {
        const yeni = new Date(secilenGun);
        yeni.setDate(yeni.getDate() + fark);
        setSecilenGun(yeni);
    };

    const iptalEt = (randevu) => {
        Alert.alert('Randevuyu iptal et', `${randevu.musteri_ad} - onaylıyor musun?`, [
            { text: 'Vazgeç', style: 'cancel' },
            {
                text: 'İptal Et',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.randevuIptalEt(berber.id, randevu.id);
                        yukle();
                    } catch (err) {
                        Alert.alert('Hata', err.message);
                    }
                },
            },
        ]);
    };

    return (
        <Ekran kaydirilabilir={false}>
            <View style={styles.gunSecici}>
                <TouchableOpacity onPress={() => gunDegistir(-1)} style={styles.okButon} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.okYazi}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.gunYazi} numberOfLines={1} adjustsFontSizeToFit>
                    {secilenGun.toLocaleDateString('tr-TR', { weekday: 'long', day: '2-digit', month: 'long' })}
                </Text>
                <TouchableOpacity onPress={() => gunDegistir(1)} style={styles.okButon} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.okYazi}>›</Text>
                </TouchableOpacity>
            </View>

            {!!hata && <Text style={styles.hataBanner}>{hata}</Text>}

            <FlatList
                data={randevular.filter((r) => r.durum !== 'iptal')}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.liste}
                ListEmptyComponent={<Text style={styles.bos}>Bu gün için randevu yok</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.satir} onLongPress={() => iptalEt(item)}>
                        <Text style={styles.saat}>
                            {new Date(item.tarih_saat).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                        <Text style={styles.ad} numberOfLines={1}>{item.musteri_ad}</Text>
                        <Text style={styles.telefon} numberOfLines={1}>{item.musteri_telefon}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.ipucu}>İpucu: Randevuyu iptal etmek için üzerine uzun basın</Text>

            <TouchableOpacity
                style={styles.eklemeButon}
                onPress={() => navigation.navigate('YeniRandevu', { tarih: tarihStr(secilenGun) })}
            >
                <Text style={styles.eklemeYazi}>+ Yeni Randevu</Text>
            </TouchableOpacity>
        </Ekran>
    );
}

const styles = StyleSheet.create({
    gunSecici: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: bosluk.md, borderBottomWidth: 1, borderBottomColor: renkler.cizgi,
    },
    okButon: { padding: bosluk.xs },
    okYazi: { fontSize: yazi.buyukBaslik, color: renkler.yaziAna },
    gunYazi: { fontSize: yazi.govde, fontWeight: '600', color: renkler.yaziAna, textTransform: 'capitalize', flex: 1, textAlign: 'center' },
    liste: { padding: bosluk.md, flexGrow: 1 },
    hataBanner: { backgroundColor: renkler.tehlikeAcikZemin, color: renkler.tehlikeYazi, padding: bosluk.sm, fontSize: yazi.normal, textAlign: 'center' },
    satir: { flexDirection: 'row', alignItems: 'center', paddingVertical: bosluk.sm + 4, borderBottomWidth: 1, borderBottomColor: renkler.cizgiAcik },
    saat: { fontWeight: '700', color: renkler.yaziAna, width: 56, fontSize: yazi.normal },
    ad: { fontSize: yazi.govde, color: renkler.yaziAna, flex: 1 },
    telefon: { color: renkler.yaziSolukAcik, fontSize: yazi.kucuk, maxWidth: '35%' },
    bos: { textAlign: 'center', color: renkler.yaziSolukAcik, marginTop: bosluk.xl, fontSize: yazi.normal },
    ipucu: { textAlign: 'center', color: renkler.yaziSolukAcik, fontSize: yazi.kucuk, marginBottom: bosluk.xs },
    eklemeButon: { backgroundColor: renkler.ana, margin: bosluk.md, borderRadius: yuvarlaklik.md, padding: bosluk.md },
    eklemeYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
});
