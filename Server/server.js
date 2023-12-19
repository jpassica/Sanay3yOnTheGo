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

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));

// Sign In Customer or Tech or Admin
app.post("/SignIn", async(req, res) => {
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
});

// Sign Up Customer and Tech
app.post("/SignUp", async (req, res) => {
    // Validate unique email

    if ((await db.query(`SELECT * FROM client WHERE email = '${req.body.email}';`)).rowCount != 0)
    {
        console.log("Sign up denied");
        return res.send("This email is taken!");
    }

    try{
       await db.query("INSERT INTO client (email, address, password, gender, phone_number, fullname, type)"+
       " VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        [req.body["email"], req.body["address"], req.body["password"], 
        req.body["gender"], req.body["phone_number"], req.body["fullname"], req.body["type"]]);

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


        const service_query = await db.query(`SELECT servicecategory_id FROM servicecategory WHERE name = '${req.body["servicecategory"]}'`);
        const servicecategory_id = service_query.rows[0].servicecategory_id;

        try{
            await db.query(`INSERT INTO technician (tech_id, servicecategory_id) VALUES (${new_id}, ${servicecategory_id});`);
            res.send("technician inserted successfully!");
        }
        catch (error){
            res.send("Couldn't insert technician!");
            console.log(error);
        }
    } 
    
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

// Show techs in area by service category
app.get("/Order/AvailableTechs", async (req, res) => {
    const customerCity = req.body.city; //how to figure this out?
    const s_category = req.body.s_category;
    const result = await db.query(`SELECT fullname, name, rating FROM client, technician, servicecategory
        WHERE address = '${customerCity}' AND technician.servicecategory_id = servicecategory.servicecategory_id
        AND tech_id = client_id AND name = '${s_category}'`);
    res.send(result.rows);
    console.log(req.body);
});

// Show Past Orders 
app.get("/Orders/Past", async (req, res) => {
    const c_id = req.body["c_id"]; 
    const result = await db.query(`SELECT service_timestamp, name FROM service, consistof, servicecategory WHERE customer_id = ${c_id}
        AND consistof.service_id = service.service_id AND servicecategory.servicecategory_id = consistof.servicecategory_id
        AND service_status = 'FINISHED';`);
    res.send(result.rows);
}); 

// Show Pending Orders 
app.get("/Orders/Pending", async (req, res) => {
    const c_id = req.body["c_id"]; 
    const result = await db.query(`SELECT service_timestamp, name FROM service, consistof, servicecategory WHERE customer_id = ${c_id}
        AND consistof.service_id = service.service_id AND servicecategory.servicecategory_id = consistof.servicecategory_id
        AND service_status = 'PENDING';`);
    res.send(result.rows);
}); 

// Make Regular Order
app.post("/Order", async (req, res) => {

    const c_id = req.body.c_id;
    const t_id = req.body.t_id;
    try {
        await db.query("INSERT INTO service (duration, customer_id)"+ 
        "VALUES ($1, $2)", [3, c_id]);

        const s_id = (await db.query("SELECT currval('service_service_id_seq');")).rows[0].currval;

        const category = (await db.query("SELECT servicecategory_id FROM technician WHERE tech_id = $1", [t_id])).rows[0].servicecategory_id;

        await db.query("INSERT INTO consistof (service_id, servicecategory_id, tech_id) VALUES ($1, $2, $3)", [s_id, category, t_id]);

        res.send("service order created succesfully!");
    }
    catch (error) {
        res.send("couldn't create service order!");
        console.log(error);
    }
   
});

// Review an order
app.post("/Order/Review", async (req, res) => {
    const s_id = req.body.s_id;
    const c_id = (await db.query("SELECT customer_id FROM service WHERE service_id = $1;", [s_id])).rows[0].customer_id;

    // Customer can only make one review about each service 
    if ((await db.query("SELECT * FROM review WHERE service_id = $1 AND customer_id = $2;", [s_id, c_id])).rowCount != 0 )
    {
        return res.send("You have already reviewed this service, you cannot review it again.");
    }

    try {
        await db.query("INSERT INTO review (rating, service_id, customer_id, content) VALUES ($1, $2, $3, $4);", 
        [req.body.rating, s_id, c_id, req.body.content]);
        res.send("Review posted successfully!");
    } catch (error) {
        res.send("Could not post review!");
        console.log(error);
    }
        
});

// Make a complaint about order
app.post("/Order/Complain", async (req, res) => {
    // Should only need s_id to identify c_id
    const s_id = req.body.s_id;
    const c_id = (await db.query("SELECT customer_id FROM service WHERE service_id = $1;", [s_id])).rows[0].customer_id;
    const a_id = req.body.a_id; // How to determine the admin that would oversee??

    try {
        await db.query("INSERT INTO complaint (content, customer_id, reviewer_id, service_id) VALUES ($1, $2, $3, $4);", 
        [req.body.content, c_id, a_id, s_id]);

    res.send("Complaint is sent successfully, help is on the way!");
    } catch (error) {
        console.log(error);
        res.send("Could not make complaint!");
    }
});

// Win a Reward
app.post("/CustomerProfile/Reward", async (req, res) => {
    const c_id = req.body.c_id;
    const prcntg = req.body.percentage; // this of course is not determined this way

    try{
        await db.query("INSERT INTO reward (customer_id, percentage) VALUES ($1, $2);", [c_id, prcntg]);
        res.send("Congrats! You have won this reward!");
    } catch (error) {
        res.send("Could not win reward!");
        console.log(error);
    }
});

// Give feedback
app.post("/feedback", async (req, res) => {
    const a_id = req.body.a_id;
    const r_id = req.body.r_id;
    
    try {
        await db.query("INSERT INTO feedback (content, reporter_id, reviewer_id) VALUES ($1, $2, $3);", [req.body.content, r_id, a_id]);
        res.send("Your feedback has been received!");
    } catch (error) {
        res.send("Could not record your feedback!");
        console.log(error);
    }
});