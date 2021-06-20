// Packages
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Function to validate an email
const validateEmail = (emailInput) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(emailInput).toLowerCase());
};

// Array of questions for user input
const questions = [
  {
    type: "input",
    name: "gitHubUserName",
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
    message: "What is your email? (Required)",
    validate: (emailInput) => {
      if (validateEmail(emailInput)) {
        return true;
      } else {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log("Please enter your valid email!");
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
    name: "description",
    message: "Please provide a description for your project",
    default: "No description",
  },
  {
    type: "input",
    name: "installation instructions",
    message: "Please provide installation instructions for your project",
  },
  {
    type: "input",
    name: "usage information",
    message: "Please provide usage information for your project",
  },
  {
    type: "checkbox",
    name: "license",
    message: "Please choose a license required for your project",
    choices: ["ISC", "MIT", "GPLv2", "Apache 2", "BSD 3-clause", "CC-BY-4.0"],
  },
  {
    type: "input",
    name: "contribution guidelines",
    message: "Please provide contribution guidelines for your project",
  },
  {
    type: "input",
    name: "test instructions",
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
        console.log("Error in the current environment: ", error);
      } else {
        console.log("Error: ", error);
      }
    });
};

// Function to write README file
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
// Function to initialize app
const init = async () => {
  try {
    let data = await promptUser();
    data = generateMarkdown(data);

    writeToFile("./dist/README.md", data);
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Function call to initialize app
init();
