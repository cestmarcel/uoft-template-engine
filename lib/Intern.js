// Importing employee class (intern inherits from this class)
const Employee = require("./Employee");
// Defining intern class
class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email, "Intern");
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
}
// Exporting intern class
module.exports = Intern;