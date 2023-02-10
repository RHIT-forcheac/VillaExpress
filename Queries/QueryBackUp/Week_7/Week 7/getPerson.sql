Use VillaExpress
Go

Create procedure getPerson @ID int
As
IF Not Exists(Select * From Person Where ID = @ID)
BEGIN 
	RAISERROR('Person does not exist', 14, 1)
	RETURN 1
END
Select ID, FName, LName, DateOfBirth
From Person
Where ID = @ID