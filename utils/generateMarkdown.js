// Function that returns a license badge based on which license is passed in
const renderLicenseBadge = (license) => {
  const link = renderLicenseLink(license);
  const badge = "![license](" + link + ")";
  return badge;
};

// Function that returns the license link
const renderLicenseLink = (license) => {
  let licenseString;
  license.forEach((element) => {
    licenseString ? (licenseString += "/") : (licenseString = "");
    licenseString += element;
  });

  // Regex to replace all values in the string
  licenseString = licenseString.replace(/-/g, "--");
  licenseString = licenseString.replace(/ /g, "--");

  const link =
    "https://img.shields.io/badge/license-" +
    licenseString +
    "-blue?style=plastic";
  return link;
};

// Function that returns the license section of README
const renderLicenseSection = (license) => {
  const badge = renderLicenseBadge(license);
  const section = `${badge}


`;
  return section;
};

const generateTitle = (data) => {
  const text = `# ${data.title}

`;
  return text;
};

const makeFirstCharacterUpperCase = (word) => {
  const firstChar = word.charAt(0).toUpperCase();

  word = firstChar + word.substring(1);
  return word;
};

const formatSectionName = (string) => {
  let resultString = "";
  let arrayOfStrings = string.split(" ");

  arrayOfStrings.forEach(
    (item, index) => (arrayOfStrings[index] = makeFirstCharacterUpperCase(item))
  );

  for (let i = 0; i < arrayOfStrings.length; i++) {
    resultString += arrayOfStrings[i] + " ";
  }
  // To remove the last extra space
  resultString = resultString.substring(0, resultString.length - 1);
  return resultString;
};

const generateTableOfContents = (data) => {
  let text = `## Table of Contents

`;

  data.forEach((element) => {
    // Check if a user provided any input for a section
    if (element && element.length > 0) {
      element = formatSectionName(element);
      // Add a link
      const link = element.replace(/ /g, "-").toLowerCase();
      text += `* [${element}](#${link})
`;
    }
  });

  text += `
`;
  return text;
};

const generateMarkForSingleSection = (name, content) => {
  name = formatSectionName(name);
  const text = `## ${name}

${content}


`;
  return text;
};

const generateMarkForDescription = (description) => {
  description = formatSectionName(description);
  const text = `## Description
  
${description}
  
  
`;
  return text;
};

function generateOtherMarks(data) {
  let textDescription = "";
  let textTableOfContents = "";
  let textAfterTableOfContents = "";
  let finalText = "";

  try {
    textDescription += generateMarkForDescription(data.description);
    delete data.description;
    const content = Object.values(data);

    // Check if a user input any optional data
    if (
      content.some((element) => element !== undefined && element.length > 0)
    ) {
      const dataArray = Object.entries(data);
      let tableOfContentsSections = [];

      dataArray.forEach((element) => {
        // Check if a user provided any input for a section
        if (element[1] && element[1].length > 0) {
          // Add the element for the table of content
          tableOfContentsSections.push(element[0]);
          // Add the section to the README file
          textAfterTableOfContents += generateMarkForSingleSection(
            element[0],
            element[1]
          );
        }
      });

      // Create the table of contents in case when there are more than 2 additional sections only
      if (tableOfContentsSections.length > 2) {
        textTableOfContents = generateTableOfContents(tableOfContentsSections);
      }

      finalText = textTableOfContents + textAfterTableOfContents;
    }
    finalText = textDescription + finalText;
  } catch (error) {
    console.log("Error: ", error);
  }
  return finalText;
}

const generateQuestionsMarks = (username, email) => {
  const text = `## Questions

GitHub profile: https://github.com/${username}

In case of additional questions, please reach out to me at ${email}
`;
  return text;
};

// Function to generate markdown for README
const generateMarkdown = (data) => {
  const { gitHubUserName, email, ...restData } = data;

  let resultText = "";
  resultText += generateTitle(restData);
  delete restData.title;

  if (restData.license.length > 0) {
    resultText += renderLicenseSection(restData.license);
  }
  resultText += generateOtherMarks(restData);
  resultText += generateQuestionsMarks(gitHubUserName, email);

  return resultText;
};

module.exports = generateMarkdown;
