"use strict";
/* UPPGIFT:
    Använda FetchAPI-anrop tillsammans med async/await och try/catch.
    Träna på att sortera och filtrera data.
    Praktiskt använda utvecklings-miljön du skapade i tidigare moment.
    Använda Git för versionshantering.


    KRAV:
    -Du har använt din automatiserade arbetsprocess från tidigare 
    moment som grund.

    -Du har anropat avsett JSON-data med ett AJAX-anrop 
    och använt FetchAPI tillsammans med async/await och try/catch.

    -Du har skapat en tabell som innehåller data för kurskod, kursnamn 
    och progression.

    -Det går att sortera data på kurskod, kursnamn och progression.

    -Det går att filtrera/söka data genom att ange en textfras.

    -Användargränssnittet uppdateras automatiskt vid klick för sortering
    samt ändring av sökfras.
    
    -Du har använt Git för versionshantering, med regelbundna commits 
    och tydliga commit-meddelanden.
        Glöm inte att lägga node_modules-katalogen i din .gitignore, 
        då denna inte är relevant att versionshanteras.
    
    -Uppgiften är publicerad till en webbhost som ej är FTP/SFTP-baserad med en automatisk publicering vid Git-commits - och går att testköra.

*/

//Anropa webbtjänst
//Hämta & hantera data från webbtjänst
//Promises i FetchAPI-anrop som hanterar resultat
async function getData(){
  const url = 'https://webbutveckling.miun.se/files/ramschema_ht24.json';

  try {
    const Response = await fetch(url);
    if (!Response.ok) {
      throw new Error ('Något gick fel vid hämtning av data: ' + Response.status);
    }
    const data = await Response.json();

    let tableBody = document.querySelector("#courseTable tbody");
    tableBody.innerHTML = "";

    // Loop through all data, creates rows, and places information into the rows
    data.forEach(course => {
      let row = document.createElement("tr");

      let courseCodeCell = document.createElement("td");
      let courseNameCell = document.createElement("td");
      let progressionCell = document.createElement("td");

      courseCodeCell.textContent = course.code;
      courseNameCell.textContent = course.coursename;
      progressionCell.textContent = course.progression;

      row.appendChild(courseCodeCell);
      row.appendChild(courseNameCell);
      row.appendChild(progressionCell);

      tableBody.appendChild(row);
  });
    addSort();
    console.log(data);
  }
  catch(error) {
    console.log('Error:', error)
  }
}

/* API INFO:
    code - Kurskod
    coursename - Kursnamn
    progression - Progression, A eller B
    syllabus - URL till kursplan 
        (Notering: dessa kan bli inaktuella med tid, 
        då de uppdateras ganska ofta och då får ny URL)
*/

/* Utseende

Webbutveckling - Ramscema

    Sök
    |          Sök efter kurskod eller kursnamn          |

                        ~ Table ~

        Kurskod           Namn          Progression
         [sort]          [sort]           [sort]

        dt057g        Webutveckling          A
*/

// Sök funktion
function filterTable() {
  let input = document.getElementById("search").value.toLowerCase();
  let rows = document.querySelectorAll("#courseTable tbody tr");

  //Checks rows to see if it matches search
  rows.forEach(row => {
      let text = row.textContent.toLowerCase();
      if (text.includes(input)) {
          row.style.display = "";
      } else {
          row.style.display = "none";
      }
  });
}

//Function that adds event listener for each header
function addSort() {
    let headers = document.querySelectorAll("#courseTable th");

    headers.forEach((header, columnIndex) => {
        header.style.cursor = "pointer"; // Indicate that it's clickable
        header.addEventListener("click", () => {
            console.log(`Sorting column ${columnIndex}`); // Debugging
            sortTable(columnIndex);
        });
    });
}
//Stores sorting direction
 let sortDir = {};

//Function to sort data
function sortTable(columnIndex) {
  let tableBody = document.querySelector("#courseTable tbody");
  let rows = Array.from(tableBody.querySelectorAll("tr"));

//Ascending/descending order
sortDir[columnIndex] = !sortDir[columnIndex];

  //Goes through each row to determine alphabetical order 
  rows.sort((rowA, rowB) => {
    let cellA = rowA.children[columnIndex].textContent.toLowerCase();
    let cellB = rowB.children[columnIndex].textContent.toLowerCase();

    //Rearranges rows
    if (cellA < cellB) return sortDir[columnIndex] ? -1 : 1;
    if (cellA > cellB) return sortDir[columnIndex] ? 1 : -1;
    return 0;
});

//Re-append rows
tableBody.innerHTML = "";
rows.forEach(row => tableBody.appendChild(row));
}

//Call function to fetch data & load page
getData();

//Search event listener
document.getElementById("search").addEventListener("keyup", filterTable);