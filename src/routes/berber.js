const express = require('express');
const crypto = require('crypto');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

function sifreHashle(sifre) {
    return crypto.createHash('sha256').update(sifre).digest('hex');
}

// Yeni berber kaydı (deneme sürümü otomatik başlar)
router.post('/kayit', async (req, res, next) => {
    try {
        const { ad, telefon, sube_adi, sifre } = req.body;

        if (!ad || !telefon || !sifre) {
            return res.status(400).json({ hata: 'ad, telefon ve sifre zorunlu' });
        }

        const trialGun = parseInt(process.env.TRIAL_DAYS || '14', 10);
        const kota = parseInt(process.env.DEFAULT_SMS_QUOTA || '500', 10);

        const result = await pool.query(
            `INSERT INTO berber (ad, telefon, sube_adi, sifre_hash, abonelik_durum, donem_baslangic, donem_bitis, sms_kotasi_toplam)
             VALUES ($1, $2, $3, $4, 'deneme', NOW(), NOW() + ($5 || ' days')::interval, $6)
             RETURNING id, ad, telefon, sube_adi, abonelik_durum, donem_bitis, sms_kotasi_toplam`,
            [ad, telefon, sube_adi || null, sifreHashle(sifre), trialGun, kota]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ hata: 'Bu telefon numarasıyla kayıtlı bir berber zaten var' });
        }
        next(err);
    }
});

// Giriş
router.post('/giris', async (req, res, next) => {
    try {
        const { telefon, sifre } = req.body;
        const result = await pool.query(
            `SELECT id, ad, telefon, sube_adi, abonelik_durum, donem_bitis, sms_kotasi_toplam, sms_kotasi_kullanilan
             FROM berber WHERE telefon = $1 AND sifre_hash = $2`,
            [telefon, sifreHashle(sifre)]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ hata: 'Telefon veya şifre hatalı' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Kendi abonelik/kota durumunu görüntüle
router.get('/durum', auth, async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT abonelik_durum, donem_baslangic, donem_bitis, sms_kotasi_toplam, sms_kotasi_kullanilan
             FROM berber WHERE id = $1`,
            [req.berberId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
