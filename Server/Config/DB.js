import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "sanay3y_db",
    password: "hana1234",
    port: 5432
});

db.connect();

export default db;