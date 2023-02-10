Use VillaExpress
Go

Create Table Firm(
	FirmID int Identity(1,1) PRIMARY KEY,
	CompanyName varchar(30),
	[Address] varchar(300)
)

Create Table Person(
	ID int Identity(1,1) PRIMARY KEY,
	[Name] varchar(30),
	DateOfBirth Date
)

Create Table Client(
	ClientID int REFERENCES Person(ID) PRIMARY KEY,
	PhoneNumber int NOT NULL,
	[Address] varchar(300),
	Email varchar(30),
	State char(2),
	FirmID int REFERENCES Firm(FirmID)
)

Create Table Employee(
	EmployeeID int REFERENCES Person(ID) PRIMARY KEY,
	Username varchar(30) NOT NULL UNIQUE,
	[Password] varchar(30) NOT NULL DEFAULT 'password',  
	AdminAccess int DEFAULT 0 ,
	AssociatedFirmID int NULL REFERENCES Firm(FirmID)
)

Create Table Listing(
	ListingID int Identity(1,1) PRIMARY KEY,
	EmployeeAssignDate Date NOT NULL ,
	EmployeeID int REFERENCES Employee(EmployeeID),
	CloseDate Date NULL Check (CloseDate > PostDate),
	PostDate Date NOT NULL,
	[Address] varchar(300) NOT NULL,
	[State] char(2) NOT NULL
)

Create Table Offer(
	OfferID int Identity(1,1) PRIMARY KEY,
	Price Money NOT NULL,
	Listing int REFERENCES Listing(ListingID),
	Client int REFERENCES Client(ClientID)
)

Create TABLE Represents(
	Client int REFERENCES Client(ClientID),
	Employee int REFERENCES Employee(EmployeeID),
	PRIMARY KEY (Client, Employee)
)



