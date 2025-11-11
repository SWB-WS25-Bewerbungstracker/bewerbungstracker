/*
Schema for Bewerbungstracker database
    Tables:
        - Address
        - Contact
        - User
        - Company
        - Application
        - Document
        - Appointment

    Created: 2025-11-08
    Author: Lara Hippenstiel

    Last Edit: 2025-11-09
    Author: Lara Hippenstiel
*/


-- Table for company and user addresses
CREATE TABLE address (
    AddressID SERIAL PRIMARY KEY,
    Street TEXT NOT NULL,
    StreetNo TEXT NOT NULL,
    City TEXT NOT NULL,
    ZIP TEXT NOT NULL,
    Country TEXT NOT NULL
);


-- Table for contacts of input applications
CREATE TABLE contact (
    ContactID SERIAL PRIMARY KEY,
    ContactFName TEXT NOT NULL,
    ContactLName TEXT NOT NULL,
    ContactEmail TEXT,
    ContactPhoneNo TEXT
);


-- Table for Bewerbungstracker web-app users
CREATE TABLE username (
    UserID SERIAL PRIMARY KEY,
    UserFName TEXT NOT NULL,
    UserLName TEXT NOT NULL,
    UserEmail TEXT NOT NULL,
-- Foreign key to link to address
    UserAddress INTEGER REFERENCES address
);


-- Table for companies of input applications
CREATE TABLE company (
    CompanyID SERIAL PRIMARY KEY,
    CompanyName TEXT NOT NULL,
    Size INTEGER,
    Logo TEXT,
-- Foreign key to link to address
    CompanyAddress INTEGER REFERENCES address
);


-- Table for applications input by users
CREATE TABLE joboffer (
    JobofferID SERIAL PRIMARY KEY,
    Jobtitle TEXT NOT NULL,
    Description TEXT,
    WageMin INTEGER,
    WageMax INTEGER,
-- Limit minimum wage to be positive
    CONSTRAINT positive_val_wage CHECK (WageMin > 0),
-- Limit maximum wage to be larger than minimum wage
    CONSTRAINT max_larger_min_wage CHECK (WageMax >= WageMin),
    Rating INTEGER,
-- Limit rating to be between 1 and 5 (standard star rating system)
    CONSTRAINT valid_rating CHECK (Rating > 0 AND Rating < 6),
    Notes TEXT,
-- Foreign keys to link to related contact, company and user
    Contact INTEGER REFERENCES contact,
    Company INTEGER REFERENCES company,
    AppUser INTEGER REFERENCES username
);


-- Table for application related documents uploaded by users
CREATE TABLE document (
    DocumentID SERIAL PRIMARY KEY,
    Filename TEXT NOT NULL,
    Filetype TEXT NOT NULL,
    Category TEXT NOT NULL,
-- File
-- Foreign key to link to related application
    Joboffer INTEGER REFERENCES joboffer
);


-- Table for appointments related to applications
CREATE TABLE appointment (
    AppointmentID SERIAL PRIMARY KEY,
    AppointmentDate TIMESTAMP NOT NULL,
    AppointmentName TEXT NOT NULL,
-- Foreign key to link to related application
    Joboffer INTEGER REFERENCES joboffer
);