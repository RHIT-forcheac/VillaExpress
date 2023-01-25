Alter Procedure addClient
(@fname varchar(30), @lname varchar(30), @dob date, @phoneNumber char(12), @address varchar(300), @email varchar(30), @active bit)
As
BEGIN
if (@phoneNumber IS null OR @address IS null OR @email IS null or @active IS NULL OR @fname IS NULL OR @lname IS NULL OR @dob IS NULL)
	begin
		Raiserror('Null values are not allowed', 14, 1)
		Return 1
	end
if (exists (Select * from Client where PhoneNumber = @phoneNumber AND Address = @address AND Email = @email))
	BEGIN
		Raiserror('There is already a client with the inputed data', 14, 2)
		Return 2
	END

if (not exists (Select * from Person where @fname = FName AND @lname = LName AND @dob = DateOfBirth))
BEGIN
	execute addPerson @fname, @lname, @dob
END

DECLARE @personID int
set @personID = (Select id From Person Where @fname = FName AND @lname = LName AND @dob = DateOfBirth)

if (exists (Select * from Client where @personID = ClientID))
	BEGIN
		Raiserror('This person already has a client profile', 14, 3)
		Return 3
	END

INSERT INTO Client (ClientID, PhoneNumber, Address, Email, Active)
VALUES (@personID, @phoneNumber, @address, @email, @active);
Return 0
END