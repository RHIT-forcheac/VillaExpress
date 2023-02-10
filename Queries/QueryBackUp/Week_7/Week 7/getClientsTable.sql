Use VillaExpress
Go

Create procedure getClientTable 
	@ClientID int
AS

IF Not Exists(Select * From Client Where ClientID = @ClientID)
BEGIN 
	RAISERROR('Client does not exist', 14, 1)
	RETURN 1
END

Select FName, LName, PhoneNumber, [Address], Email, Active, FirmID
From Client
	Join Person on Person.ID = Client.ClientID
Where ClientID = @ClientID