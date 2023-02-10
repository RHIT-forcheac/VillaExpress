Use VillaExpress
Go

Create procedure getListingTable
	@ListingID int
As
IF Not Exists(Select * From Listing Where ListingID = @ListingID)
BEGIN 
	RAISERROR('Listing does not exist', 14, 1)
	RETURN 1
END

Select EmployeeID, EmployeeAssignDate, EmployeeID,
	CloseDate, PostDate, [Address], [State]
From Listing
Where ListingID = @ListingID