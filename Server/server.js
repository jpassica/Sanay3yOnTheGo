import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Sanay3y_DB",
    password: "tezCix-4tyxxo",
    port: 5432
});

app.get("/SignUp", (req, res) => {
    if (req.body["type" == "Customer"])
        res.redirect("/SignUp/Customer");
});

app.get("/SignUp", (req, res) => {
    db.query("INSERT INTO Customer (FullName, ) VALUES", []);
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});