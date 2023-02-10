Use VillaExpress
Go

Create procedure getClientOfEmployeeUser 
@username varchar(30),
@ID int output
As
IF Not Exists(Select * From Employee Where Username = @username)
BEGIN 
	RAISERROR('Employee does not exist', 14, 1)
	RETURN 1
END

Select EmployeeID = @ID FROM Employee Where Username = @username

Select ClientID, ClientFName, ClientLName
From representers 
Where EmployeeID = @ID