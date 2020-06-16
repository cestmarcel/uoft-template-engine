const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let ID = 1;

async function mainApp(){
    console.log(`[mainApp] is getting started!`);
    const team = [];

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
            validate: (input) => {if (input == '' || !input.includes("@") ) {return "Error: Please enter a valid email address"} return true}
        },
        {
            name: "officeNumber", 
            type: "input", 
            message: "What is the manager's office number?",
            validate: (input) => {if (input == '') {return "Error: Please enter a valid office number"} return true}
        },
        {
            name: "count", 
            type: "input", 
            message: "How many people are on their team?",
            validate: (input) => {if (input == '') {return "Error: Please enter a valid headcount"} return true}
        }
    ])

    // Creating manager object
    team.push(new Manager(managerData.name, ID++, managerData.email, managerData.officeNumber, managerData.count));

    for(let userCnt=1; userCnt<=managerData.count; userCnt++){
        const user = await inquirer.prompt([
            {
                name: "type", 
                type: "list", 
                message: `For person ${userCnt}/${managerData.count}, please choose the type of team member:`,
                choices: ["intern", "engineer"]
            }
        ]);

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
                    validate: (input) => {if (input == '' || !input.includes("@") ) {return "Error: Please enter a valid email address"} return true}
                },
                {
                    name: "github", 
                    type: "input", 
                    message: "What is the engineer's Github username?",
                    validate: (input) => {if (input == '') {return "Error: Please enter a valid github name"} return true}
                }
            ]);
            team.push(new Engineer(userData.name, ID++, userData.email, userData.github));
        } else {
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
                    validate: (input) => {if (input == '' || !input.includes("@") ) {return "Error: Please enter a valid email address"} return true}
                },
                {
                    name: "school", 
                    type: "input", 
                    message: "What is the intern's school?",
                    validate: (input) => {if (input == '') {return "Error: Please enter a school name"} return true}
                }
            ]);
            team.push(new Intern(userData.name, ID++, userData.email, userData.school));
        }
    }
    const html = render(team);

    fs.writeFileSync(outputPath, html);
    console.log(`Finished writing the file. It's accessible under: ${outputPath}`);
}
mainApp();
