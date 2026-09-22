import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [berber, setBerber] = useState(null);
    const [yukleniyor, setYukleniyor] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('berber').then((kayitli) => {
            if (kayitli) setBerber(JSON.parse(kayitli));
            setYukleniyor(false);
        });
    }, []);

    const girisYap = async (berberVerisi) => {
        setBerber(berberVerisi);
        await AsyncStorage.setItem('berber', JSON.stringify(berberVerisi));
    };

    const cikisYap = async () => {
        setBerber(null);
        await AsyncStorage.removeItem('berber');
    };

    return (
        <AuthContext.Provider value={{ berber, girisYap, cikisYap, yukleniyor }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
