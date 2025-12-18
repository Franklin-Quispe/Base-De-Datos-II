USE master;
GO
IF EXISTS(SELECT * FROM sys.databases WHERE name = 'QhatuPERU')
    DROP DATABASE QhatuPERU;
GO

CREATE DATABASE QhatuPERU
ON PRIMARY
(
    NAME = 'QhatuPERU_Primary',
    FILENAME = 'C:\SQLData\QhatuPERU_Primary.mdf',
    SIZE = 20MB,
    MAXSIZE = 200MB,
    FILEGROWTH = 10MB
)
LOG ON
(
    NAME = 'QhatuPERU_Log',
    FILENAME = 'C:\SQLLogs\QhatuPERU_Log.ldf',
    SIZE = 10MB,
    FILEGROWTH = 5MB
);
GO



