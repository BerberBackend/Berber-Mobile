import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

export default function GirisScreen({ navigation }) {
    const [telefon, setTelefon] = useState('');
    const [sifre, setSifre] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const [hata, setHata] = useState('');
    const { girisYap } = useAuth();

    const girisYapaTikla = async () => {
        setHata('');
        if (!telefon || !sifre) {
            setHata('Telefon ve şifre girin');
            return;
        }
        setGonderiliyor(true);
        try {
            const berber = await api.girisYap(telefon, sifre);
            await girisYap(berber);
        } catch (err) {
            setHata(err.message);
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
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
});
