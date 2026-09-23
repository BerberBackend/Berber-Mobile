import React, { useCallback, useState } from 'react';
<<<<<<< HEAD
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
=======
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

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
<<<<<<< HEAD
=======
    const { width } = useWindowDimensions();
    // Geniş ekranlarda (tablet) daha fazla sütun göster, dar telefonlarda 4 sütun kalsın
    const saatSutunSayisi = width >= 700 ? 6 : width >= 500 ? 5 : 4;
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

    const [musteriler, setMusteriler] = useState([]);
    const [secilenMusteriId, setSecilenMusteriId] = useState(null);
    const [doluSaatler, setDoluSaatler] = useState([]);
    const [secilenSaat, setSecilenSaat] = useState(null);
    const [kaydediliyor, setKaydediliyor] = useState(false);
<<<<<<< HEAD
    const { width } = useWindowDimensions();
    const genislik = Math.min(width, 600);
    // Ekran genişliğine göre sütun sayısı: küçük telefonda 3, geniş telefon/tablette daha fazla
    const sutunSayisi = Math.max(3, Math.floor(genislik / 90));

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => Alert.alert('Hata', e.message));
=======
    const [hata, setHata] = useState('');

    useFocusEffect(
        useCallback(() => {
            api.musteriListele(berber.id).then(setMusteriler).catch((e) => setHata(e.message));
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
            api.doluSaatleriGetir(berber.id, tarih)
                .then((liste) => {
                    // Backend tam datetime döner, burada sadece "HH:MM" kısmını çıkarıyoruz
                    const saatler = liste.map((ds) =>
                        new Date(ds).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                    );
                    setDoluSaatler(saatler);
                })
<<<<<<< HEAD
                .catch((e) => Alert.alert('Hata', e.message));
=======
                .catch((e) => setHata(e.message));
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
        }, [berber.id, tarih])
    );

    const kaydet = async () => {
<<<<<<< HEAD
        if (!secilenMusteriId) {
            Alert.alert('Eksik bilgi', 'Lütfen bir müşteri seçin');
            return;
        }
        if (!secilenSaat) {
            Alert.alert('Eksik bilgi', 'Lütfen bir saat seçin');
=======
        setHata('');
        if (!secilenMusteriId) {
            setHata('Lütfen bir müşteri seçin');
            return;
        }
        if (!secilenSaat) {
            setHata('Lütfen bir saat seçin');
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
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
<<<<<<< HEAD
                Alert.alert('Saat dolu', err.message);
=======
                setHata(err.message);
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
                setSecilenSaat(null);
                api.doluSaatleriGetir(berber.id, tarih).then((liste) =>
                    setDoluSaatler(liste.map((ds) => new Date(ds).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })))
                );
            } else {
<<<<<<< HEAD
                Alert.alert('Hata', err.message);
=======
                setHata(err.message);
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
            }
        } finally {
            setKaydediliyor(false);
        }
    };

    return (
<<<<<<< HEAD
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
=======
        <Ekran kaydirilabilir={false} contentStyle={styles.icerik}>
            <Text style={styles.baslik}>Müşteri Seç</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={musteriler}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.musteriListesi}
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
                data={SAAT_DILIMLERI}
                keyExtractor={(item) => item}
                numColumns={saatSutunSayisi}
                key={saatSutunSayisi}
                contentContainerStyle={styles.saatListesi}
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

            {!!hata && <Text style={styles.hataYazi}>{hata}</Text>}

            <TouchableOpacity style={styles.kaydetButon} onPress={kaydet} disabled={kaydediliyor}>
                <Text style={styles.kaydetYazi}>{kaydediliyor ? 'Kaydediliyor...' : 'Randevuyu Kaydet'}</Text>
            </TouchableOpacity>
        </Ekran>
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
    icerik: { padding: bosluk.md, flex: 1 },
    baslik: { fontWeight: '700', fontSize: yazi.normal, color: renkler.anaAcik, marginTop: bosluk.sm, marginBottom: bosluk.xs },
    bos: { color: renkler.yaziSolukAcik, paddingVertical: bosluk.sm, fontSize: yazi.normal },

    musteriListesi: { paddingVertical: bosluk.xs },
    musteriChip: { paddingVertical: bosluk.sm, paddingHorizontal: bosluk.md, borderRadius: yuvarlaklik.pill, backgroundColor: renkler.kartZemin, marginRight: bosluk.xs },
    musteriChipSecili: { backgroundColor: renkler.ana },
    musteriChipYazi: { color: renkler.anaAcik, fontSize: yazi.normal },
    musteriChipYaziSecili: { color: renkler.beyaz },

    saatListesi: { paddingBottom: bosluk.sm },
    saatKutusu: {
        flex: 1, margin: bosluk.xs, paddingVertical: bosluk.sm + 4, borderRadius: yuvarlaklik.sm,
        backgroundColor: renkler.kartZemin, alignItems: 'center', minWidth: 60,
    },
    saatSecili: { backgroundColor: renkler.ana },
    saatDolu: { backgroundColor: renkler.tehlikeAcikZemin },
    saatYazi: { color: renkler.anaAcik, fontWeight: '600', fontSize: yazi.normal },
    saatSeciliYazi: { color: renkler.beyaz },
    saatDoluYazi: { color: renkler.tehlikeYazi, textDecorationLine: 'line-through' },

    hataYazi: { color: renkler.tehlike, marginTop: bosluk.sm, fontSize: yazi.normal },
    kaydetButon: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.md, padding: bosluk.md, marginTop: bosluk.lg },
    kaydetYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
