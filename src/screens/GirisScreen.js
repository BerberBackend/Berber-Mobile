import React, { useState } from 'react';
<<<<<<< HEAD
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
    ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
=======
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652

export default function GirisScreen({ navigation }) {
    const [telefon, setTelefon] = useState('');
    const [sifre, setSifre] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
<<<<<<< HEAD
    const { girisYap } = useAuth();
    const { width } = useWindowDimensions();

    const girisYapaTikla = async () => {
        if (!telefon || !sifre) {
            Alert.alert('Eksik bilgi', 'Telefon ve şifre girin');
=======
    const [hata, setHata] = useState('');
    const { girisYap } = useAuth();

    const girisYapaTikla = async () => {
        setHata('');
        if (!telefon || !sifre) {
            setHata('Telefon ve şifre girin');
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
            return;
        }
        setGonderiliyor(true);
        try {
            const berber = await api.girisYap(telefon, sifre);
            await girisYap(berber);
        } catch (err) {
<<<<<<< HEAD
            Alert.alert('Giriş başarısız', err.message);
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
                <View style={[styles.icContainer, { maxWidth: Math.min(width - 48, 440) }]}>
                    <Text style={styles.baslik}>Berber Randevu</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Telefon"
                        keyboardType="phone-pad"
                        value={telefon}
                        onChangeText={setTelefon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        secureTextEntry
                        value={sifre}
                        onChangeText={setSifre}
                    />

                    <TouchableOpacity style={styles.buton} onPress={girisYapaTikla} disabled={gonderiliyor}>
                        <Text style={styles.butonYazi}>{gonderiliyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Kayit')}>
                        <Text style={styles.link}>Hesabın yok mu? Kayıt ol</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
=======
        <Ekran contentStyle={styles.ortala}>
            <Text style={styles.baslik}>Berber Randevu</Text>
            <Text style={styles.altBaslik}>Hesabına giriş yap</Text>

            <TextInput
                style={styles.input}
                placeholder="Telefon"
                placeholderTextColor={renkler.yaziSolukAcik}
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={telefon}
                onChangeText={setTelefon}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor={renkler.yaziSolukAcik}
                secureTextEntry
                value={sifre}
                onChangeText={setSifre}
            />

            {!!hata && <Text style={styles.hataYazi}>{hata}</Text>}

            <TouchableOpacity style={styles.buton} onPress={girisYapaTikla} disabled={gonderiliyor}>
                <Text style={styles.butonYazi}>{gonderiliyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Kayit')} style={styles.linkAlani}>
                <Text style={styles.link}>Hesabın yok mu? Kayıt ol</Text>
            </TouchableOpacity>
        </Ekran>
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    disContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
    icContainer: { width: '100%' },
    baslik: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', color: '#1f2937' },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 8 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
    link: { color: '#1f2937', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' },
=======
    ortala: { justifyContent: 'center', padding: bosluk.lg, flexGrow: 1 },
    baslik: { fontSize: yazi.buyukBaslik, fontWeight: 'bold', textAlign: 'center', color: renkler.yaziAna },
    altBaslik: { fontSize: yazi.normal, textAlign: 'center', color: renkler.yaziSoluk, marginBottom: bosluk.xl, marginTop: bosluk.xs },
    input: {
        borderWidth: 1, borderColor: renkler.kenarlik, borderRadius: yuvarlaklik.sm,
        padding: bosluk.md, marginBottom: bosluk.sm, fontSize: yazi.govde, color: renkler.yaziAna,
    },
    hataYazi: { color: renkler.tehlike, marginBottom: bosluk.sm, fontSize: yazi.normal },
    buton: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.sm, padding: bosluk.md, marginTop: bosluk.sm },
    butonYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
    linkAlani: { marginTop: bosluk.lg, paddingVertical: bosluk.sm },
    link: { color: renkler.ana, textAlign: 'center', textDecorationLine: 'underline', fontSize: yazi.normal },
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
