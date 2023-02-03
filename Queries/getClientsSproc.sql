use VillaExpress
go 
Create Procedure getClients
As 
Select ClientID, FName, LName, DateOfBirth, PhoneNumber, Address, Email, Active
From Client
JOIN Person on ClientID = ID