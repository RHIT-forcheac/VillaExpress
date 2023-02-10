Use VillaExpress
Go

Create procedure getActiveListingsOfFirm @FirmID int
As
IF Not Exists(Select * From Firm Where FirmID = @FirmID)
BEGIN 
	RAISERROR('Firm does not exist', 14, 1)
	RETURN 1
END

Select ListingID, EmployeeAssignDate, Listing.EmployeeID, 
	FName, LName, CloseDate, PostDate, [Address]
From Listing
	Join Employee on Listing.EmployeeID = Employee.EmployeeID
	Join Person on Person.ID = Employee.EmployeeID
Where State = 1 
	and CloseDate = null 
	and AssociatedFirmID = @FirmID