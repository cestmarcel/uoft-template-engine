<img src="https://img.shields.io/badge/cestmarcel-TemplateEngine-navy">

<img src="https://img.shields.io/badge/Version-1.0-green">

# Command line template engine—Team overview

## Description

This is a simple command line generator to generate a team overview based on user input. The input is given through the command line.

## Table of contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Credits](#Credits)

## Installation

To get started with the application, simply clone the project and run "npm install" on your command line after navigating to your repository. Then, all you have to do is run "node app.js" and you will be prompted for some input around your team members.

## Usage

You can use this application to quickly create an html page displaying key information about your team and team members. You can choose to display one manager and any number of engineers or interns. For managers, the page will display the name, title, email address, and phone number. For engineers, the page will display the name, title, email, and github username. For interns, the page will display the name, title, email, and school they're attending.

The application validates the user's responses. No prompt will accept an empty field. The prompt for the email address requires an "@" to be included in the email address.

Here's an example for a team page as an output:
![Screenshot of the team page](https://github.com/cestmarcel/uoft-template-engine/blob/master/assets/screenshots/team.png)

## License

No license

## Contributing

If you want to contribute to this project, please reach out to me here on Github!

## Tests

You can run tests for this application by running "npm test" in your command line. Tests will run for the different types of employee classes we use to create employee objects with this application. 

They'll test the overall employee class for:
- can create and get name
- can create and get id
- can create and get email address
- return the correct role "employee"

They'll test the manager, intern, and engineer classes for:
- can create and get phone number for manager
- can create and get school name for intern
- can create and get github name for engineer
- returns the correct roles

You can run the tests by doing a "npm test" command in your command line.

Ideally, the tests pass like so:
![Screenshot of the tests](https://github.com/cestmarcel/uoft-template-engine/blob/master/assets/screenshots/tests.png)

## Credits

- This application uses the inquirer module for Node.js. Documentation is available under https://www.npmjs.com/package/inquirer.
- The application also uses the jest module for Node.js to perform the Javascript tests. Documentation is available under: https://www.npmjs.com/package/jest.

