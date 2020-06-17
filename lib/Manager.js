// Importing employee class (manager inherits from this class)
const Employee = require("./Employee");
// Defining manager class
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email, "Manager");
        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
// Exporting manager class
module.exports = Manager;