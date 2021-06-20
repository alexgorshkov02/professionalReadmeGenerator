// Packages
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Array of questions for user input
const questions = [
  {
    type: "input",
    name: "gitHubUsername",
    message: "What is your GitHub username? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your GitHub username!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is your email username? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        nameInput = "";
        console.log("Please enter your email username!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "title",
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
  {
    type: "input",
    name: "Description",
    message: "Please provide a description for your project",
    default: "No description",
  },
  {
    type: "input",
    name: "Installation instructions",
    message: "Please provide installation instructions for your project",
  },
  {
    type: "input",
    name: "Usage information",
    message: "Please provide usage information for your project",
  },
  {
    type: "checkbox",
    name: "License",
    message: "Please choose a license required for your project",
    choices: ["MIT", "ISC", "Apache 2", "CC-BY-3.0", "CC-BY-4.0"],
  },
  {
    type: "input",
    name: "Contribution guidelines",
    message: "Please provide contribution guidelines for your project",
  },
  {
    type: "input",
    name: "Test instructions",
    message: "Please provide test instructions for your project",
  },
];

const promptUser = () => {
  return inquirer
    .prompt(questions)
    .then((answers) => {
      return answers;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
// Function to initialize app
async function init() {
  try {
    let data = await promptUser();
    console.log(data);

    data = generateMarkdown(data);
    // console.log(data);
    writeToFile("test.md", data);
  } catch (error) {
    console.log(error);
  }
}

// Function call to initialize app
init();
