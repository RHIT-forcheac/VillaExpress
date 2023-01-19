--INSERT INTO Person(Name, DateOfBirth)
--values('andrew', '01/01/2003')

EXEC registerUser 1, 'Andrew', 'salt', '123'

EXEC logInUser 'Andrew', '123'