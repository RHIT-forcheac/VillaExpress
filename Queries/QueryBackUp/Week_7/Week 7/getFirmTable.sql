Use VillaExpress
Go

Create procedure getFirmTable
	@FirmID int
As
IF Not Exists(Select * From Firm Where FirmID = @FirmID)
BEGIN 
	RAISERROR('Firm does not exist', 14, 1)
	RETURN 1
END

Select FirmID, CompanyName, [Address]
From Firm
Where FirmID = @FirmID