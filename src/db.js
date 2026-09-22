const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('railway') ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
    console.error('Beklenmeyen veritabanı hatası:', err);
});

module.exports = pool;
