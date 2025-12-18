--Ejercicio 1
--A) CREACIÓN DE LA BASE DE DATOS QhatuPERU
USE MASTER;
GO
IF EXISTS(SELECT *FROM sys.databases WHERE name ='QhatuPERU')
DROP DATABASE QhatuPERU;
GO

CREATE DATABASE QhatuPERU
ON PRIMARY
(
NAME = 'QhatuPERU_Primary',
FILENAME = 'C:\SQLData\QhatuPERU_Primary.mdf',
SIZE = 50MB,
MAXSIZE = 500MB,
FILEGROWTH = 10MB
),
FILEGROUP Secundario (
    NAME = QhatuPeru_Secundario,
    FILENAME = 'C:\SQLData\QhatuPERU_Secundario.ndf',
    SIZE = 100MB,
    MAXSIZE = 1GB,
    FILEGROWTH = 50MB
)
LOG ON (
    NAME = QhatuPeru_Log,
    FILENAME = 'C:\SQLLogs\QhatuPERU_Log.ldf',
    SIZE = 20MB,
    MAXSIZE = 500MB,
    FILEGROWTH = 10MB
);
GO

--B) Consulta de los archivos fisicos asociados a la base QhatuPERU
USE QhatuPERU;
GO
--1
EXEC sp_helpdb 'QhatuPERU';
--2
SELECT 
    file_id,
    name AS NombreArchivo,
    physical_name AS RutaFisica,
    type_desc AS TipoArchivo,
    size * 8 / 1024 AS Tamaño_MB
FROM sys.database_files;
GO
--3
SELECT name, state_desc
FROM sys.databases 
WHERE name = 'QhatuPERU';

--Ejercicio 2 
-- a) Consulta de las propiedades actuales de la base de datos QhatuPeru
USE QhatuPERU;
GO
SELECT 
    name AS NombreArchivo,
    type_desc AS TipoArchivo,
    physical_name AS RutaFisica,
    size * 8 / 1024 AS Tamaño_MB,
    growth AS Crecimiento,
    is_percent_growth AS CrecimientoPorcentual
FROM sys.database_files;
GO

-- Modificación de la colación para soportar tildes y caracteres especiales
-- (Por ejemplo: Modern_Spanish_CI_AS admite acentos y ñ)
ALTER DATABASE QhatuPeru COLLATE Modern_Spanish_CI_AS;
GO

-- Configuración inicial del crecimiento automático del archivo principal
ALTER DATABASE QhatuPeru 
MODIFY FILE (
    NAME = QhatuPeru_Primary,
    FILEGROWTH = 10MB
);
GO

-- b) Modificación del crecimiento automático del archivo primario de datos a 20 MB
ALTER DATABASE QhatuPeru 
MODIFY FILE (
    NAME = QhatuPeru_Primary,
    FILEGROWTH = 20MB
);
GO

-- Verificación de los cambios aplicados
SELECT 
    name AS NombreArchivo,
    physical_name AS RutaFisica,
    size * 8 / 1024 AS Tamaño_MB,
    growth AS ValorCrecimiento,
    CASE 
        WHEN is_percent_growth = 1 THEN 'Porcentaje'
        ELSE 'Megabytes'
    END AS TipoCrecimiento,
    type_desc AS TipoArchivo
FROM sys.database_files;
GO

--Ejercicio 3
-- a) Consultar el modelo de recuperación actual
SELECT 
    name AS NombreBaseDatos,
    recovery_model_desc AS ModeloRecuperacion
FROM sys.databases
WHERE name = 'QhatuPERU';
GO

-- Cambiar el modelo de recuperación a SIMPLE
ALTER DATABASE QhatuPERU
SET RECOVERY SIMPLE;
GO

-- Verificar el cambio
SELECT 
    name AS NombreBaseDatos,
    recovery_model_desc AS ModeloRecuperacion
FROM sys.databases
WHERE name = 'QhatuPERU';
GO

-- Cambiar el modelo de recuperación a BULK_LOGGED
ALTER DATABASE QhatuPERU
SET RECOVERY BULK_LOGGED;
GO

-- Verificar nuevamente
SELECT 
    name AS NombreBaseDatos,
    recovery_model_desc AS ModeloRecuperacion
FROM sys.databases
WHERE name = 'QhatuPERU';
GO

