import React, { useCallback, useState } from 'react';
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
        }, [berber.id])
    );

    const kaydet = async () => {
        if (!usercode || !msgheader) {
            Alert.alert('Eksik bilgi', 'Kullanıcı kodu ve mesaj başlığı zorunlu');
            return;
        }
        setKaydediliyor(true);
        try {
            await api.smsAyarlariGuncelle(berber.id, usercode, sifre || undefined, msgheader);
            Alert.alert('Kaydedildi', 'SMS ayarlarınız güncellendi.');
            setSifre('');
            setSifreGirilmis(true);
        } catch (err) {
            Alert.alert('Hata', err.message);
        } finally {
            setKaydediliyor(false);
        }
    };

    return (
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
    );
}

const styles = StyleSheet.create({
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
});
