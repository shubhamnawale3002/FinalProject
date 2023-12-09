const companies = [
  {name: 'Intelliswift', hq: 'Newark, CA', indiaLocations: ['Pune', 'Bengaluru']},
  {name: 'Salesforce', hq: 'San Francisco, CA', indiaLocations: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Gurugram', 'Jaipur']}
];

/* 
  Task-1 
  Print following company information on console
  1. Number of companies, 
  2. Name of companies, 
  3. Headquarters of the companies

  Task-2
  Have a button in HTML and on click of the button, show the following as a bulleted 
  list on HTML page:
  Name of company - HQ - India Locations
  E.g. Intelliswift - Newark, CA - Pune, Bengaluru

  Hint: You will need to use document.querySelector or document.getElementById 
  and set it's inner HTML to the content.
*/

//Task 1 Solution
console.log(companies.length);
companies.forEach(function(company) {
  console.log(company.name + ': ' + company.hq);
});


//Task 2 Solution
function showInfo() {
  //Step 1
  const companyInfoDiv = document.getElementById('companyInformation');
  
  //Step 2 - Business Logic
  let outputHtmlSnippet = '';
  outputHtmlSnippet += '<h3>Number of companies: ' + companies.length + '</h3>';
  outputHtmlSnippet += '<ol>'

  //One way to iterate
  for (let i = 0; i < companies.length; i++) {
    let company = companies[i];
    outputHtmlSnippet += '<li>' + company.name + ' - ' + company.hq + ' - ' + company.indiaLocations.join(', ') + '</li>';
  }

  //Better way to iterate
  companies.forEach(function(company) {
    outputHtmlSnippet += '<li>' + company.name + ' - ' + company.hq + ' - ' + company.indiaLocations.join(', ') + '</li>';
  });

  outputHtmlSnippet += '</ol>'

  //Step 3
  companyInfoDiv.innerHTML = outputHtmlSnippet;
}