-- b) Cambiar el modelo a FULL para ejecutar el respaldo completo
ALTER DATABASE QhatuPERU
SET RECOVERY FULL;
GO

-- Crear respaldo completo de la base de datos
BACKUP DATABASE QhatuPERU
TO DISK = 'C:\SQLBackups\QhatuPERU_FullBackup.bak'
WITH 
    FORMAT,
    NAME = 'RespaldoCompleto_QhatuPERU',
    SKIP,
    INIT,
    STATS = 10;
GO

--Ejercicio 4
USE QhatuPeru;
GO

-- a) Crear el inicio de sesión (Login) a nivel de servidor
CREATE LOGIN VendedorQhatu WITH PASSWORD = 'Vendedor@2025';
GO

-- Crear el usuario dentro de la base de datos y asignarlo al rol db_datawriter
CREATE USER VendedorQhatu FOR LOGIN VendedorQhatu;
GO
EXEC sp_addrolemember 'db_datawriter', 'VendedorQhatu';
GO

-- b) Crear el inicio de sesión (Login) para el usuario de consultas
CREATE LOGIN ConsultaCliente WITH PASSWORD = 'Cliente@2025';
GO

-- Crear el usuario dentro de la base de datos y asignarlo al rol db_datareader
CREATE USER ConsultaCliente FOR LOGIN ConsultaCliente;
GO
EXEC sp_addrolemember 'db_datareader', 'ConsultaCliente';
GO

-- (Opcional) Verificar roles asignados a cada usuario
SELECT 
    dp.name AS Usuario,
    rp.name AS RolAsignado
FROM sys.database_role_members drm
JOIN sys.database_principals rp ON drm.role_principal_id = rp.principal_id
JOIN sys.database_principals dp ON drm.member_principal_id = dp.principal_id;
GO

--Ejercicio 5
USE QhatuPeru;
GO

-- a) Crear el inicio de sesión y usuario para el Gerente de Ventas (si no existe)
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'GerenteQhatu')
BEGIN
    CREATE LOGIN GerenteQhatu WITH PASSWORD = 'Gerente@2025';
END;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'GerenteQhatu')
BEGIN
    CREATE USER GerenteQhatu FOR LOGIN GerenteQhatu;
END;
GO

--b) Crear al inicio de sesion y usuario a Cajero (si no existe)

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'CajeroQhatu')
BEGIN
    CREATE USER CajeroQhatu FOR LOGIN CajeroQhatu;
END;
GO

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'CajeroQhatu')
BEGIN
    CREATE LOGIN CajeroQhatu WITH PASSWORD = 'Cajero@2025';
END;
GO

-- Otorgar permiso de solo lectura (SELECT) sobre la tabla Reportes
GRANT SELECT ON dbo.Reportes TO GerenteQhatu;
GO

-- b) Revocar permiso de actualización (UPDATE) a CajeroQhatu sobre la tabla Ventas
REVOKE UPDATE ON dbo.VENTAS FROM CajeroQhatu;
GO

-- (Opcional) Verificar permisos actuales de los usuarios
SELECT 
    dp.name AS Usuario,
    o.name AS Objeto,
    p.permission_name AS Permiso,
    p.state_desc AS Estado
FROM sys.database_permissions p
JOIN sys.database_principals dp ON p.grantee_principal_id = dp.principal_id
JOIN sys.objects o ON p.major_id = o.object_id
WHERE dp.name IN ('GerenteQhatu', 'CajeroQhatu');
GO

--Ejercicio 6
-- Identificar los 3 procesos con mayor consumo de CPU
SELECT TOP 3 
    r.session_id,
    r.status,
    r.cpu_time AS TiempoCPU_ms,
    r.total_elapsed_time / 1000 AS TiempoTotal_ms,
    s.login_name AS Usuario,
    DB_NAME(r.database_id) AS BaseDatos,
    SUBSTRING(t.text, (r.statement_start_offset/2)+1,
    ((CASE r.statement_end_offset
        WHEN -1 THEN DATALENGTH(t.text)
        ELSE r.statement_end_offset
    END - r.statement_start_offset)/2) + 1) AS ConsultaEjecutada
