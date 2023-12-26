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
        const new_id = (await db.query("SELECT currval('client_client_id_seq');")).rows[0].currval;;
                        const service_query = await db.query(`SELECT service_id FROM service WHERE name = '${req.body["service"]}'`);
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

const updateUser = async(req , res) => {

};

export { createNewUser, signInUser, updateUser };
 
 

 

 

 
 