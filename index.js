// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [
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
    }
  },
  {
    type: "input",
    name: "Description",
    message: "Please provide a description for your project",
    default: "No description"
  },
  {
    type: "input",
    name: "Installation instructions",
    message: "Please provide installation instructions for your project"
  },
  {
    type: "input",
    name: "Usage information",
    message: "Please provide usage information for your project"
  },
  {
    type: "input",
    name: "Contribution guidelines",
    message: "Please provide contribution guidelines for your project"
  },
  {
    type: "input",
    name: "Test instructions",
    message: "Please provide test instructions for your project"
  }

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

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
// TODO: Create a function to initialize app
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
