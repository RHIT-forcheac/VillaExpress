use VillaExpress
go
create procedure addPerson
(@fname varchar(30), @lname varchar(30), @dob date)
As
BEGIN

if (@fname IS null OR @lname IS null OR @dob IS null)
	begin
		Raiserror('First Name, Last Name, and DOB can not be null', 14, 1)
		Return 1
	end

if (exists (Select * from Person where FName = @fname AND LName = @lname AND DateOfBirth = @dob))
	BEGIN
		Raiserror('There is already a person with this Name and Date of Birth', 14, 2)
		Return 2
	END

INSERT INTO Person (FName, LName, DateOfBirth)
VALUES (@fname, @lname, @dob);
Return 0
END