// Function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let link = renderLicenseLink(license);
  // ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
  let badge = "![license](" + link + ")";

  return badge;
}
// Function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  console.log("Test", license);
  // license11 = Object.entries(license);
  // https://img.shields.io/badge/license-MIT/awd-blue?style=plastic
  // let licenseArray = license11.split(",");
  let licenseString;
  license.forEach((element) => {
    licenseString ? (licenseString += "/") : (licenseString = "");
    licenseString += element;
  });
  // console.log("TestBefore:", licenseString);
  // licenseString.replace('-', '--');
  // console.log("TestAfter:", licenseString.replace(/-/g, '--'));

  licenseString = licenseString.replace(/-/g, "--");
  licenseString = licenseString.replace(/ /g, "--");

  let link =
    "https://img.shields.io/badge/license-" +
    licenseString +
    "-blue?style=plastic";

  return link;
}

// Function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let badge = renderLicenseBadge(license);
  let section = `${badge}


`;

  return section;
}

function generateTitle(data) {
  const text = `# ${data.title}

`;

  return text;
}

function generateOtherMarks(data) {
  let text = "";
  try {
    data = Object.entries(data);
    // console.log("Test", data);
    data.forEach((element) => {
      // Check if a user provided any input for a section
      console.log("element[1]: ", element[1]);
      if (element[1] && element[1].length > 0) {
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


generateQuestionsMarks = (username, email)  => {
  let text = `## Questions

GitHub profile: https://github.com/${username}

In case of additional questions, please reach out to me at ${email}
`;

return text;
};

// Function to generate markdown for README
function generateMarkdown(data) {
  const {gitHubUsername, email, ...restData} = data;
  
  let resultText = "";
  resultText += generateTitle(restData);
  delete restData.title;

  // console.log("data.License", data.License);
  
  if (restData.License.length > 0) {
    resultText += renderLicenseSection(restData.License);
  }

  resultText += generateOtherMarks(restData);

  resultText += generateQuestionsMarks(gitHubUsername, email);
  console.log(resultText);

  return resultText;
}

module.exports = generateMarkdown;