FROM sys.dm_exec_requests r
JOIN sys.dm_exec_sessions s ON r.session_id = s.session_id
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
ORDER BY r.cpu_time DESC;
-- Consultar sesiones bloqueadas y bloqueadoras
SELECT 
    bl.request_session_id AS SesionBloqueada,
    wt.blocking_session_id AS SesionBloqueadora,
    OBJECT_NAME(p.object_id) AS TablaAfectada,
    bl.resource_type AS TipoRecurso,
    bl.request_mode AS TipoBloqueo,
    wt.wait_type AS TipoEspera,
    wt.wait_duration_ms AS DuracionEspera_ms
FROM sys.dm_tran_locks bl
JOIN sys.dm_os_waiting_tasks wt ON bl.lock_owner_address = wt.resource_address
JOIN sys.partitions p ON p.hobt_id = bl.resource_associated_entity_id
ORDER BY wt.wait_duration_ms DESC;

--Ejercicio 7 
-- Creación de Job para respaldo diario de la base QhatuPeru
USE msdb;
GO

EXEC sp_add_job 
    @job_name = 'Backup_Diario_QhatuPeru',
    @description = 'Realiza un respaldo completo diario de la base QhatuPeru.';

-- Agregar paso al Job
EXEC sp_add_jobstep
    @job_name = 'Backup_Diario_QhatuPeru',
    @step_name = 'Paso_Respaldo',
    @subsystem = 'TSQL',
    @command = '
        BACKUP DATABASE QhatuPeru
        TO DISK = ''C:\Backups\QhatuPeru_Backup.bak''
        WITH INIT, NAME = ''Backup completo diario de QhatuPeru'',
        STATS = 10;',
    @database_name = 'master';

-- Crear programación diaria
EXEC sp_add_schedule
    @schedule_name = 'Horario_Diario_Backup',
    @freq_type = 4,              -- Diario
    @freq_interval = 1,          -- Cada 1 día
    @active_start_time = 020000; -- 2:00 AM

-- Asignar programación al Job
EXEC sp_attach_schedule 
    @job_name = 'Backup_Diario_QhatuPeru',
    @schedule_name = 'Horario_Diario_Backup';

-- Asociar el Job al servidor
EXEC sp_add_jobserver 
    @job_name = 'Backup_Diario_QhatuPeru';
GO
-- Creación de Job para limpieza semanal de sesiones antiguas
USE msdb;
GO

-- Crear el Job
EXEC sp_add_job 
    @job_name = 'Limpieza_Semanal_Sesiones_QhatuPeru',
    @description = 'Elimina registros de la tabla Sesiones con más de 15 días de antigüedad.';
GO

-- Agregar el paso de limpieza
EXEC sp_add_jobstep
    @job_name = 'Limpieza_Semanal_Sesiones_QhatuPeru',
    @step_name = 'Paso_Limpieza',
    @subsystem = 'TSQL',
    @command = '
        USE QhatuPeru;
        DELETE FROM dbo.Sesiones
        WHERE FechaSesion < DATEADD(DAY, -15, GETDATE());
    ',
    @database_name = 'QhatuPeru';
GO

-- Crear programación semanal (cada lunes, cada 1 semana, a las 3:00 AM)
EXEC sp_add_schedule
    @schedule_name = 'Horario_Semanal_Limpieza',
    @freq_type = 8,                -- Semanal
    @freq_interval = 1,            -- 1 = Lunes
    @freq_recurrence_factor = 1,   -- Cada 1 semana
    @active_start_time = 030000;   -- 03:00 AM
GO

-- Asociar el horario al Job
EXEC sp_attach_schedule 
    @job_name = 'Limpieza_Semanal_Sesiones_QhatuPeru',
    @schedule_name = 'Horario_Semanal_Limpieza';
GO

-- Asignar el Job al servidor local
EXEC sp_add_jobserver 
    @job_name = 'Limpieza_Semanal_Sesiones_QhatuPeru';
GO
-- Verificar el Job
SELECT name, enabled, date_created
FROM msdb.dbo.sysjobs
WHERE name = 'Limpieza_Semanal_Sesiones_QhatuPeru';

-- Verificar la programación
SELECT name, freq_type, freq_interval, freq_recurrence_factor, active_start_time
FROM msdb.dbo.sysschedules
WHERE name = 'Horario_Semanal_Limpieza';

--Ejercicio 8
--a) Agregar la columna “Prioridad”

USE QhatuPERU;
GO

ALTER TABLE PEDIDOS
ADD Prioridad INT NULL;
GO
--b) Eliminar la columna “EstadoEnvio”
USE QhatuPERU;
GO

