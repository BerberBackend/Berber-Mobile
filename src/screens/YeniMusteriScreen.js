import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

export default function YeniMusteriScreen({ navigation }) {
    const { berber } = useAuth();
    const [ad, setAd] = useState('');
    const [telefon, setTelefon] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const [hata, setHata] = useState('');

    const kaydet = async () => {
        setHata('');
        if (!ad || !telefon) {
            setHata('Ad ve telefon zorunlu');
            return;
        }
        setGonderiliyor(true);
        try {
            await api.musteriEkle(berber.id, ad, telefon);
            Alert.alert('Kaydedildi', 'Müşteriye hoşgeldin SMS\'i gönderildi.');
            navigation.goBack();
        } catch (err) {
            setHata(err.message);
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
    icerik: { padding: bosluk.lg },
    etiket: { fontWeight: '600', color: renkler.anaAcik, marginBottom: bosluk.xs, marginTop: bosluk.sm, fontSize: yazi.normal },
    input: {
        borderWidth: 1, borderColor: renkler.kenarlik, borderRadius: yuvarlaklik.sm,
        padding: bosluk.md, fontSize: yazi.govde, color: renkler.yaziAna,
    },
    hataYazi: { color: renkler.tehlike, marginTop: bosluk.md, fontSize: yazi.normal },
    buton: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.sm, padding: bosluk.md, marginTop: bosluk.xl },
    butonYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
});
