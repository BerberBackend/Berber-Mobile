import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

export default function KayitScreen({ navigation }) {
    const [ad, setAd] = useState('');
    const [subeAdi, setSubeAdi] = useState('');
    const [telefon, setTelefon] = useState('');
    const [sifre, setSifre] = useState('');
    const [lisansAnahtari, setLisansAnahtari] = useState('');
    const [gonderiliyor, setGonderiliyor] = useState(false);
    const [hata, setHata] = useState('');
    const { girisYap } = useAuth();

    const kayitOlaTikla = async () => {
        setHata('');
        if (!ad || !telefon || !sifre || !lisansAnahtari) {
            setHata('Ad, telefon, şifre ve lisans anahtarı zorunlu');
            return;
        }
        setGonderiliyor(true);
        try {
            const berber = await api.kayitOl(ad, telefon, subeAdi, sifre, lisansAnahtari.trim());
            await girisYap(berber);
        } catch (err) {
            setHata(err.message);
        } finally {
            setGonderiliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
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
});
