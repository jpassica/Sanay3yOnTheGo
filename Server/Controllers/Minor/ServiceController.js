import db from "../../Config/DB.js";

const getServiceCategories = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM service;");
        console.log(result.rows);
        res.send(JSON.stringify(result.rows));

    } catch (error) {
        console.log(error);
        res.send("Could not retrieve services.");
    }
};

const addServiceCategory = async (req, res) => {
    try {
        await db.query(`INSERT INTO service (name) VALUES ('${req.body.service_name}');`);
        res.send(`Service category added successfully!`);
    } catch (error) {
        console.log(error);
        res.send("Could not add service category!");
    }
}

export { getServiceCategories, addServiceCategory };