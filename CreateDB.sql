-- 
CREATE TABLE Client (
    Client_ID SERIAL PRIMARY KEY,
    FName VARCHAR(45) NOT NULL,
    LName VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    Address VARCHAR(45) NOT NULL,
    Password VARCHAR(45) NOT NULL,
    Gender VARCHAR(6) NOT NULL CHECK (Gender = 'MALE' OR Gender = 'FEMALE'),
    Phone_Number CHAR(11) NOT NULL
);

CREATE TABLE ServiceCategory(
    ServiceCategory_ID SERIAL PRIMARY KEY,
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
    ServiceCategory_ID INT NOT NULL REFERENCES ServiceCategory(ServiceCategory_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Rating INT CHECK (Rating > 0 AND Rating < 6)  
);

CREATE TABLE Service(
    Service_ID SERIAL PRIMARY KEY,
    Service_status CHAR (8) NOT NULL CHECK (Service_status = 'PENDING' OR Service_status= 'UPCOMING' OR Service_status = 'FINISHED') DEFAULT 'PENDING',
    Service_type CHAR(10) NOT NULL DEFAULT 'REGULAR',
    Service_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Duration INT,
    Customer_ID INT REFERENCES Customer(Customer_ID)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE Feedback(
    Feedback_ID SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    Feedback_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    Complaint_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Reviewer_ID INT NOT NULL REFERENCES Admin(Admin_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Service_ID INT NOT NULL REFERENCES Service(Service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Offer(
    Offer_ID INT PRIMARY KEY,
    Content TEXT,
    Price INT NOT NULL,
    Expiry_date DATE,
    Tech_ID INT REFERENCES Technician(Tech_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE

);

CREATE TABLE Review(
    Review_ID SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating > 0 AND Rating < 6),
    Service_ID INT NOT NULL REFERENCES Service(Service_ID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    Content TEXT
);

CREATE TABLE Bundle(
    Bundle_ID SERIAL PRIMARY KEY,
    Creator_ID INT NOT NULL REFERENCES Admin(Admin_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    Expiry_date DATE,
    Total_price INT NOT NULL, 
    Services_count INT
);

CREATE TABLE ConsistOf(
    Service_ID INT REFERENCES Service(Service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ServiceCategory_ID INT REFERENCES ServiceCategory(ServiceCategory_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Tech_ID INT REFERENCES Technician(Tech_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (Service_ID, ServiceCategory_ID, Tech_ID)
);

CREATE TABLE Notification(
    Notification_ID SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    Notification_timestamp TIMESTAMP,
    Notified_ID INT NOT NULL REFERENCES Client(Client_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Service_ID INT NOT NULL REFERENCES Service(Service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IsBundle(
    Service_ID INT REFERENCES Service(Service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Bundle_ID INT REFERENCES Bundle(Bundle_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (Service_ID, Bundle_ID)
);

CREATE TABLE RegularService(
    Service_ID INT REFERENCES Service(Service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Price INT NOT NULL
);

CREATE TABLE IsOffer(
    Service_ID INT REFERENCES Service(Service_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Offer_ID INT REFERENCES Offer(Offer_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (Service_ID, Offer_ID)
);
