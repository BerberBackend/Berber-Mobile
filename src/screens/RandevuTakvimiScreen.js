import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

function tarihStr(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

export default function RandevuTakvimiScreen({ navigation }) {
    const { berber } = useAuth();
    const [secilenGun, setSecilenGun] = useState(new Date());
    const [randevular, setRandevular] = useState([]);

    const yukle = useCallback(async () => {
        try {
            const liste = await api.randevuListele(berber.id, tarihStr(secilenGun));
            setRandevular(liste);
        } catch (err) {
            Alert.alert('Hata', err.message);
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
    );
}

const styles = StyleSheet.create({
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
});
