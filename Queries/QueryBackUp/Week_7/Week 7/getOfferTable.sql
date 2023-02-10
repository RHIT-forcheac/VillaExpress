Use VillaExpress
Go

Create procedure getOfferTable
	@OfferID int
As
IF Not Exists(Select * From Offer Where OfferID = @OfferID)
BEGIN 
	RAISERROR('offer does not exist', 14, 1)
	RETURN 1
END

Select Price, Listing, Client
From Offer
Where OfferID = @OfferID