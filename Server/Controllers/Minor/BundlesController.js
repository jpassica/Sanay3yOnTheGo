import db from "../../Config/DB.js";
import * as helper from "../../Helpers/GenHelper.js";

const createBundle = async (req, res) => {

    try {
        await db.query(`INSERT INTO bundle (header, description, creator_id, expiry_date, total_price, tech_id1,
            tech_id2, tech_id3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, 
            [req.body.header, req.body.description, req.body.admin_id, req.body.expiry_date, req.body.total_price,
            req.body.tech_id1, req.body.tech_id2, req.body.tech_id3]);

        res.send("Bundle created successfully!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't create bundle!");
    }
}

const buyBundle = async (req, res) => {
    const id = req.params.id; // bundle id
    try {
        req.body.type = "B";
        const newOrder = await helper.makeNewOrder(req, res);
        await db.query (`INSERT INTO isbundle VALUES ($1, $2);`, [newOrder, req.params.id]);
        res.send("Bundle purchased successfully!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't buy bundle!");
    }
}

const getAllBundles = async (req, res) => {
    try {
        const result = (await db.query(`SELECT * FROM bundle;`)).rows;
        console.log(result);
        res.send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve bundles!");
    }
}

export { createBundle, buyBundle, getAllBundles };