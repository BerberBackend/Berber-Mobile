import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

// Çalışma saatleri: 09:00 - 19:00 arası 30 dakikalık dilimler
function saatDilimleriOlustur() {
    const dilimler = [];
    for (let saat = 9; saat < 19; saat++) {
        dilimler.push(`${String(saat).padStart(2, '0')}:00`);
        dilimler.push(`${String(saat).padStart(2, '0')}:30`);
    }
    return dilimler;
}

const SAAT_DILIMLERI = saatDilimleriOlustur();

export default function YeniRandevuScreen({ route, navigation }) {
    const { tarih } = route.params; // YYYY-MM-DD
    const { berber } = useAuth();

    const [musteriler, setMusteriler] = useState([]);
    const [secilenMusteriId, setSecilenMusteriId] = useState(null);
    const [doluSaatler, setDoluSaatler] = useState([]);
    const [secilenSaat, setSecilenSaat] = useState(null);
    const [kaydediliyor, setKaydediliyor] = useState(false);
    const { width } = useWindowDimensions();
    const genislik = Math.min(width, 600);
    // Ekran genişliğine göre sütun sayısı: küçük telefonda 3, geniş telefon/tablette daha fazla
    const sutunSayisi = Math.max(3, Math.floor(genislik / 90));

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => Alert.alert('Hata', e.message));
            api.doluSaatleriGetir(berber.id, tarih)
                .then((liste) => {
                    // Backend tam datetime döner, burada sadece "HH:MM" kısmını çıkarıyoruz
                    const saatler = liste.map((ds) =>
                        new Date(ds).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                    );
                    setDoluSaatler(saatler);
                })
                .catch((e) => Alert.alert('Hata', e.message));
        }, [berber.id, tarih])
    );

    const kaydet = async () => {
        if (!secilenMusteriId) {
            Alert.alert('Eksik bilgi', 'Lütfen bir müşteri seçin');
            return;
        }
        if (!secilenSaat) {
            Alert.alert('Eksik bilgi', 'Lütfen bir saat seçin');
            return;
        }

        const tarihSaatISO = `${tarih}T${secilenSaat}:00`;

        setKaydediliyor(true);
        try {
            await api.randevuOlustur(berber.id, secilenMusteriId, tarihSaatISO);
            Alert.alert('Randevu oluşturuldu', 'Müşteriye onay SMS\'i gönderildi.');
            navigation.goBack();
        } catch (err) {
            if (err.status === 409) {
                // Bu saat az önce başkası tarafından alınmış -> listeyi tazele
                Alert.alert('Saat dolu', err.message);
                setSecilenSaat(null);
                api.doluSaatleriGetir(berber.id, tarih).then((liste) =>
                    setDoluSaatler(liste.map((ds) => new Date(ds).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })))
                );
            } else {
                Alert.alert('Hata', err.message);
            }
        } finally {
            setKaydediliyor(false);
        }
    };

    return (
        <View style={styles.disContainer}>
            <View style={[styles.icContainer, { maxWidth: genislik }]}>
                <Text style={styles.baslik}>Müşteri Seç</Text>
                <FlatList
                    horizontal
                    data={musteriler}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.musteriChip, secilenMusteriId === item.id && styles.musteriChipSecili]}
                            onPress={() => setSecilenMusteriId(item.id)}
                        >
                            <Text style={[styles.musteriChipYazi, secilenMusteriId === item.id && styles.musteriChipYaziSecili]}>
                                {item.ad}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.bos}>Önce bir müşteri eklemelisin</Text>}
                />

                <Text style={styles.baslik}>Saat Seç</Text>
                <FlatList
                    key={sutunSayisi}
                    data={SAAT_DILIMLERI}
                    keyExtractor={(item) => item}
                    numColumns={sutunSayisi}
                    renderItem={({ item }) => {
                        const dolu = doluSaatler.includes(item);
                        const secili = secilenSaat === item;
                        return (
                            <TouchableOpacity
                                disabled={dolu}
                                onPress={() => setSecilenSaat(item)}
                                style={[styles.saatKutusu, dolu && styles.saatDolu, secili && styles.saatSecili]}
                            >
                                <Text style={[styles.saatYazi, dolu && styles.saatDoluYazi, secili && styles.saatSeciliYazi]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />

                <TouchableOpacity style={styles.kaydetButon} onPress={kaydet} disabled={kaydediliyor}>
                    <Text style={styles.kaydetYazi}>{kaydediliyor ? 'Kaydediliyor...' : 'Randevuyu Kaydet'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    disContainer: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
    icContainer: { flex: 1, width: '100%', padding: 16 },
    baslik: { fontWeight: '700', fontSize: 15, color: '#374151', marginTop: 12, marginBottom: 4 },
    bos: { color: '#9ca3af', paddingVertical: 12 },

    musteriChip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 8 },
    musteriChipSecili: { backgroundColor: '#1f2937' },
    musteriChipYazi: { color: '#374151' },
    musteriChipYaziSecili: { color: '#fff' },

    saatKutusu: {
        flex: 1, margin: 4, paddingVertical: 12, borderRadius: 8,
        backgroundColor: '#f3f4f6', alignItems: 'center',
    },
    saatSecili: { backgroundColor: '#1f2937' },
    saatDolu: { backgroundColor: '#fecaca' },
    saatYazi: { color: '#374151', fontWeight: '600' },
    saatSeciliYazi: { color: '#fff' },
    saatDoluYazi: { color: '#991b1b', textDecorationLine: 'line-through' },

    kaydetButon: { backgroundColor: '#1f2937', borderRadius: 10, padding: 16, marginTop: 24 },
    kaydetYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
