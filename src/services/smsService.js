const axios = require('axios');
const pool = require('../db');

/**
 * NetGSM üzerinden gerçek SMS gönderimi.
 * Farklı bir sağlayıcıya (İleti Merkezi vb.) geçersen sadece bu fonksiyonu değiştirmen yeterli.
 */
async function sendViaProvider(telefon, mesaj) {
    if (process.env.SMS_PROVIDER !== 'netgsm') {
        console.log(`[SMS - TEST MODU] ${telefon}: ${mesaj}`);
        return { basarili: true };
    }

    try {
        const response = await axios.get('https://api.netgsm.com.tr/sms/send/get', {
            params: {
                usercode: process.env.NETGSM_USERCODE,
                password: process.env.NETGSM_PASSWORD,
                gsmno: telefon,
                message: mesaj,
                msgheader: process.env.NETGSM_MSGHEADER,
            },
        });
        // NetGSM başarılı gönderimde "00" veya "01" ile başlayan bir kod döner
        const basarili = /^0[01]/.test(String(response.data).trim());
        return { basarili, raw: response.data };
    } catch (err) {
        console.error('SMS gönderim hatası:', err.message);
        return { basarili: false, hata: err.message };
    }
}

/**
 * Kota kontrolü yapıp SMS gönderen ve logu tutan ana fonksiyon.
 * Uygulamadaki TÜM SMS gönderimleri bu fonksiyondan geçmeli.
 *
 * @param {number} berberId
 * @param {number|null} musteriId
 * @param {'hosgeldin'|'onay'|'hatirlatma'} tip
 * @param {string} mesaj
 */
async function smsGonder(berberId, musteriId, tip, mesaj) {
    const berberRes = await pool.query(
        'SELECT sms_kotasi_toplam, sms_kotasi_kullanilan FROM berber WHERE id = $1',
        [berberId]
    );

    if (berberRes.rows.length === 0) {
        throw new Error('Berber bulunamadı');
    }

    const { sms_kotasi_toplam, sms_kotasi_kullanilan } = berberRes.rows[0];

    if (sms_kotasi_kullanilan >= sms_kotasi_toplam) {
        await pool.query(
            `INSERT INTO sms_log (berber_id, musteri_id, tip, mesaj, durum)
             VALUES ($1, $2, $3, $4, 'kota_doldu')`,
            [berberId, musteriId, tip, mesaj]
        );
        return { basarili: false, sebep: 'kota_doldu' };
    }

    // Müşterinin telefon numarasını al
    let telefon = null;
    if (musteriId) {
        const musteriRes = await pool.query('SELECT telefon FROM musteri WHERE id = $1', [musteriId]);
        telefon = musteriRes.rows[0]?.telefon;
    }

    const sonuc = await sendViaProvider(telefon, mesaj);

    await pool.query(
        `INSERT INTO sms_log (berber_id, musteri_id, tip, mesaj, durum)
         VALUES ($1, $2, $3, $4, $5)`,
        [berberId, musteriId, tip, mesaj, sonuc.basarili ? 'gonderildi' : 'basarisiz']
    );

    if (sonuc.basarili) {
        await pool.query(
            'UPDATE berber SET sms_kotasi_kullanilan = sms_kotasi_kullanilan + 1 WHERE id = $1',
            [berberId]
        );
    }

    return sonuc;
}

module.exports = { smsGonder };
