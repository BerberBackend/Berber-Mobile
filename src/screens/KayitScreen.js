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

export default function KayitScreen({ navigation }) {
    const [ad, setAd] = useState('');
    const [subeAdi, setSubeAdi] = useState('');
    const [telefon, setTelefon] = useState('');
    const [sifre, setSifre] = useState('');
<<<<<<< HEAD
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const { girisYap } = useAuth();
    const { width } = useWindowDimensions();

    const kayitOlaTikla = async () => {
        if (!ad || !telefon || !sifre) {
            Alert.alert('Eksik bilgi', 'Ad, telefon ve şifre zorunlu');
=======
    const [lisansAnahtari, setLisansAnahtari] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const [hata, setHata] = useState('');
    const { girisYap } = useAuth();

    const kayitOlaTikla = async () => {
        setHata('');
        if (!ad || !telefon || !sifre || !lisansAnahtari) {
            setHata('Ad, telefon, şifre ve lisans anahtarı zorunlu');
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
            return;
        }
        setGonderiliyor(true);
        try {
<<<<<<< HEAD
            const berber = await api.kayitOl(ad, telefon, subeAdi, sifre);
            Alert.alert('Kaydınız alındı', 'Ödemeniz onaylandıktan sonra hesabınız aktifleştirilecektir.');
            await girisYap(berber);
        } catch (err) {
            Alert.alert('Kayıt başarısız', err.message);
=======
            const berber = await api.kayitOl(ad, telefon, subeAdi, sifre, lisansAnahtari.trim());
            await girisYap(berber);
        } catch (err) {
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
                    <Text style={styles.baslik}>Berber Kaydı</Text>
                    <Text style={styles.altBaslik}>Kayıt sonrası hesabınız onay bekleyecektir</Text>

                    <TextInput style={styles.input} placeholder="Ad Soyad" value={ad} onChangeText={setAd} />
                    <TextInput style={styles.input} placeholder="Salon / Şube Adı (opsiyonel)" value={subeAdi} onChangeText={setSubeAdi} />
                    <TextInput style={styles.input} placeholder="Telefon" keyboardType="phone-pad" value={telefon} onChangeText={setTelefon} />
                    <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={sifre} onChangeText={setSifre} />

                    <TouchableOpacity style={styles.buton} onPress={kayitOlaTikla} disabled={gonderiliyor}>
                        <Text style={styles.butonYazi}>{gonderiliyor ? 'Kaydediliyor...' : 'Kayıt Ol'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Giris')}>
                        <Text style={styles.link}>Zaten hesabın var mı? Giriş yap</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
=======
        <Ekran contentStyle={styles.ortala}>
            <Text style={styles.baslik}>Berber Kaydı</Text>
            <Text style={styles.altBaslik}>Devam etmek için lisans anahtarınızı girin</Text>

            <TextInput style={styles.input} placeholder="Ad Soyad" placeholderTextColor={renkler.yaziSolukAcik} value={ad} onChangeText={setAd} />
            <TextInput style={styles.input} placeholder="Salon / Şube Adı (opsiyonel)" placeholderTextColor={renkler.yaziSolukAcik} value={subeAdi} onChangeText={setSubeAdi} />
            <TextInput style={styles.input} placeholder="Telefon" placeholderTextColor={renkler.yaziSolukAcik} keyboardType="phone-pad" value={telefon} onChangeText={setTelefon} />
            <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor={renkler.yaziSolukAcik} secureTextEntry value={sifre} onChangeText={setSifre} />

            <Text style={styles.etiket}>Lisans Anahtarı</Text>
            <TextInput
                style={[styles.input, styles.lisansInput]}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                placeholderTextColor={renkler.yaziSolukAcik}
                autoCapitalize="characters"
                autoCorrect={false}
                value={lisansAnahtari}
                onChangeText={setLisansAnahtari}
            />
            <Text style={styles.yardimYazi}>
                Lisans anahtarını uygulamayı size kuran kişiden aldınız. Yoksa bizimle iletişime geçin.
            </Text>

            {!!hata && <Text style={styles.hataYazi}>{hata}</Text>}

            <TouchableOpacity style={styles.buton} onPress={kayitOlaTikla} disabled={gonderiliyor}>
                <Text style={styles.butonYazi}>{gonderiliyor ? 'Kaydediliyor...' : 'Kayıt Ol'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Giris')} style={styles.linkAlani}>
                <Text style={styles.link}>Zaten hesabın var mı? Giriş yap</Text>
            </TouchableOpacity>
        </Ekran>
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    disContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
    icContainer: { width: '100%' },
    baslik: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#1f2937' },
    altBaslik: { textAlign: 'center', color: '#6b7280', marginBottom: 24, marginTop: 4 },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 8 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
    link: { color: '#1f2937', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' },
=======
    ortala: { justifyContent: 'center', padding: bosluk.lg, flexGrow: 1 },
    baslik: { fontSize: yazi.baslik, fontWeight: 'bold', textAlign: 'center', color: renkler.yaziAna },
    altBaslik: { fontSize: yazi.normal, textAlign: 'center', color: renkler.yaziSoluk, marginBottom: bosluk.lg, marginTop: bosluk.xs },
    etiket: { fontWeight: '600', color: renkler.anaAcik, marginBottom: bosluk.xs, marginTop: bosluk.sm, fontSize: yazi.normal },
    input: {
        borderWidth: 1, borderColor: renkler.kenarlik, borderRadius: yuvarlaklik.sm,
        padding: bosluk.md, marginBottom: bosluk.sm, fontSize: yazi.govde, color: renkler.yaziAna,
    },
    lisansInput: { fontWeight: '700', letterSpacing: 1 },
    yardimYazi: { color: renkler.yaziSoluk, fontSize: yazi.kucuk, marginBottom: bosluk.sm },
    hataYazi: { color: renkler.tehlike, marginBottom: bosluk.sm, fontSize: yazi.normal },
    buton: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.sm, padding: bosluk.md, marginTop: bosluk.sm },
    butonYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
    linkAlani: { marginTop: bosluk.lg, paddingVertical: bosluk.sm },
    link: { color: renkler.ana, textAlign: 'center', textDecorationLine: 'underline', fontSize: yazi.normal },
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
