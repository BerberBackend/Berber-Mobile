import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAKS_ICERIK_GENISLIGI, genisEkranMi } from '../theme/responsive';
import { renkler } from '../theme';

/**
 * Tüm ekranlarda ortak kullanılan sarmalayıcı:
 * - SafeAreaView: çentik/status bar alanına taşmayı engeller
 * - KeyboardAvoidingView: form ekranlarında klavye input'ları kapatmasın
 * - ScrollView: küçük ekranlarda (ör. eski/küçük telefonlar) içerik taşarsa kaydırılabilsin
 * - Geniş ekranlarda (tablet) içerik ortalanır, kenarlara yapışıp çirkin durmaz
 *
 * kaydirilabilir=false verilirse (liste ekranları gibi, kendi FlatList'i olan
 * yerlerde) sadece SafeAreaView + max genişlik sarmalayıcısı uygulanır.
 */
export default function Ekran({ children, style, kaydirilabilir = true, contentStyle, refreshControl }) {
  const genisEkran = genisEkranMi();

  const icerik = (
    <View style={[styles.icerikSarmalayici, genisEkran && styles.genisIcerikSarmalayici]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, style]} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flexDoldur}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
      >
        {kaydirilabilir ? (
          <ScrollView
            style={styles.flexDoldur}
            contentContainerStyle={[styles.scrollIcerik, contentStyle]}
            keyboardShouldPersistTaps="handled"
            refreshControl={refreshControl}
          >
            {icerik}
          </ScrollView>
        ) : (
          <View style={[styles.flexDoldur, contentStyle]}>{icerik}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: renkler.arkaplan },
  flexDoldur: { flex: 1 },
  scrollIcerik: { flexGrow: 1 },
  icerikSarmalayici: { flex: 1, width: '100%' },
  genisIcerikSarmalayici: {
    maxWidth: MAKS_ICERIK_GENISLIGI,
    alignSelf: 'center',
  },
});
