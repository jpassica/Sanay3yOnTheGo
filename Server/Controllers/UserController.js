import db from "../Config/DB.js";

const createNewUser = async (req, res) => {
    // Validate unique email
    if ((await db.query(`SELECT * FROM client WHERE email = '${req.body.email}';`)).rowCount != 0)
    {
     console.log("Sign up denied");
     return res.send("This email is taken!");
    }

    try{
        await db.query("INSERT INTO client (email, address, password, phone_number, fullname, type)"+
        " VALUES ($1, $2, $3, $4, $5, $6)", 
        [req.body["email"], req.body["address"], req.body["password"], 
        req.body["phone_number"], req.body["fullname"], req.body["type"]]);
    
         //res.send("client inserted successfully!");
    } catch (error) {
        res.send("Couldn't insert client!");
        console.log(error);
    }

    if (req.body["type"] === 'c')
    {
        const new_id = (await db.query("SELECT currval('client_client_id_seq');")).rows[0].currval;;    
        try{
            await db.query(`INSERT INTO customer VALUES (${new_id}, 0);`);
            res.send("customer inserted successfully!");
        }
        catch (error){
            res.send("Couldn't insert customer!");
            console.log(error);
        }
    } else if (req.body["type"] === 't')
    {
        const new_id = (await db.query("SELECT currval('client_client_id_seq');")).rows[0].currval;

        const service_query = await db.query(`SELECT service_id FROM service WHERE name = '${req.body["service"]}';`);

        const service_id = service_query.rows[0].service_id;

        try{
            await db.query(`INSERT INTO technician (tech_id, service_id) VALUES (${new_id}, ${service_id});`);
            res.send("technician inserted successfully!");
        }
        catch (error){
            res.send("Couldn't insert technician!");
            console.log(error);
        }
    } 

};

const signInUser = async (req, res) => {
    try {
        const result = await db.query(`SELECT fullname,type FROM client WHERE LOWER(email) = '${req.body["email"].toLowerCase()}' AND password = '${req.body["password"]}'`);
        console.log(result.rows[0].fullname);
        res.send(`Successfully logged in, ${result.rows[0].fullname}!`);

        //res.render

        if (result.rows[0].type == 'c')
            console.log("Customer logged in.");
        else if (result.rows[0].type == 't')
            console.log("Tech logged in.");
        else 
            console.log("Admin logged in.");
        
    } catch(error) {
        res.send("Wrong email or password!");
        console.log(error);
    }
};

const getUserDetails = async (req, res) => {
    const id = req.params.id;

    try{
        const main_result = (await db.query(`SELECT * FROM client WHERE client_id = ${id};`)).rows[0];

        if (main_result.type == "t")
        {
            const service = (await db.query(`SELECT name, rating FROM service, technician 
                WHERE technician.service_id = service.service_id AND tech_id = ${id};`)).rows[0];

            const result = {...main_result, ...service};
            console.log(result);
            res.send(JSON.stringify(result));  

        } else if (main_result.type == "c")
        {
            const points = (await db.query(`SELECT points FROM customer WHERE customer_id = ${id};`)).rows[0];

            const result = {...main_result, ...points};
            console.log(result);
            res.send(JSON.stringify(result));
        }
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve account details!");
    }
};

const getNearbyTechs = async (req, res) => {
    try {
        const customerCity = (await db.query (`SELECT address FROM client WHERE client_id = ${req.body.customer_id};`)).rows[0].address;
        const result = await db.query(`SELECT * FROM client, technician, service 
        WHERE client_id = tech_id AND service.service_id = technician.service_id AND address = '${customerCity}';`);
        console.log(result.rows);
        res.send(JSON.stringify(result.rows));
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve technicians!");
    }
}

const updateUserDetails = async (req, res) => {
    const id = req.params.id;

    const oldDetails = (await db.query(`SELECT * FROM client WHERE client_id = ${id};`)).rows[0];

    const email = req.body.email || oldDetails.email;
    const phone_number = req.body.phone_number || oldDetails.phone_number;
    const address = req.body.address || oldDetails.address;
    const fullname = req.body.fullname || oldDetails.fullname;
    const password = req.body.password || oldDetails.password;

    try {
        await db.query (`UPDATE client SET
            email = '${email}', 
            phone_number = ${phone_number},
            address = '${address}',
            fullname = '${fullname}',
            password = '${password}' 
            WHERE client_id = ${id};`);

        if (oldDetails.type == "t")
        {
            const Service_ID = (await db.query(`SELECT service_id FROM technician WHERE tech_id = ${id};`)).rows[0].service_id;
            const Service_name = (await db.query(`SELECT name FROM service WHERE service_id = ${Service_ID};`)).rows[0].name;

            const service = req.body.service || Service_name;

            const newService_ID = (await db.query(`SELECT service_id FROM service WHERE name = '${service}';`)).rows[0].service_id;

            await db.query(`UPDATE technician SET service_id = ${newService_ID} WHERE tech_id = ${id};`);
        }

        console.log(oldDetails);
        res.send("Successfully updated details!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't update details!");
    }
}

const getUserAreas = async (req, res) => {
    try {
        const result = await db.query ("SELECT DISTINCT address FROM client");
        console.log(JSON.stringify(result.rows));
        res.send(JSON.stringify(result.rows));
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve addresses!");
    }
}

const banUser = async (req, res) => {
    const id = req.params.id;

    try {
        await db.query(`DELETE FROM client WHERE client_id = ${id};`);
        res.send("Banned");
    } catch (error) {
        console.log(error);
        res.send("Couldn't ban user!");
    }
}

export { createNewUser, signInUser, updateUserDetails, getUserDetails, getNearbyTechs, getUserAreas, banUser };
 
 

 

 

 
 