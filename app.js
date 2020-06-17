// Required modules for mainApp
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Setting employee ID to 1 to start headcount
let ID = 1;

// mainApp function to create team object for rendering and writing
async function mainApp(){
    console.log(`[mainApp] is getting started!`);
    const team = [];
    // Function that validates email input using a regular expression
    function validateEmail(email){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase()) ? true : "Error: Please enter a valid email address";
    }
    // Function that validates manager's phone number using a regular expression
    function validatePhoneNumber(phoneNumber){
        const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
        return regex.test(phoneNumber) ? true : "Error: Please enter a valid phone number";
    }
    // Creating manager object
    const managerData = await inquirer.prompt([
        {
            name: "name", 
            type: "input", 
            message: "What is the manager's name?",
            validate: (input) => {if (input == '') {return "Error: Please enter a valid name"} return true}
        },
        {
            name: "email", 
            type: "input", 
            message: "What is their email?",
            validate: validateEmail
        },
        {
            name: "officeNumber", 
            type: "input", 
            message: "What is the manager's office number?",
            validate: validatePhoneNumber
        },
        {
            name: "count", 
            type: "input", 
            message: "How many people are on their team?",
            validate: (input) => {if (input == '') {return "Error: Please enter a valid headcount"} return true}
        }
    ])
    // Pushing manager object to team object
    team.push(new Manager(managerData.name, ID++, managerData.email, managerData.officeNumber, managerData.count));
    // Creating employee object for each team member    
    for(let userCnt=1; userCnt<=managerData.count; userCnt++){
        const user = await inquirer.prompt([
            {
                name: "type", 
                type: "list", 
                message: `For person ${userCnt}/${managerData.count}, please choose the type of team member:`,
                choices: ["intern", "engineer"]
            }
        ]);
        // Creating engineer object
        if(user.type == "engineer"){
            const userData = await inquirer.prompt([
                {
                    name: "name", 
                    type: "input", 
                    message: "What is the engineer's name?", 
                    validate: (input) => {if (input == '') {return "Error: Please enter a valid name"} return true}
                },
                {
                    name: "email", 
                    type: "input", 
                    message: "What is the engineer's email?",
                    validate: validateEmail
                },
                {
                    name: "github", 
                    type: "input", 
                    message: "What is the engineer's Github username?",
                    validate: (input) => {if (input == '') {return "Error: Please enter a valid github name"} return true}
                }
            ]);
            // Pushing engineer to team object
            team.push(new Engineer(userData.name, ID++, userData.email, userData.github));
        } else {
            // Creating intern object
            const userData = await inquirer.prompt([
                {
                    name: "name", 
                    type: "input", 
                    message: "What is the intern's name?",
                    validate: (input) => {if (input == '') {return "Error: Please enter a valid name"} return true}
                },
                {
                    name: "email", 
                    type: "input", 
                    message: "What is the intern's email?",
                    validate: validateEmail
                },
                {
                    name: "school", 
                    type: "input", 
                    message: "What is the intern's school?",
                    validate: (input) => {if (input == '') {return "Error: Please enter a school name"} return true}
                }
            ]);
            // Pushing intern to team object
            team.push(new Intern(userData.name, ID++, userData.email, userData.school));
        }
    }
    // Rendering the team object in the html file
    const html = render(team);

    fs.writeFileSync(outputPath, html);
    console.log(`Finished writing the file. It's accessible under: ${outputPath}`);
}
mainApp();
