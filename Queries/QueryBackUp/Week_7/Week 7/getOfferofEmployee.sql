Use VillaExpress
Go

Create procedure getOfferofEmployee
	@EmployeeID int
As
IF Not Exists(Select * From Employee Where EmployeeID = @EmployeeID)
BEGIN 
	RAISERROR('Employee does not exist', 14, 1)
	RETURN 1
END

Select OfferID, Price, ListingID, ClientFName, ClientLName
From Offers
Where EmployeeID = @EmployeeID
Order by price asc 