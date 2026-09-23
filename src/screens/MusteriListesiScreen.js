import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function MusteriListesiScreen({ navigation }) {
    const { berber } = useAuth();
    const [musteriler, setMusteriler] = useState([]);
    const { width } = useWindowDimensions();
    const genislik = Math.min(width, 600);

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => Alert.alert('Hata', e.message));
        }, [berber.id])
    );

    return (
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
    );
}

const styles = StyleSheet.create({
    disContainer: { flex: 1, backgroundColor: '#fff' },
    satir: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    ad: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
    telefon: { color: '#6b7280', marginTop: 2 },
    bos: { textAlign: 'center', color: '#9ca3af', marginTop: 40 },
    eklemeButon: { backgroundColor: '#1f2937', margin: 16, borderRadius: 10, padding: 16 },
    eklemeYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
