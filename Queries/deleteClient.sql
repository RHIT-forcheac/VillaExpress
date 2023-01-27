use VillaExpress
go
Create Procedure deleteClient 
(@clientID int)
As
BEGIN

	if (@clientID IS NULL)
	BEGIN 
		Raiserror('clientID can not be null', 14, 1)
		Return 1
	END

	if (not exists (select ClientID from Client where ClientID = @clientID))
	BEGIN 
		Raiserror('The client does not exist', 14, 2)
		Return 2
	END

	DELETE FROM Client WHERE @clientID = ClientID
END