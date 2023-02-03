use VillaExpress
go
CREATE VIEW UserClientView AS
SELECT ID as #, FNAME as [First], LNAME as [Last], DateOfBirth as DOB,
	PhoneNumber as [Phone#], Address, Email, Active
FROM Client
Join Person on ID = ClientID
