USE QhatuPERU;
GO

-- Tabla TIENDA
CREATE TABLE TIENDA (
    CodTienda INT NOT NULL PRIMARY KEY,
    Direccion VARCHAR(100),
    Distrito VARCHAR(50),
    Telefono VARCHAR(15),
    Fax VARCHAR(15)
);
GO

-- Tabla LINEA
CREATE TABLE LINEA (
    CodLinea INT IDENTITY(1,1) PRIMARY KEY,
    NomLinea VARCHAR(40) NOT NULL,
    Descripcion VARCHAR(100),
    CONSTRAINT U_Linea_NomLinea UNIQUE(NomLinea)
);
GO

-- Tabla PROVEEDOR
CREATE TABLE PROVEEDOR (
    CodProveedor INT IDENTITY(1,1) PRIMARY KEY,
    NomProveedor VARCHAR(60) NOT NULL,
    Representante VARCHAR(40),
    Direccion VARCHAR(100),
    Ciudad VARCHAR(30),
    Departamento VARCHAR(30),
    CodigoPostal VARCHAR(15),
    Telefono VARCHAR(15),
    Fax VARCHAR(15)
);
GO

-- Tabla ARTICULO
CREATE TABLE ARTICULO (
    CodArticulo INT IDENTITY PRIMARY KEY,
    CodLinea INT NOT NULL,
    CodProveedor INT NOT NULL,
    DescripcionArticulo VARCHAR(100) NOT NULL,
    Presentacion VARCHAR(50),
    PrecioProveedor MONEY,
    StockActual SMALLINT,
    StockMinimo SMALLINT,
    Descontinuado BIT DEFAULT 0,
    CONSTRAINT CK_Articulo_PrecioProveedor CHECK (PrecioProveedor >= 0),
    CONSTRAINT FK_Articulo_Linea FOREIGN KEY (CodLinea) REFERENCES LINEA(CodLinea) ON DELETE CASCADE,
    CONSTRAINT FK_Articulo_Proveedor FOREIGN KEY (CodProveedor) REFERENCES PROVEEDOR(CodProveedor)
);
GO

-- Tabla ORDEN_COMPRA
CREATE TABLE ORDEN_COMPRA (
    NumOrden INT NOT NULL PRIMARY KEY,
    FechaOrden DATETIME NOT NULL,
    FechaIngreso DATETIME
);
GO

-- Tabla ORDEN_DETALLE
CREATE TABLE ORDEN_DETALLE (
    NumOrden INT NOT NULL,
    CodArticulo INT NOT NULL,
    PrecioCompra MONEY NOT NULL,
    CantidadSolicitada SMALLINT NOT NULL,
    CantidadRecibida SMALLINT,
    Estado VARCHAR(20),
    CONSTRAINT PK_ORDEN_DETALLE PRIMARY KEY (NumOrden, CodArticulo),
    CONSTRAINT FK_OrdenDetalle_Orden FOREIGN KEY (NumOrden) REFERENCES ORDEN_COMPRA(NumOrden),
    CONSTRAINT FK_OrdenDetalle_Articulo FOREIGN KEY (CodArticulo) REFERENCES ARTICULO(CodArticulo)
);
GO

-- Tabla TRANSPORTISTA
CREATE TABLE TRANSPORTISTA (
    CodTransportista INT NOT NULL PRIMARY KEY,
    NomTransportista VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100),
    Telefono VARCHAR(15)
);
GO

-- Tabla GUIA_ENVIO
CREATE TABLE GUIA_ENVIO (
    NumGuia INT NOT NULL PRIMARY KEY,
    CodTienda INT NOT NULL,
    FechaSalida DATETIME NOT NULL,
    CodTransportista INT NOT NULL,
    CONSTRAINT FK_GuiaEnvio_Tienda FOREIGN KEY (CodTienda) REFERENCES TIENDA(CodTienda),
    CONSTRAINT FK_GuiaEnvio_Transportista FOREIGN KEY (CodTransportista) REFERENCES TRANSPORTISTA(CodTransportista)
);
GO

-- Tabla GUIA_DETALLE
CREATE TABLE GUIA_DETALLE (
    NumGuia INT NOT NULL,
    CodArticulo INT NOT NULL,
    PrecioVenta MONEY NOT NULL,
    CantidadEnviada SMALLINT NOT NULL,
    CONSTRAINT PK_GUIA_DETALLE PRIMARY KEY (NumGuia, CodArticulo),
    CONSTRAINT FK_GuiaDetalle_Guia FOREIGN KEY (NumGuia) REFERENCES GUIA_ENVIO(NumGuia),
    CONSTRAINT FK_GuiaDetalle_Articulo FOREIGN KEY (CodArticulo) REFERENCES ARTICULO(CodArticulo)
);
GO
-- Tabla REPORTES
CREATE TABLE REPORTES (
    CodReporte INT IDENTITY(1,1) PRIMARY KEY,
    NombreReporte VARCHAR(100) NOT NULL,
    FechaGeneracion DATETIME NOT NULL DEFAULT GETDATE(),
    GeneradoPor VARCHAR(60),
    Descripcion VARCHAR(200),
    TotalVentas MONEY,
    Observaciones VARCHAR(200)
);
GO
-- Tabla VENTAS
CREATE TABLE VENTAS (
    CodVenta INT IDENTITY(1,1) PRIMARY KEY,
    CodTienda INT NOT NULL,
    FechaVenta DATETIME NOT NULL DEFAULT GETDATE(),
    Total MONEY NOT NULL CHECK (Total >= 0),
    MedioPago VARCHAR(30),
    Observaciones VARCHAR(200),
    CONSTRAINT FK_Ventas_Tienda FOREIGN KEY (CodTienda) REFERENCES TIENDA(CodTienda)
);
GO
CREATE TABLE PEDIDOS (
    IdPedido INT IDENTITY(1,1) PRIMARY KEY,
    IdCliente INT NOT NULL,
    FechaPedido DATETIME DEFAULT GETDATE(),
    MontoTotal DECIMAL(10,2) NOT NULL,
    EstadoEnvio NVARCHAR(50) DEFAULT 'Pendiente',
    CONSTRAINT FK_Pedidos_Clientes FOREIGN KEY (IdCliente)
        REFERENCES CLIENTES(IdCliente)
);
GO
CREATE TABLE CLIENTES (
    IdCliente INT IDENTITY(1,1) PRIMARY KEY,
    NombreCliente NVARCHAR(100) NOT NULL,
    DNI CHAR(8) NOT NULL UNIQUE,
    Telefono CHAR(9) NULL,
    Direccion NVARCHAR(150) NULL,
    Correo NVARCHAR(100) NULL,
    FechaRegistro DATETIME DEFAULT GETDATE()
);
GO