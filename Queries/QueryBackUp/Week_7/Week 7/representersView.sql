Use VillaExpress
Go

Create View representers
As
Select Represents.Client AS ClientID, p1.FName As ClientFName,
	p1.LName AS ClientLName, Employee AS EmployeeID,
	p2.FName As EmployeeFName, p2.LName As EmployeeLName
From Represents
	Join Person p1 on Client = p1.ID
	Join Person p2 on Employee = p2.ID
