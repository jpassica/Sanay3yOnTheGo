import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Sanay3y_DB",
    password: "ahmed2003",
    port: 1234
});

db.connect();

export default db;