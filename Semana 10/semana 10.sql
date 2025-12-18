CREATE LOGIN FranklinLogin WITH PASSWORD = 'Fq$2025';

USE QhatuPERU;
CREATE USER FranklinUser FOR LOGIN FranklinLogin;

EXEC sp_addrolemember 'db_datareader', 'FranklinUser'; -- Leer datos
EXEC sp_addrolemember 'db_datawriter', 'FranklinUser'; -- Modificar datos

GRANT SELECT, INSERT ON LINEA TO FranklinUser;
GRANT SELECT ON PROVEEDOR TO FranklinUser;
DENY DELETE ON PROVEEDOR TO FranklinUser;

REVOKE INSERT ON LINEA FROM FranklinUser;

EXEC sp_who2;

SELECT session_id, status, command, start_time, cpu_time, total_elapsed_time
FROM sys.dm_exec_requests;

--si existe un job existente 
USE msdb;
GO
EXEC sp_delete_job @job_name = 'Backup_QhatuPERU';
GO

USE master;
GO
SELECT 
    DB_NAME(st.dbid) AS BaseDeDatos,
    SUM(qs.total_worker_time) / 1000 AS TiempoCPU_ms,
    COUNT(*) AS CantidadConsultas
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
GROUP BY DB_NAME(st.dbid)
ORDER BY TiempoCPU_ms DESC;
GO
USE msdb;
GO

-- 1️ Crear el trabajo (Job)
EXEC sp_add_job 
    @job_name = 'Backup_QhatuPERU', 
    @enabled = 1, 
    @description = 'Respaldo automático diario de la base QhatuPERU';
GO

-- 2️ Agregar un paso al trabajo (Job Step)
EXEC sp_add_jobstep
    @job_name = 'Backup_QhatuPERU',
    @step_name = 'Respaldar_BD',
    @subsystem = 'TSQL',
    @command = 'BACKUP DATABASE QhatuPERU 
                TO DISK = ''C:\Backups\QhatuPERU.bak'' 
                WITH INIT, STATS = 10;',
    @retry_attempts = 3,
    @retry_interval = 5;
GO

-- 3️ Crear un horario diario a las 11:00 PM
EXEC sp_add_schedule
    @schedule_name = 'Diario',
    @freq_type = 4,          -- Diario
    @freq_interval = 1,      -- Cada 1 día
    @active_start_time = 230000; -- 23:00 horas (11:00 PM)
GO

-- 4️ Vincular el horario al trabajo
EXEC sp_attach_schedule 
    @job_name = 'Backup_QhatuPERU', 
    @schedule_name = 'Diario';
GO

-- 5️ Asignar el trabajo al servidor actual
EXEC sp_add_jobserver 
    @job_name = 'Backup_QhatuPERU';
GO

SELECT name, enabled, date_created
FROM msdb.dbo.sysjobs;
GO

EXEC sp_help_job @job_name = 'Backup_QhatuPERU';
GO

EXEC msdb.dbo.sp_start_job @job_name = 'Backup_QhatuPERU';
GO

EXEC msdb.dbo.sp_help_jobhistory @job_name = 'Backup_QhatuPERU';
GO


