// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

function generateTitle(data) {
  const text = `# ${data.title}

`;

  return text;

  // console.log(data);
}

function generateOtherMarks(data) {
  let text = "";
  try {
    data = Object.entries(data);
    // console.log("Test", data);
    data.forEach((element) => {
      // Check if a user provided any input for a section
      if (element[1]) {
        // Add the section to the README file
        text += `## ${element[0]}
${element[1]}

`;
      }
    });
  } catch (error) {
    console.log("Error: ", error);
  }

  return text;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let resultText = "";
  resultText += generateTitle(data);
  delete data.title;

  resultText += generateOtherMarks(data);
  console.log(resultText);

  return resultText;
}

module.exports = generateMarkdown;
