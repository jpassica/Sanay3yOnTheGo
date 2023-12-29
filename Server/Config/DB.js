import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Sanay3y_DB",
    password: "tezCix-4tyxxo",
    port: 5432
});

db.connect();

export default db;