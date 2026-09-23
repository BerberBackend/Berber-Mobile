import React, { useState } from 'react';
<<<<<<< HEAD
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
    ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
=======
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

export default function YeniMusteriScreen({ navigation }) {
    const { berber } = useAuth();
    const [ad, setAd] = useState('');
    const [telefon, setTelefon] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
<<<<<<< HEAD
    const { width } = useWindowDimensions();

    const kaydet = async () => {
        if (!ad || !telefon) {
            Alert.alert('Eksik bilgi', 'Ad ve telefon zorunlu');
=======
    const [hata, setHata] = useState('');

    const kaydet = async () => {
        setHata('');
        if (!ad || !telefon) {
            setHata('Ad ve telefon zorunlu');
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
            return;
        }
        setGonderiliyor(true);
        try {
            await api.musteriEkle(berber.id, ad, telefon);
            Alert.alert('Kaydedildi', 'Müşteriye hoşgeldin SMS\'i gönderildi.');
            navigation.goBack();
        } catch (err) {
<<<<<<< HEAD
            Alert.alert('Hata', err.message);
=======
            setHata(err.message);
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
<<<<<<< HEAD
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.disContainer} keyboardShouldPersistTaps="handled">
                <View style={[styles.icContainer, { maxWidth: Math.min(width - 40, 480) }]}>
                    <Text style={styles.etiket}>Müşteri Adı</Text>
                    <TextInput style={styles.input} value={ad} onChangeText={setAd} placeholder="Örn: Mehmet Yılmaz" />

                    <Text style={styles.etiket}>Telefon</Text>
                    <TextInput
                        style={styles.input}
                        value={telefon}
                        onChangeText={setTelefon}
                        placeholder="5xx xxx xx xx"
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity style={styles.buton} onPress={kaydet} disabled={gonderiliyor}>
                        <Text style={styles.butonYazi}>{gonderiliyor ? 'Kaydediliyor...' : 'Kaydet'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
=======
        <Ekran contentStyle={styles.icerik}>
            <Text style={styles.etiket}>Müşteri Adı</Text>
            <TextInput
                style={styles.input}
                value={ad}
                onChangeText={setAd}
                placeholder="Örn: Mehmet Yılmaz"
                placeholderTextColor={renkler.yaziSolukAcik}
            />

            <Text style={styles.etiket}>Telefon</Text>
            <TextInput
                style={styles.input}
                value={telefon}
                onChangeText={setTelefon}
                placeholder="5xx xxx xx xx"
                placeholderTextColor={renkler.yaziSolukAcik}
                keyboardType="phone-pad"
            />

            {!!hata && <Text style={styles.hataYazi}>{hata}</Text>}

            <TouchableOpacity style={styles.buton} onPress={kaydet} disabled={gonderiliyor}>
                <Text style={styles.butonYazi}>{gonderiliyor ? 'Kaydediliyor...' : 'Kaydet'}</Text>
            </TouchableOpacity>
        </Ekran>
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    disContainer: { flexGrow: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center' },
    icContainer: { width: '100%' },
    etiket: { fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 12 },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, fontSize: 16 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 28 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
=======
    icerik: { padding: bosluk.lg },
    etiket: { fontWeight: '600', color: renkler.anaAcik, marginBottom: bosluk.xs, marginTop: bosluk.sm, fontSize: yazi.normal },
    input: {
        borderWidth: 1, borderColor: renkler.kenarlik, borderRadius: yuvarlaklik.sm,
        padding: bosluk.md, fontSize: yazi.govde, color: renkler.yaziAna,
    },
    hataYazi: { color: renkler.tehlike, marginTop: bosluk.md, fontSize: yazi.normal },
    buton: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.sm, padding: bosluk.md, marginTop: bosluk.xl },
    butonYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
