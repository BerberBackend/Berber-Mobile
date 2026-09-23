import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
    ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function KayitScreen({ navigation }) {
    const [ad, setAd] = useState('');
    const [subeAdi, setSubeAdi] = useState('');
    const [telefon, setTelefon] = useState('');
    const [sifre, setSifre] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const { girisYap } = useAuth();
    const { width } = useWindowDimensions();

    const kayitOlaTikla = async () => {
        if (!ad || !telefon || !sifre) {
            Alert.alert('Eksik bilgi', 'Ad, telefon ve şifre zorunlu');
            return;
        }
        setGonderiliyor(true);
        try {
            const berber = await api.kayitOl(ad, telefon, subeAdi, sifre);
            Alert.alert('Kaydınız alındı', 'Ödemeniz onaylandıktan sonra hesabınız aktifleştirilecektir.');
            await girisYap(berber);
        } catch (err) {
            Alert.alert('Kayıt başarısız', err.message);
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
    disContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
    icContainer: { width: '100%' },
    baslik: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#1f2937' },
    altBaslik: { textAlign: 'center', color: '#6b7280', marginBottom: 24, marginTop: 4 },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 8 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
    link: { color: '#1f2937', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' },
});
