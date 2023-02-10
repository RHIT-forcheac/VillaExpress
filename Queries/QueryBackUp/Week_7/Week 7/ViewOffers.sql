Use VillaExpress
Go

Create View Offers
As
Select OfferID, Price, ListingID, Employee.EmployeeID,
	p1.FName As EmployeeFName, p1.LName AS EmployeeLName,
	ClientID, p2.FName AS ClientFName, p2.LName As ClientLName
From Offer
	Join Listing ON Offer.Listing = Listing.ListingID
	Join Employee ON Listing.EmployeeID = Employee.EmployeeID
	Join Person p1 ON Employee.EmployeeID = p1.ID
	Join Client On Offer.Client = Client.ClientID
	Join Person p2 ON Client.ClientID = p2.ID
