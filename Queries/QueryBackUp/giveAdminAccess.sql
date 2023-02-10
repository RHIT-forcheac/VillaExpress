Use VillaExpress
Go

CREATE PROCEDURE giveAdminAccess(@Username varchar(20))
As

IF (@username IS null)
BEGIN
	Raiserror('Username cannot be null', 14, 1)
	Return 1
END
IF (not exists (Select * from Employee where Username = @username))
BEGIN
	Raiserror('There is no employee with the matching username', 14, 2)
	Return 2
END

UPDATE Employee
Set AdminAccess = 1
Where Username = @Username

IF(Select AdminAccess FROM Employee WHERE Username = @Username ) = 1
BEGIN
Print('Admin access change success')
END

ELSE 
BEGIN
	RAISERROR('Admin access change failed',14,3)
	RETURN 3
END