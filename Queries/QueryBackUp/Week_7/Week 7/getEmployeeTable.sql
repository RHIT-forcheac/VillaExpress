Use VillaExpress
Go

Create procedure getEmployeeTable
	@EmployeeID int
As
IF Not Exists(Select * From Employee Where EmployeeID = @EmployeeID)
BEGIN 
	RAISERROR('Employee does not exist', 14, 1)
	RETURN 1
END

Select FName, LName, Username, PasswordHash, PasswordSalt, AdminAccess, AssociatedFirmID
From Employee 
	Join Person on Person.ID = Employee.EmployeeID
Where EmployeeID = @EmployeeID