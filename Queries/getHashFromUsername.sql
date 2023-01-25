Use VillaExpress
go
Create Procedure getHashFromUsername
(@username varchar(20), @result varchar(60) OUTPUT)
AS
Begin
	if (@username IS null)
	begin
		Raiserror('Username cannot be null', 14, 1)
		Return 1
	end
	if (not exists (Select * from Employee where Username = @username))
	BEGIN
		Raiserror('There is no employee with the matching username', 14, 2)
		Return 2
	END
	SET @result = (
	Select passwordHash
	From Employee
	Where Username = @username
	)
	Return 0
End