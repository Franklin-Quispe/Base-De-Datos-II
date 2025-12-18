--1
EXEC sp_helpdb 'QhatuPeru';
--2
SELECT name, state_desc
FROM sys.databases
WHERE name = 'QhatuPeru';
--3
SELECT name AS Archivo, physical_name AS Ruta, type_desc AS Tipo
FROM sys.master_files
WHERE database_id = DB_ID('QhatuPERU');