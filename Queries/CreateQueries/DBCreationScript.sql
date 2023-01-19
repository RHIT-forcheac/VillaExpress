USE master;
GO
CREATE DATABASE VillaExpress
ON   
Primary(NAME = VillaExpress,  
    FILENAME = 'D:\Database\MSSQL15.MSSQLSERVER\MSSQL\DATA\VillaExpressdat.mdf',  
    SIZE = 6MB,  
    MAXSIZE = 30MB,  
    FILEGROWTH = 12%)  
LOG ON  
(NAME = [VillaExpress_log],  
    FILENAME = 'D:\Database\MSSQL15.MSSQLSERVER\MSSQL\DATA\VillaExpresslog.ldf',  
    SIZE = 3MB,  
    MAXSIZE = 22MB,  
    FILEGROWTH = 17%);  
GO  