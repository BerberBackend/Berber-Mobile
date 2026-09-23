import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
    ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function GirisScreen({ navigation }) {
    const [telefon, setTelefon] = useState('');
    const [sifre, setSifre] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const { girisYap } = useAuth();
    const { width } = useWindowDimensions();

    const girisYapaTikla = async () => {
        if (!telefon || !sifre) {
            Alert.alert('Eksik bilgi', 'Telefon ve şifre girin');
            return;
        }
        setGonderiliyor(true);
        try {
            const berber = await api.girisYap(telefon, sifre);
            await girisYap(berber);
        } catch (err) {
            Alert.alert('Giriş başarısız', err.message);
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
    disContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
    icContainer: { width: '100%' },
    baslik: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', color: '#1f2937' },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 8 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
    link: { color: '#1f2937', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' },
});
