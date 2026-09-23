import React, { useCallback, useState } from 'react';
<<<<<<< HEAD
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
    ScrollView, KeyboardAvoidingView, Platform, Linking,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function SmsAyarlariScreen() {
    const { berber } = useAuth();
    const [usercode, setUsercode] = useState('');
    const [sifre, setSifre] = useState('');
    const [msgheader, setMsgheader] = useState('');
    const [sifreGirilmis, setSifreGirilmis] = useState(false);
    const [kaydediliyor, setKaydediliyor] = useState(false);

    useFocusEffect(
        useCallback(() => {
            api.smsAyarlariGetir(berber.id)
                .then((ayar) => {
                    setUsercode(ayar.netgsm_usercode || '');
                    setMsgheader(ayar.netgsm_msgheader || '');
                    setSifreGirilmis(ayar.sifre_girilmis);
                })
                .catch((e) => Alert.alert('Hata', e.message));
=======
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Ekran from '../components/Ekran';
import { renkler, bosluk, yazi, yuvarlaklik } from '../theme';

export default function SmsAyarlariScreen() {
    const { berber } = useAuth();
    const [kullaniciKodu, setKullaniciKodu] = useState('');
    const [sifre, setSifre] = useState('');
    const [baslik, setBaslik] = useState('');
    const [sifreKayitli, setSifreKayitli] = useState(false);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [kaydediliyor, setKaydediliyor] = useState(false);
    const [mesaj, setMesaj] = useState('');
    const [hata, setHata] = useState('');

    useFocusEffect(
        useCallback(() => {
            let aktif = true;
            setYukleniyor(true);
            api.smsAyarlariGetir(berber.id)
                .then((veri) => {
                    if (!aktif) return;
                    setKullaniciKodu(veri.netgsm_kullanici_kodu || '');
                    setBaslik(veri.netgsm_baslik || '');
                    setSifreKayitli(!!veri.sifre_kayitli);
                })
                .catch((e) => setHata(e.message))
                .finally(() => aktif && setYukleniyor(false));
            return () => {
                aktif = false;
            };
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
        }, [berber.id])
    );

    const kaydet = async () => {
<<<<<<< HEAD
        if (!usercode || !msgheader) {
            Alert.alert('Eksik bilgi', 'Kullanıcı kodu ve mesaj başlığı zorunlu');
=======
        setHata('');
        setMesaj('');
        if (!kullaniciKodu || !baslik || (!sifre && !sifreKayitli)) {
            setHata('Kullanıcı kodu, başlık ve şifre zorunlu');
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
            return;
        }
        setKaydediliyor(true);
        try {
<<<<<<< HEAD
            await api.smsAyarlariGuncelle(berber.id, usercode, sifre || undefined, msgheader);
            Alert.alert('Kaydedildi', 'SMS ayarlarınız güncellendi.');
            setSifre('');
            setSifreGirilmis(true);
        } catch (err) {
            Alert.alert('Hata', err.message);
=======
            await api.smsAyarlariKaydet(berber.id, kullaniciKodu, sifre || undefined, baslik);
            setSifreKayitli(true);
            setSifre('');
            setMesaj('Kaydedildi. Bundan sonraki SMS\'ler bu hesaptan gönderilecek.');
        } catch (err) {
            setHata(err.message);
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
        } finally {
            setKaydediliyor(false);
        }
    };

    return (
<<<<<<< HEAD
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.bilgiKutusu}>
                    <Text style={styles.bilgiBaslik}>SMS göndermek için NetGSM hesabınız gerekli</Text>
                    <Text style={styles.bilgiYazi}>
                        Hesabınız yoksa önce netgsm.com.tr üzerinden ücretsiz kaydolup bir SMS paketi satın alın,
                        sonra aşağıdaki bilgileri NetGSM panelinizden alıp buraya girin.
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.netgsm.com.tr')}>
                        <Text style={styles.link}>netgsm.com.tr'ye git →</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.etiket}>Kullanıcı Kodu (usercode)</Text>
                <TextInput
                    style={styles.input}
                    value={usercode}
                    onChangeText={setUsercode}
                    autoCapitalize="none"
                    placeholder="NetGSM kullanıcı kodunuz"
                />

                <Text style={styles.etiket}>
                    API Şifresi {sifreGirilmis ? '(kayıtlı — değiştirmek için yeni şifre girin)' : ''}
                </Text>
                <TextInput
                    style={styles.input}
                    value={sifre}
                    onChangeText={setSifre}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholder={sifreGirilmis ? '••••••••' : 'NetGSM API şifreniz'}
                />

                <Text style={styles.etiket}>Mesaj Başlığı (msgheader)</Text>
                <TextInput
                    style={styles.input}
                    value={msgheader}
                    onChangeText={setMsgheader}
                    autoCapitalize="characters"
                    placeholder="Örn: BERBERAHM"
                />
                <Text style={styles.ipucu}>
                    NetGSM panelinde onaylattığınız başlık — genelde işletme adınızın kısaltması, max 11 karakter.
                </Text>

                <TouchableOpacity style={styles.buton} onPress={kaydet} disabled={kaydediliyor}>
                    <Text style={styles.butonYazi}>{kaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}</Text>
                </TouchableOpacity>

                <Text style={styles.altNot}>
                    Bilgi girmezseniz uygulama test modunda çalışmaya devam eder — SMS'ler gerçekte gönderilmez.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
=======
        <Ekran contentStyle={styles.icerik}>
            <View style={styles.bilgiKart}>
                <Text style={styles.bilgiBaslik}>Nasıl çalışır?</Text>
                <Text style={styles.bilgiYazi}>
                    1. netgsm.com.tr üzerinden kendi hesabınızı ve SMS paketinizi satın alın.{'\n'}
                    2. NetGSM panelinden kullanıcı kodunuzu, şifrenizi ve onaylı mesaj başlığınızı (msgheader) alın.{'\n'}
                    3. Aşağıya girip kaydedin — hoşgeldin, randevu onay ve hatırlatma SMS'leri otomatik olarak bu hesaptan gönderilir.
                </Text>
            </View>

            {!yukleniyor && (
                <>
                    <Text style={styles.etiket}>NetGSM Kullanıcı Kodu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="8503XXXXXXX"
                        placeholderTextColor={renkler.yaziSolukAcik}
                        autoCapitalize="none"
                        value={kullaniciKodu}
                        onChangeText={setKullaniciKodu}
                    />

                    <Text style={styles.etiket}>NetGSM Şifre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={sifreKayitli ? 'Kayıtlı şifreyi değiştirmek için yazın' : 'Şifreniz'}
                        placeholderTextColor={renkler.yaziSolukAcik}
                        secureTextEntry
                        value={sifre}
                        onChangeText={setSifre}
                    />
                    {sifreKayitli && !sifre && (
                        <Text style={styles.yardimYazi}>Bir şifre kayıtlı. Değiştirmek istemiyorsanız boş bırakabilirsiniz.</Text>
                    )}

                    <Text style={styles.etiket}>Onaylı Mesaj Başlığı</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Örn: BERBERIM"
                        placeholderTextColor={renkler.yaziSolukAcik}
                        autoCapitalize="characters"
                        value={baslik}
                        onChangeText={setBaslik}
                    />

                    {!!hata && <Text style={styles.hataYazi}>{hata}</Text>}
                    {!!mesaj && <Text style={styles.basariYazi}>{mesaj}</Text>}

                    <TouchableOpacity style={styles.buton} onPress={kaydet} disabled={kaydediliyor}>
                        <Text style={styles.butonYazi}>{kaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}</Text>
                    </TouchableOpacity>
                </>
            )}
        </Ekran>
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: { padding: 20, flexGrow: 1, backgroundColor: '#fff' },
    bilgiKutusu: { backgroundColor: '#eff6ff', borderRadius: 12, padding: 16, marginBottom: 20 },
    bilgiBaslik: { fontWeight: '700', color: '#1e3a8a', marginBottom: 6 },
    bilgiYazi: { color: '#1e40af', lineHeight: 20 },
    link: { color: '#1d4ed8', fontWeight: '600', marginTop: 10 },
    etiket: { fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 14 },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 14, fontSize: 16 },
    ipucu: { color: '#9ca3af', fontSize: 12, marginTop: 4 },
    buton: { backgroundColor: '#1f2937', borderRadius: 8, padding: 16, marginTop: 28 },
    butonYazi: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
    altNot: { color: '#9ca3af', fontSize: 12, textAlign: 'center', marginTop: 16, marginBottom: 12 },
=======
    icerik: { padding: bosluk.lg },
    bilgiKart: { backgroundColor: renkler.kartZemin, borderRadius: yuvarlaklik.lg, padding: bosluk.md, marginBottom: bosluk.lg },
    bilgiBaslik: { fontWeight: '700', color: renkler.yaziAna, marginBottom: bosluk.xs, fontSize: yazi.normal },
    bilgiYazi: { color: renkler.yaziIkincil, fontSize: yazi.normal, lineHeight: yazi.normal * 1.5 },
    etiket: { fontWeight: '600', color: renkler.anaAcik, marginBottom: bosluk.xs, marginTop: bosluk.sm, fontSize: yazi.normal },
    input: {
        borderWidth: 1, borderColor: renkler.kenarlik, borderRadius: yuvarlaklik.sm,
        padding: bosluk.md, fontSize: yazi.govde, color: renkler.yaziAna,
    },
    yardimYazi: { color: renkler.yaziSoluk, fontSize: yazi.kucuk, marginTop: bosluk.xs },
    hataYazi: { color: renkler.tehlike, marginTop: bosluk.md, fontSize: yazi.normal },
    basariYazi: { color: renkler.basari, marginTop: bosluk.md, fontSize: yazi.normal },
    buton: { backgroundColor: renkler.ana, borderRadius: yuvarlaklik.sm, padding: bosluk.md, marginTop: bosluk.lg },
    butonYazi: { color: renkler.beyaz, textAlign: 'center', fontWeight: '600', fontSize: yazi.govde },
>>>>>>> b87c5cb1a1f0f494853bd9c7765d588433c67652
});
