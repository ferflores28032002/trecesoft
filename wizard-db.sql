-- Creating the Wizard database
CREATE DATABASE wizard;

-- Using the Wizard database
USE wizard;

-- Creating the Roles table (equivalente a RolEntity)
CREATE TABLE Roles (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BIT DEFAULT 1
);

-- Creating the Users table (equivalente a UserEntity)
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BIT DEFAULT 1,
    roleId INT,
    FOREIGN KEY (roleId) REFERENCES Roles(id)
);

-- Inserting roles into the Roles table
INSERT INTO Roles (name, description, is_active) VALUES ('SuperAdmin', 'Administrator with full access', 1);
INSERT INTO Roles (name, description, is_active) VALUES ('Generico', 'Generic user role with limited access', 1);

-- Inserting users into the Users table
INSERT INTO Users (name, username, email, password, is_active, roleId) 
VALUES ('Super', 'admin', 'superadmin@example.com', 'hashedpassword123', 1, 1);

INSERT INTO Users (name, username, email, password, is_active, roleId) 
VALUES ('Generic', 'genericuser', 'genericuser@example.com', 'hashedpassword123', 1, 2);

INSERT INTO Users (name, username, email, password, is_active, roleId) 
VALUES ('Fernando', 'fernandojos', 'fernandojos32002@example.com', 'hashedpassword123', 1, 2);
