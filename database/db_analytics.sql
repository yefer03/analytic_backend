
USE	analyticsDB;

CREATE TABLE tbl_roles (
    idRole INT AUTO_INCREMENT PRIMARY KEY,
    nombreRol VARCHAR(50) UNIQUE
);

CREATE TABLE tbl_reports (
    idReport INT AUTO_INCREMENT PRIMARY KEY,
    idCustomer VARCHAR(100),
    nameReport VARCHAR(100),
    FOREIGN KEY (idCustomer) REFERENCES tbl_customer(idCustomer)
);

CREATE TABLE tbl_customer (
    idCustomer VARCHAR(100) PRIMARY KEY,
    nameCustomer VARCHAR(255)
);

CREATE TABLE tbl_usuarios (
    idUsuario VARCHAR(100) PRIMARY KEY,
    idRoleUsuario INT,
    idEmpleadoCustomer VARCHAR(100),
    nombreUsuario VARCHAR(255),
    apellidoUsuario VARCHAR(255),
    direccionUsuario VARCHAR(255),
    emailUsuario VARCHAR(255) UNIQUE,
    passwordUsuario VARCHAR(255),
    phoneNumberUsuario VARCHAR(20),
    cityUsuario VARCHAR(100),
    startDate DATE,
    FOREIGN KEY (idRoleUsuario) REFERENCES tbl_roles(idRole)
);

CREATE TABLE tbl_forms (
    idForm INT AUTO_INCREMENT PRIMARY KEY,
    idCustomer VARCHAR(100),
    nameForm VARCHAR(100),
    FOREIGN KEY (idCustomer) REFERENCES tbl_customer(idCustomer)
);

-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////


-- Insertar en tbl_roles
SELECT * FROM tbl_roles;
INSERT INTO tbl_roles (nombreRol) VALUES 
('admin'),
('customer'),
('empleado');


SELECT * FROM tbl_customer;
-- Insertar en tbl_customer y tbl_usuarios
INSERT INTO tbl_customer (idCustomer, nameCustomer)
VALUES 
('C001', 'John Doe'),
('C002', 'Jane Doe'),
('C003', 'Bob Smith'),
('C004', 'Alice Johnson'),
('C005', 'Charlie Brown');


SELECT * FROM tbl_usuarios;
INSERT INTO tbl_usuarios (idUsuario, idRoleUsuario, nombreUsuario, apellidoUsuario, direccionUsuario, emailUsuario, passwordUsuario, phoneNumberUsuario, cityUsuario)
VALUES 
('C001', 2, 'John', 'Doe', '123 Main St', 'john@example.com', 'password123', '3002348767', 'Cali'),
('C002', 2, 'Jane', 'Doe', '456 Oak St', 'jane@example.com', 'password456', '3208897632', 'Medellín'),
('C003', 2, 'Bob', 'Smith', '789 Pine St', 'bob@example.com', 'pass789', '3117865341', 'Bogotá'),
('C004', 2, 'Alice', 'Johnson', '101 Maple St', 'alice@example.com', 'pass101', '3228099088', 'Bucaramanga'),
('C005', 2, 'Charlie', 'Brown', '321 Elm St', 'charlie@example.com', 'pass321', '3001789125', 'Santander'),
('C006', 1, 'Admin1', 'lastname admin1', '456 Bym Pr', 'admin1@example.com', '123456789', '3101811540', 'Cartagena'),
('C007', 1, 'Admin2', 'lastname admin1', '928 Okc Cll', 'Admin2@example.com', '123456789', '3118741892', 'Santa marta'),
('C008', 3, 'Empleado 1', 'Lastname empleado 1', '101 Miplex Pl', 'empleado1@example.com', '123456789', '3238912370', 'Barranquilla'),
('C009', 3, 'Empleado 2', 'Lastname empleado 2', '223 Mrt Er', 'empleado2@example.com', '123456789', '3005649102', 'Ibague');


SELECT * FROM tbl_reports;
-- Insertar en tbl_reports
INSERT INTO tbl_reports (idCustomer, nameReport) VALUES 
('C001', 'Sales Report'),
('C002', 'Expense Report'),
('C003', 'Marketing Report'),
('C004', 'Employee Performance Report'),
('C005', 'Customer Satisfaction Report');


SELECT * FROM tbl_forms;
-- Insertar en tbl_forms
INSERT INTO tbl_forms (idCustomer, nameForm) VALUES 
('C001', 'Survey Form'),
('C002', 'Feedback Form'),
('C003', 'Order Form'),
('C004', 'Training Evaluation Form'),
('C005', 'Product Review Form');

