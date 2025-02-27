const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10 // maximum number of connections to create at once
});

// Promisify for using async/await
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(sql, values, (err, results) => {
                connection.release(); // always release the connection back to pool
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    });
};

// Test database connection
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) {
        console.log('Successfully connected to the database.');
        connection.release();
    }
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle database connection:', err);
    process.exit(-1);
});

module.exports = {
    query,
    pool
};
