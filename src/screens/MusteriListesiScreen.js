import React, { useCallback, useState } from 'react';
<<<<<<< HEAD
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
=======
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

export default function MusteriListesiScreen({ navigation }) {
    const { berber } = useAuth();
    const [musteriler, setMusteriler] = useState([]);
<<<<<<< HEAD
    const { width } = useWindowDimensions();
    const genislik = Math.min(width, 600);

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => Alert.alert('Hata', e.message));
=======
    const [hata, setHata] = useState('');

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => setHata(e.message));
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
        }, [berber.id])
    );

    return (
<<<<<<< HEAD
        <View style={styles.disContainer}>
            <View style={{ flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' }}>
                <FlatList
                    data={musteriler}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                    ListEmptyComponent={<Text style={styles.bos}>Henüz müşteri eklenmemiş</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.satir}>
                            <Text style={styles.ad}>{item.ad}</Text>
                            <Text style={styles.telefon}>{item.telefon}</Text>
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.eklemeButon} onPress={() => navigation.navigate('YeniMusteri')}>
                    <Text style={styles.eklemeYazi}>+ Yeni Müşteri</Text>
                </TouchableOpacity>
            </View>
        </View>
=======
        <Ekran kaydirilabilir={false}>
            {!!hata && <Text style={styles.hataBanner}>{hata}</Text>}
            <FlatList
                data={musteriler}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.liste}
                ListEmptyComponent={<Text style={styles.bos}>Henüz müşteri eklenmemiş</Text>}
                renderItem={({ item }) => (
                    <View style={styles.satir}>
                        <Text style={styles.ad}>{item.ad}</Text>
                        <Text style={styles.telefon}>{item.telefon}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.eklemeButon} onPress={() => navigation.navigate('YeniMusteri')}>
                <Text style={styles.eklemeYazi}>+ Yeni Müşteri</Text>
            </TouchableOpacity>
        </Ekran>
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    disContainer: { flex: 1, backgroundColor: '#fff' },
    satir: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    ad: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
    telefon: { color: '#6b7280', marginTop: 2 },
    bos: { textAlign: 'center', color: '#9ca3af', marginTop: 40 },
    eklemeButon: { backgroundColor: '#1f2937', margin: 16, borderRadius: 10, padding: 16 },
    eklemeYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
=======
    liste: { padding: bosluk.md, flexGrow: 1 },
    satir: { paddingVertical: bosluk.sm + 6, borderBottomWidth: 1, borderBottomColor: renkler.cizgi },
    ad: { fontSize: yazi.govde, fontWeight: '600', color: renkler.yaziAna },
    telefon: { color: renkler.yaziSoluk, marginTop: 2, fontSize: yazi.normal },
    bos: { textAlign: 'center', color: renkler.yaziSolukAcik, marginTop: bosluk.xl, fontSize: yazi.normal },
    hataBanner: { backgroundColor: renkler.tehlikeAcikZemin, color: renkler.tehlikeYazi, padding: bosluk.sm, fontSize: yazi.normal, textAlign: 'center' },
    eklemeButon: { backgroundColor: renkler.ana, margin: bosluk.md, borderRadius: yuvarlaklik.md, padding: bosluk.md },
    eklemeYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
