import db from "../../Config/DB.js";
import * as helper from "../../Helpers/GenHelper.js";

const createOffer = async (req, res) => {
    const tech = req.body.tech_id;

    try {
        //await db.query("INSERT INTO offer (header, description, prev_price, new_price, tech_id) VALUES ($1, $2, $3, $4, $5);",
            //[req.body.header, req.body.description, req.body.prev_price, req.body.new_price, tech]);

        await db.query(`CALL InsertOffer('${req.body.header}', '${req.body.description}', 
        ${req.body.prev_price}, ${req.body.new_price}, ${tech});`);
        res.send("Offer created successfully!");
    } catch (error) {
        res.send("Could not create your offer!");
        console.log(error);
    }
};
 
const buyOffer = async (req, res) => {
    const id = req.params.id; // offer id
    try {
        req.body.type = "O";
        const newOrder = await helper.makeNewOrder(req, res);
        await db.query("INSERT INTO isoffer VALUES ($1, $2);", [newOrder, id]);
        res.send("Order purchased successfully!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't buy offer!");
    }
};

const getTechOffers = async (req, res) => {
    try { 
        const tech = req.params.id;

        const result = await db.query(`SELECT * FROM offer WHERE tech_id = ${tech};`);
        console.log(result.rows);
        res.send(JSON.stringify(result.rows));

    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve offers!");
    }
};

const deleteOffer = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query (`DELETE FROM offer WHERE offer_id = ${id};`);
        res.send("Successfully deleted!");
    } catch (error) {
        res.send("Could not delete offer!");
        console.log(error);
    }
};

 export { createOffer, buyOffer, getTechOffers, deleteOffer };