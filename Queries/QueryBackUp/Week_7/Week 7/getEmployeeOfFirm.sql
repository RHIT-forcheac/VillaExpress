Use VillaExpress
Go

Create procedure getEmployeeOfFirm 
	@FirmID int = null
As
IF Not Exists(Select * From Firm Where FirmID = @FirmID)
BEGIN 
	RAISERROR('Firm does not exist', 14, 1)
	RETURN 1
END

Select EmployeeID, FName, LName
From Employee
	Join Person on Person.ID = Employee.EmployeeID
Where AssociatedFirmID = @FirmID