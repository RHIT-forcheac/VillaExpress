Use VillaExpress
Go

Alter procedure getActiveClientsOfFirm 
	@FirmID int
As
IF Not Exists(Select * From Firm Where FirmID = @FirmID)
BEGIN 
	RAISERROR('Firm does not exist', 14, 1)
	RETURN 1
END

Select ClientID, FName, LName, PhoneNumber, [Address], Email, Active, FirmID
From Client
	Join Person on Person.ID = Client.ClientID
Where FirmID = @FirmID and Active = 1