// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "What is your project title? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your project title!");
        return false;
      }
    },
  },
];

const promptUser = () => {
  return inquirer
    .prompt(questions)
    .then((answers) => {
      return `# ${answers.projectTitle}`;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
// TODO: Create a function to initialize app
function init() {
    promptUser().then(data => writeToFile("test.md", data));

}

// Function call to initialize app
init();
