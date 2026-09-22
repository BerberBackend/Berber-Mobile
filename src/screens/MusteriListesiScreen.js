import React, { useCallback, useState } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

export default function MusteriListesiScreen({ navigation }) {
    const { berber } = useAuth();
    const [musteriler, setMusteriler] = useState([]);
    const [hata, setHata] = useState('');

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => setHata(e.message));
        }, [berber.id])
    );

    return (
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
    );
}

const styles = StyleSheet.create({
    liste: { padding: bosluk.md, flexGrow: 1 },
    satir: { paddingVertical: bosluk.sm + 6, borderBottomWidth: 1, borderBottomColor: renkler.cizgi },
    ad: { fontSize: yazi.govde, fontWeight: '600', color: renkler.yaziAna },
    telefon: { color: renkler.yaziSoluk, marginTop: 2, fontSize: yazi.normal },
    bos: { textAlign: 'center', color: renkler.yaziSolukAcik, marginTop: bosluk.xl, fontSize: yazi.normal },
    hataBanner: { backgroundColor: renkler.tehlikeAcikZemin, color: renkler.tehlikeYazi, padding: bosluk.sm, fontSize: yazi.normal, textAlign: 'center' },
    eklemeButon: { backgroundColor: renkler.ana, margin: bosluk.md, borderRadius: yuvarlaklik.md, padding: bosluk.md },
    eklemeYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
});
