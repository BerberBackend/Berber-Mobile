import React, { useCallback, useState } from 'react';
<<<<<<< HEAD
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
=======
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

function tarihStr(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

export default function RandevuTakvimiScreen({ navigation }) {
    const { berber } = useAuth();
    const [secilenGun, setSecilenGun] = useState(new Date());
    const [randevular, setRandevular] = useState([]);
<<<<<<< HEAD
=======
    const [hata, setHata] = useState('');
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

    const yukle = useCallback(async () => {
        try {
            const liste = await api.randevuListele(berber.id, tarihStr(secilenGun));
            setRandevular(liste);
<<<<<<< HEAD
        } catch (err) {
            Alert.alert('Hata', err.message);
=======
            setHata('');
        } catch (err) {
            setHata(err.message);
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
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
<<<<<<< HEAD
        <View style={styles.disContainer}>
            <View style={styles.icContainer}>
                <View style={styles.gunSecici}>
                    <TouchableOpacity onPress={() => gunDegistir(-1)} style={styles.okButon}>
                        <Text style={styles.okYazi}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.gunYazi}>
                        {secilenGun.toLocaleDateString('tr-TR', { weekday: 'long', day: '2-digit', month: 'long' })}
                    </Text>
                    <TouchableOpacity onPress={() => gunDegistir(1)} style={styles.okButon}>
                        <Text style={styles.okYazi}>›</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={randevular.filter((r) => r.durum !== 'iptal')}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                    ListEmptyComponent={<Text style={styles.bos}>Bu gün için randevu yok</Text>}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.satir} onLongPress={() => iptalEt(item)}>
                            <Text style={styles.saat}>
                                {new Date(item.tarih_saat).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.ad}>{item.musteri_ad}</Text>
                                <Text style={styles.telefon}>{item.musteri_telefon}</Text>
                            </View>
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
            </View>
        </View>
=======
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
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    disContainer: { flex: 1, backgroundColor: '#fff' },
    icContainer: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
    gunSecici: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    okButon: { padding: 8 },
    okYazi: { fontSize: 26, color: '#1f2937' },
    gunYazi: { fontSize: 16, fontWeight: '600', color: '#1f2937', textTransform: 'capitalize' },
    satir: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    saat: { fontWeight: '700', color: '#1f2937', width: 60 },
    ad: { fontSize: 16, color: '#1f2937' },
    telefon: { color: '#9ca3af', fontSize: 13 },
    bos: { textAlign: 'center', color: '#9ca3af', marginTop: 40 },
    ipucu: { textAlign: 'center', color: '#9ca3af', fontSize: 12, marginBottom: 4 },
    eklemeButon: { backgroundColor: '#1f2937', margin: 16, borderRadius: 10, padding: 16 },
    eklemeYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
=======
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
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
