Use VillaExpress
Go
Create Procedure GenerateStrongPassword
AS
DECLARE @char CHAR = ''
DECLARE @charI INT = 0
DECLARE @password VARCHAR(100) = ''
DECLARE @len INT = 12 -- Length of Password
WHILE @len > 0
BEGIN
SET @charI = ROUND(RAND()*100,0)
SET @char = CHAR(@charI)
IF @charI > 48 AND @charI < 122
BEGIN
SET @password += @char
SET @len = @len - 1
END
END
SELECT @password [PassWord]