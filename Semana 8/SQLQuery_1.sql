USE QhatuPERU2;
GO

DECLARE @i INT = 1;

-- 1. Insertar 100 Registros en TIENDA
WHILE @i <= 100
BEGIN
    INSERT INTO TIENDA (CodTienda, Direccion, Distrito, Telefono, Fax)
    VALUES (
        100 + @i, 
        'Av. Tienda ' + CAST(@i AS VARCHAR(3)),
        'Distrito ' + CAST((@i % 10) + 1 AS VARCHAR(2)), 
        '400-0' + CAST(100 + @i AS VARCHAR(3)),
        '400-1' + CAST(100 + @i AS VARCHAR(3))
    );
    SET @i = @i + 1;
END
GO

-- 2. Insertar 100 Registros en LINEA
DECLARE @j INT = 1;
WHILE @j <= 100
BEGIN
    INSERT INTO LINEA (NomLinea, Descripcion)
    VALUES (
        'Línea Prd ' + CAST(@j AS VARCHAR(3)),
        'Descripción para Línea ' + CAST(@j AS VARCHAR(3))
    );
    SET @j = @j + 1;
END
GO

-- 3. Insertar 100 Registros en PROVEEDOR
DECLARE @k INT = 1;
WHILE @k <= 100
BEGIN
    INSERT INTO PROVEEDOR (NomProveedor, Representante, Direccion, Ciudad, Departamento, CodigoPostal, Telefono, Fax)
    VALUES (
        'Proveedor SA ' + CAST(@k AS VARCHAR(3)),
        'Rep. ' + CAST(@k AS VARCHAR(3)),
        'Calle Proveedor ' + CAST(@k * 2 AS VARCHAR(3)),
        'Ciudad ' + CAST((@k % 5) + 1 AS VARCHAR(2)),
        'Dep. ' + CAST((@k % 3) + 1 AS VARCHAR(2)),
        'CPO' + CAST(1000 + @k AS VARCHAR(4)),
        '900-0' + CAST(@k AS VARCHAR(3)),
        '900-1' + CAST(@k AS VARCHAR(3))
    );
    SET @k = @k + 1;
END
GO

-- 4. Insertar 100 Registros en TRANSPORTISTA
DECLARE @l INT = 1;
WHILE @l <= 100
BEGIN
    INSERT INTO TRANSPORTISTA (CodTransportista, NomTransportista, Direccion, Telefono)
    VALUES (
        2000 + @l, 
        'Transp. Veloz ' + CAST(@l AS VARCHAR(3)),
        'Ruta ' + CAST(@l AS VARCHAR(3)) + ' km',
        '955-0' + CAST(2000 + @l AS VARCHAR(4))
    );
    SET @l = @l + 1;
END
GO

-- 5. Insertar 100 Registros en ORDEN_COMPRA
DECLARE @m INT = 1;
WHILE @m <= 100
BEGIN
    INSERT INTO ORDEN_COMPRA (NumOrden, FechaOrden, FechaIngreso)
    VALUES (
        3000 + @m, 
        DATEADD(day, -@m, GETDATE()), 
        CASE 
            WHEN @m % 5 = 0 THEN NULL 
            ELSE DATEADD(day, -@m + 3, GETDATE())
        END
    );
    SET @m = @m + 1;
END
GO


-- 6. Insertar 100 Registros en ARTICULO
DECLARE @n INT = 1;
WHILE @n <= 100
BEGIN
    INSERT INTO ARTICULO (CodLinea, CodProveedor, DescripcionArticulo, Presentacion, PrecioProveedor, StockActual, StockMinimo, Descontinuado)
    VALUES (
        @n, 
        @n, 
        'Artículo General ' + CAST(@n AS VARCHAR(3)),
        'Pza ' + CAST((@n % 4) + 1 AS VARCHAR(1)),
        CAST((@n * 0.5) + 2.5 AS MONEY), 
        CAST(50 + (@n * 2) AS SMALLINT),
        CAST(10 + (@n % 10) AS SMALLINT),
        CASE WHEN @n % 20 = 0 THEN 1 ELSE 0 END 
    );
    SET @n = @n + 1;
END
GO

-- 7. Insertar 100 Registros en GUIA_ENVIO
DECLARE @p INT = 1;
WHILE @p <= 100
BEGIN
    INSERT INTO GUIA_ENVIO (NumGuia, CodTienda, FechaSalida, CodTransportista)
    VALUES (
        4000 + @p, 
        100 + ((@p % 100) + 1), 
        DATEADD(day, -(@p / 2), GETDATE()),
        2000 + ((@p % 100) + 1) 
    );
    SET @p = @p + 1;
END
GO

-- 8. Insertar 100 Registros en ORDEN_DETALLE
DECLARE @q INT = 1;
WHILE @q <= 100
BEGIN
    INSERT INTO ORDEN_DETALLE (NumOrden, CodArticulo, PrecioCompra, CantidadSolicitada, CantidadRecibida, Estado)
    VALUES (
        3000 + @q, 
        @q, 
        CAST((@q * 0.5) + 2.5 AS MONEY),
        CAST(100 + (@q * 5) AS SMALLINT),
        CASE WHEN @q % 5 = 0 THEN NULL ELSE CAST(100 + (@q * 5) AS SMALLINT) END,
        CASE 
            WHEN @q % 5 = 0 THEN 'Pendiente'
            ELSE 'Recibido'
        END
    );
    SET @q = @q + 1;
END
GO

-- 9. Insertar 100 Registros en GUIA_DETALLE
DECLARE @r INT = 1;
WHILE @r <= 100
BEGIN
    INSERT INTO GUIA_DETALLE (NumGuia, CodArticulo, PrecioVenta, CantidadEnviada)
    VALUES (
        4000 + @r, 
        @r, 
        CAST((@r * 0.7) + 3.0 AS MONEY), 
        CAST(50 + (@r * 3) AS SMALLINT)
    );
    SET @r = @r + 1;
END
GO