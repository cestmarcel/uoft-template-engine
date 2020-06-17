// Importing employee class (engineer inherits from this class)
const Employee = require("./Employee");
// Defining engineer class
class Engineer extends Employee {
    constructor (name, id, email, github){
        super(name, id, email, "Engineer");
        this.github = github;
    }
    getGithub(){
        return this.github;
    }
}
// Exporting engineer class
module.exports = Engineer;