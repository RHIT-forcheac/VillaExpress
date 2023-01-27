use VillaExpress
go
Create Procedure updateClient
(@clientID int, @fname varchar(30) = null, @lname varchar(30) = null, @dob date = null, @phoneNumber char(12) = null,
@address varchar(300) = null, @email varchar(30) = null, @active bit = null)
AS
BEGIN

	if (@clientID IS NULL)
	BEGIN
		Raiserror('ClientID can not be null', 14, 1)
		Return 1
	END

	if (not exists (Select ClientID From Client where ClientID = @clientID))
	BEGIN
		Raiserror('Client not found', 14, 2)
		Return 2
	END

	UPDATE Person
	SET FName = ISNULL(@fname, FName)
	  , LName = ISNULL(@lname, LName)
	  , DateOfBirth = ISNULL(@dob, DateOfBirth)
	WHERE ID = @clientID

	UPDATE Client
	SET PhoneNumber = ISNULL(@phoneNumber, PhoneNumber)
	  , Address = ISNULL(@address, Address)
	  , Email = ISNULL(@email, Email)
	  , Active = ISNULL(@active, Active)
	WHERE ClientID = @clientID
	Return 0
END