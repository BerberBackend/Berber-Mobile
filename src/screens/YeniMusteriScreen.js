import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
    ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function YeniMusteriScreen({ navigation }) {
    const { berber } = useAuth();
    const [ad, setAd] = useState('');
    const [telefon, setTelefon] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const { width } = useWindowDimensions();

    const kaydet = async () => {
        if (!ad || !telefon) {
            Alert.alert('Eksik bilgi', 'Ad ve telefon zorunlu');
            return;
        }
        setGonderiliyor(true);
        try {
            await api.musteriEkle(berber.id, ad, telefon);
            Alert.alert('Kaydedildi', 'Müşteriye hoşgeldin SMS\'i gönderildi.');
            navigation.goBack();
        } catch (err) {
            Alert.alert('Hata', err.message);
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
    disContainer: { flexGrow: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center' },
    icContainer: { width: '100%' },
    etiket: { fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 12 },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, fontSize: 16 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 28 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
