-- create database "Sanay3y_DB" then run this script in the query tool. this will create all the tables.
CREATE TABLE Client (
    Client_ID SERIAL PRIMARY KEY,
    FullName VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    Address VARCHAR(45) NOT NULL,
    Password VARCHAR(45) NOT NULL,
    type CHAR(1) NOT NULL CHECK (type = 'c' OR type = 't' OR type = 'a'),
    Phone_Number CHAR(11) NOT NULL
);

CREATE TABLE service(
    service_ID SERIAL PRIMARY KEY,
    Name VARCHAR(45) NOT NULL
);

CREATE TABLE Point_System(
    Percentage INT PRIMARY KEY,
    Req_points INT NOT NULL
);

CREATE TABLE Customer(
    Customer_ID INT PRIMARY KEY REFERENCES Client(Client_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Points INT DEFAULT 0
);

CREATE TABLE Admin(
    Admin_ID INT PRIMARY KEY REFERENCES Client(Client_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Technician(
    Tech_ID INT PRIMARY KEY REFERENCES Client(Client_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    service_ID INT NOT NULL REFERENCES service(service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Rating INT CHECK (Rating > 0 AND Rating < 6)  
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    order_status CHAR (1) NOT NULL CHECK (order_status = 'P' OR order_status= 'U' OR order_status = 'F' OR order_status = 'C') DEFAULT 'P', 
    order_type CHAR(1) NOT NULL CHECK (order_type = 'R' OR order_type = 'B' OR order_type = 'O') DEFAULT 'R',
    order_DATE DATE DEFAULT CURRENT_DATE,
    order_exec_date DATE,
    Customer_ID INT REFERENCES Customer(Customer_ID)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    highlighted BOOLEAN DEFAULT false
);

CREATE TABLE Feedback(
    Feedback_ID SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    Feedback_DATE DATE DEFAULT CURRENT_DATE,
    Reporter_ID INT REFERENCES Client(Client_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    Reviewer_ID INT REFERENCES Admin(Admin_ID)  
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reward(
    Reward_ID SERIAL PRIMARY KEY,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Percentage INT NOT NULL REFERENCES Point_System(Percentage)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Complaint(
    Complaint_ID SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    Complaint_DATE DATE DEFAULT CURRENT_DATE,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Reviewer_ID INT REFERENCES Admin(Admin_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    order_id INT NOT NULL REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Offer(
    Offer_ID SERIAL PRIMARY KEY,
    Header VARCHAR(45),
    Description TEXT,
    Prev_price INT,
    New_price INT,
    Tech_ID INT REFERENCES Technician(Tech_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Review(
    Review_ID SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating > 0 AND Rating < 6),
    order_id INT NOT NULL REFERENCES orders(order_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    Content TEXT
);

CREATE TABLE Bundle(
    Bundle_ID SERIAL PRIMARY KEY,
    Header VARCHAR(50),
    Description TEXT,
    Creator_ID INT NOT NULL REFERENCES Admin(Admin_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    Expiry_date DATE,
    Total_price INT NOT NULL, 
    tech_id1 INT REFERENCES technician(tech_id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    tech_id2 INT REFERENCES technician(tech_id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    tech_id3 INT REFERENCES technician(tech_id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Notification(
    Notification_ID SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    Notification_DATE DATE DEFAULT CURRENT_DATE,
    Notified_ID INT NOT NULL REFERENCES Client(Client_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    order_id INT NOT NULL REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IsBundle(
    order_id INT REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Bundle_ID INT REFERENCES Bundle(Bundle_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (order_id, Bundle_ID)
);

CREATE TABLE RegularOrder(
    order_id INT REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Header VARCHAR(50),
    Description TEXT,
    tech_id INT REFERENCES technician(tech_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Price INT NOT NULL
);

CREATE TABLE IsOffer(
    order_id INT REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Offer_ID INT REFERENCES Offer(Offer_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (order_id, Offer_ID)
);

CREATE PROCEDURE InsertComplaint (character varying, int, int)
LANGUAGE 'plpgsql'
AS $$
BEGIN
INSERT INTO complaint(content, customer_id, order_id) VALUES ($1, $2, $3);
END;
$$;

CREATE PROCEDURE InsertFeedback(character varying, int)
LANGUAGE 'plpgsql'
AS $$
BEGIN
INSERT INTO feedback (content, reporter_id) VALUES ($1, $2);
END;
$$;

CREATE PROCEDURE InsertService(character varying)
LANGUAGE 'plpgsql'
AS $$
BEGIN
INSERT INTO service (name) VALUES ($1);
END;
$$;

CREATE PROCEDURE InsertOffer(character varying, character varying, int, int, int)
LANGUAGE 'plpgsql'
AS $$
BEGIN
INSERT INTO offer (header, description, prev_price, new_price, tech_id) 
VALUES ($1, $2, $3, $4, $5);
END;
$$;

CREATE PROCEDURE InsertNotification(character varying, int, int)
LANGUAGE 'plpgsql'
AS $$
BEGIN
INSERT INTO notification (content, notified_id, order_id) VALUES ($1, $2, $3);
END;
$$;

alter table technician drop column rating;
alter table technician add column rating float check (rating >= 0 AND rating <= 5) default 0;