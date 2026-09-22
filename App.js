import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import GirisScreen from './src/screens/GirisScreen';
import KayitScreen from './src/screens/KayitScreen';
import AnaSayfaScreen from './src/screens/AnaSayfaScreen';
import MusteriListesiScreen from './src/screens/MusteriListesiScreen';
import YeniMusteriScreen from './src/screens/YeniMusteriScreen';
import RandevuTakvimiScreen from './src/screens/RandevuTakvimiScreen';
import YeniRandevuScreen from './src/screens/YeniRandevuScreen';
import SmsAyarlariScreen from './src/screens/SmsAyarlariScreen';

const Stack = createNativeStackNavigator();

function Yonlendirici() {
    const { berber, yukleniyor } = useAuth();

    if (yukleniyor) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1f2937" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1f2937' }, headerTintColor: '#fff' }}>
            {berber ? (
                <>
                    <Stack.Screen name="AnaSayfa" component={AnaSayfaScreen} options={{ title: 'Ana Sayfa' }} />
                    <Stack.Screen name="MusteriListesi" component={MusteriListesiScreen} options={{ title: 'Müşteriler' }} />
                    <Stack.Screen name="YeniMusteri" component={YeniMusteriScreen} options={{ title: 'Yeni Müşteri' }} />
                    <Stack.Screen name="RandevuTakvimi" component={RandevuTakvimiScreen} options={{ title: 'Randevular' }} />
                    <Stack.Screen name="YeniRandevu" component={YeniRandevuScreen} options={{ title: 'Yeni Randevu' }} />
                    <Stack.Screen name="SmsAyarlari" component={SmsAyarlariScreen} options={{ title: 'SMS Ayarları' }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Giris" component={GirisScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Kayit" component={KayitScreen} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <NavigationContainer>
                    <Yonlendirici />
                </NavigationContainer>
                <StatusBar style="auto" />
            </AuthProvider>
        </SafeAreaProvider>
    );
}
