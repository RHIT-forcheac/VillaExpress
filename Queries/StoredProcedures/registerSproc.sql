Use VillaExpress
go
Create Procedure registerUser
(@employeeID int, @username varchar(20), @passwordSalt varchar(60), @passwordHash varchar(60))
AS
Begin
	if (@username IS null OR @passwordHash IS null)
	begin
		Raiserror('Null values not allowed', 14, 1)
		Return 1
	end
	if (exists (Select * from Employee where Username = @username))
	BEGIN
		Raiserror('There is already an account with the given username', 14, 2)
		Return 2
	END
	if (not exists (Select * from Person where ID = @employeeID))
	BEGIN
		Raiserror('There is not a person in the system with the fiven ID', 14, 3)
		Return 3
	END
	INSERT INTO Employee(EmployeeID, Username, PasswordSalt, PasswordHash)
	VALUES (@employeeID, @username, @passwordSalt, @passwordHash)
	Return 0
End