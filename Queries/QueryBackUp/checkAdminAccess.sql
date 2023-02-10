Use VillaExpress
Go

CREATE PROCEDURE checkAdminAccess(@Username varchar(20))
AS

IF (@username IS null)
BEGIN
	Raiserror('Username cannot be null', 14, 2)
	Return 2
END
IF (not exists (Select * from Employee where Username = @username))
BEGIN
	Raiserror('There is no employee with the matching username', 14, 3)
	Return 3
END
IF(Select AdminAccess FROM Employee WHERE Username = @Username ) = 1
BEGIN
Print('Employee has admin access')
return 0
END
ELSE
BEGIN
Print('Employee does not have admin access')
return 1
END