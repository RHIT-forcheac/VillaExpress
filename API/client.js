class  Client{
    constructor(ClientID,PhoneNumber,Address,Email,Active, FirmId) {
      this.ClientID = ClientID;
      this.PhoneNumber = PhoneNumber;
      this.Address = Address;
      this.Email = Email;
      this.Active = Active;
      this.FirmId = FirmId;
    }
  }
  
  module.exports = Client;