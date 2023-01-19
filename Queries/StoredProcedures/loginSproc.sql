Use VillaExpress
go
Create Procedure logInUser
(@username varchar(60), @passwordHash varchar(60))
AS
Begin
	if (@username IS null OR @passwordHash IS null)
	begin
		Raiserror('Null values not allowed', 14, 1)
		Return 1
	end
	if (not exists (Select * from Employee where Username = @username))
	BEGIN
		Raiserror('No account found with given username', 14, 1)
		Return 2
	END
	if (not exists (Select * from Employee where Username = @username AND PasswordHash = @passwordHash))
	BEGIN
		Raiserror('Password is incorrect', 14, 3)
		Return 3
	END	
	Return 0
End