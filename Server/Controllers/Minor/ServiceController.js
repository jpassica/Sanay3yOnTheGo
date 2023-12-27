import db from "../../Config/DB.js";

const getServiceCategories = async (req, res) => {
    try {
        const result = await db.query("SELECT name FROM service;");
        console.log(result.rows);
        res.send(JSON.stringify(result.rows));

    } catch (error) {
        console.log(error);
        res.send("Could not retrieve services.");
    }
};

export { getServiceCategories };