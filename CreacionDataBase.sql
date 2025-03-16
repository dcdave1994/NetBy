-- Crear la base de datos
CREATE DATABASE NetbyDB;
GO

USE NetbyDB;
GO

-- Tabla de Productos
CREATE TABLE Productos (
    ProductoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255),
    Categoria NVARCHAR(50),
    Imagen NVARCHAR(255), -- URL o path de la imagen
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0)
);
GO

-- Tabla de Transacciones
CREATE TABLE Transacciones (
    TransaccionID INT IDENTITY(1,1) PRIMARY KEY,
    Fecha DATETIME DEFAULT GETDATE(),
    Tipo NVARCHAR(10) CHECK (Tipo IN ('Compra', 'Venta')),
    ProductoID INT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PrecioUnitario DECIMAL(10,2) NOT NULL CHECK (PrecioUnitario >= 0),
    Detalle NVARCHAR(255),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID) ON DELETE CASCADE
);
GO