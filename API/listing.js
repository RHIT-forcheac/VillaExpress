class Listing {
    constructor(ListingID, EmployeeAssignDate, EmployeeID, CloseDate, PostDate, Address, State) {
        this.ListingID = ListingID;
        this.EmployeeAssignDate = EmployeeAssignDate;
        this.EmployeeID = EmployeeID;
        this.CloseDate = CloseDate;
        this.PostDate = PostDate;
        this.Address = Address;
        this.State = State;
    }
}

module.exports = Listing;