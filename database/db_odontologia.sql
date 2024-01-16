

CREATE TABLE tbl_genero (
    ID_genero INT AUTO_INCREMENT PRIMARY KEY,
    nombre_genero VARCHAR(20)
);

CREATE TABLE tbl_servicio (
    ID_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(50),
    precio_servicio DECIMAL(10,3),
    descripcion_servicio VARCHAR(255)
);

CREATE TABLE tbl_clientes (
    ID_cliente INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_nacimiento DATE,
    genero INT,
    direccion VARCHAR(100),
    telefono VARCHAR(20),
    correo_electronico VARCHAR(50),
    FOREIGN KEY (genero) REFERENCES tbl_genero(ID_genero)
);

CREATE TABLE tbl_citas (
    ID_cita INT AUTO_INCREMENT PRIMARY KEY,
    ID_cliente INT,
    FOREIGN KEY (ID_cliente) REFERENCES tbl_clientes(ID_cliente),
    fecha_cita DATE,
    hora_cita TIME,
    ID_servicio INT,
    FOREIGN KEY (ID_servicio) REFERENCES tbl_servicio(ID_servicio)
);

CREATE TABLE     (
    ID_servicio_vendido INT AUTO_INCREMENT PRIMARY KEY,
    ID_servicio INT,
    ID_cliente INT,
    fecha_adquisicion DATE,
    cantidad_citas INT,
    FOREIGN KEY (ID_servicio) REFERENCES tbl_servicio(ID_servicio),
    FOREIGN KEY (ID_cliente) REFERENCES tbl_clientes(ID_cliente)
);

CREATE TABLE tbl_pagos (
    ID_pago INT AUTO_INCREMENT PRIMARY KEY,
    ID_servicio INT,
    ID_cliente INT,
    fecha_pago DATE,
    monto_cancelado DECIMAL(10,2),
    cancelado BOOLEAN,
    FOREIGN KEY (ID_servicio) REFERENCES tbl_servicio(ID_servicio),
    FOREIGN KEY (ID_cliente) REFERENCES tbl_clientes(ID_cliente)
);

CREATE TABLE tbl_insumos (
    ID_insumo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_insumo VARCHAR(50),
    descripcion_insumo VARCHAR(255),
    stock_disponible INT,
    precio_unitario DECIMAL(10,3),
    fecha_compra DATE,
);

CREATE TABLE tbl_uso_insumos (
    ID_uso_insumo INT AUTO_INCREMENT PRIMARY KEY,
    ID_servicio_vendido INT,
    ID_insumo INT,
    cantidad_usada INT,
    FOREIGN KEY (ID_servicio_vendido) REFERENCES tbl_servicio_vendido(ID_servicio_vendido),
    FOREIGN KEY (ID_insumo) REFERENCES tbl_insumos(ID_insumo)
);





