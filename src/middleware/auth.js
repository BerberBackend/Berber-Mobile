/**
 * GEÇİCİ / BASİT versiyon: mobil app girişte berber_id'yi header'da gönderiyor.
 * Gerçek üretimde bunu JWT tabanlı login sistemine çevirmemiz gerekir
 * (berber telefon+şifre ile login olur, backend JWT döner, sonraki isteklerde
 * Authorization: Bearer <token> header'ı kullanılır).
 */
function auth(req, res, next) {
    const berberId = req.header('X-Berber-Id');

    if (!berberId) {
        return res.status(401).json({ hata: 'Yetkilendirme gerekli (X-Berber-Id header eksik)' });
    }

    req.berberId = parseInt(berberId, 10);
    next();
}

module.exports = auth;
