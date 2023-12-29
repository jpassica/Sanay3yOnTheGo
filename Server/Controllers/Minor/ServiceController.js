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
        //await db.query(`INSERT INTO service (name) VALUES ('${req.body.service_name}');`);
        await db.query(`CALL InsertService('${req.body.service_name}');`);
        res.send(`Service category added successfully!`);
    } catch (error) {
        console.log(error);
        res.send("Could not add service category!");
    }
}

const editServiceCategory = async (req, res) => {
    try {
        const oldName = (await db.query(`SELECT name FROM service WHERE service_id = ${req.params.id};`)).rows[0].name;

        const newName = req.body.service_name || oldName;

        await db.query(`UPDATE service SET name = '${newName}' WHERE service_id = ${req.params.id};`);

        res.send("Service category edited successfully!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't edit service category!");
    }
}

const deleteServiceCategory = async (req, res) => {
    try {
        await db.query(`DELETE FROM service WHERE service_id = ${req.params.id};`);
        res.send("Successfully deleted!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't delete service category!");
    }
}

export { getServiceCategories, addServiceCategory, editServiceCategory, deleteServiceCategory };