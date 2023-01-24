class  Employee{
    constructor(EmployeeID,Username,PasswordHash,PasswordSalt,AdminAccess, FirmId) {
      this.EmployeeID = EmployeeID;
      this.Username = Username;
      this.PasswordHash = PasswordHash;
      this.PasswordSalt = PasswordSalt;
      this.AdminAccess = AdminAccess;
      this.FirmId = FirmId;
    }
  }
  
  module.exports = Employee;