ALTER TABLE PEDIDOS
DROP COLUMN EstadoEnvio;
GO
-- RESULTADOS 
USE QhatuPERU;
GO
SELECT name 
FROM sys.columns 
WHERE object_id = OBJECT_ID('dbo.PEDIDOS');

USE QhatuPERU;
GO
SELECT name 
FROM sys.columns 
WHERE object_id = OBJECT_ID('dbo.PEDIDOS')
  AND name = 'EstadoEnvio';

--Ejercicio 9
USE QhatuPERU;
GO

-- a) Crear la tabla de auditoría
IF OBJECT_ID('dbo.AuditoriaClientes', 'U') IS NOT NULL
    DROP TABLE dbo.AuditoriaClientes;
GO

CREATE TABLE dbo.AuditoriaClientes (
    IdAuditoria INT IDENTITY(1,1) PRIMARY KEY,
    IdCliente INT NOT NULL,
    NombreCliente NVARCHAR(100),
    DNI CHAR(8),
    Telefono CHAR(9),
    Direccion NVARCHAR(150),
    Correo NVARCHAR(100),
    FechaEliminacion DATETIME DEFAULT GETDATE(),
    UsuarioEliminacion SYSNAME
);
GO

-- b) Crear el trigger para registrar eliminaciones
IF OBJECT_ID('dbo.tr_AuditarEliminacionClientes', 'TR') IS NOT NULL
    DROP TRIGGER dbo.tr_AuditarEliminacionClientes;
GO

CREATE TRIGGER dbo.tr_AuditarEliminacionClientes
ON dbo.Clientes
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.AuditoriaClientes (
        IdCliente, NombreCliente, DNI, Telefono, Direccion, Correo, FechaEliminacion, UsuarioEliminacion
    )
    SELECT 
        d.IdCliente,
        d.NombreCliente,
        d.DNI,
        d.Telefono,
        d.Direccion,
        d.Correo,
        GETDATE(),
        SUSER_SNAME()
    FROM deleted d;
END;
GO

-- Prueba: eliminar un cliente de ejemplo
DELETE FROM dbo.Clientes WHERE IdCliente = 1;

-- Verificación: consultar la tabla de auditoría
SELECT * FROM dbo.AuditoriaClientes;
GO
--Ejercicio 10
--si quieres hacerlo manual ejecuta lo siguiente
USE master;
GO

-- Asegúrate de que la carpeta exista
EXEC xp_create_subdir 'C:\Backups';
GO

-- Crear respaldo inmediato
BACKUP DATABASE QhatuPeru
TO DISK = 'C:\Backups\QhatuPeru_Backup.bak'
WITH INIT, FORMAT, NAME = 'Backup manual de QhatuPeru';
GO
--luego ejecuta lo siguiente
--a) Simulación del incidente (eliminación total de CLIENTES)

USE QhatuPERU;
GO

-- Mostrar registros actuales
SELECT TOP 10 * FROM CLIENTES;

-- Simular el error humano: eliminación de todos los registros
DELETE FROM CLIENTES;
GO

-- Verificar que se eliminaron los datos
SELECT COUNT(*) AS RegistrosRestantes FROM CLIENTES;
GO

--b) Restauración desde el respaldo más reciente

USE master;
GO

-- Crear carpeta de respaldo si no existe
EXEC xp_create_subdir 'C:\Users\Public\Documents\';
GO

-- Crear respaldo manual previo (si no existía)
BACKUP DATABASE QhatuPERU
TO DISK = 'C:\Users\Public\Documents\QhatuPERU.bak'
WITH INIT, FORMAT, NAME = 'Backup manual de QhatuPERU', STATS = 10;
GO

-- Forzar modo de usuario único para restaurar
ALTER DATABASE QhatuPERU SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- Restaurar la base de datos desde el archivo de respaldo
RESTORE DATABASE QhatuPERU
FROM DISK = 'C:\Users\Public\Documents\QhatuPERU.bak'
WITH REPLACE, RECOVERY, STATS = 5;
GO

-- Regresar la base a modo multiusuario
ALTER DATABASE QhatuPERU SET MULTI_USER;
GO

--Verificación de la restauración

USE QhatuPERU;
GO

-- Mostrar los primeros registros restaurados
SELECT TOP 10 * FROM CLIENTES;

-- Contar total de registros restaurados
SELECT COUNT(*) AS RegistrosRestaurados FROM CLIENTES;
GO

