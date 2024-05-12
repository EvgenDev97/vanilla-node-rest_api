import  pg from "pg";

const {DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,} = process.env

const pool = new pg.Pool({
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    ssl:false
});



pool.on('error', (err) => {
    console.error('Ошибка подключения к базе данных:', err);
})

export default pool