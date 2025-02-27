"use strict";

//Start av applikation
window.onload = init ();

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

function init () {
  getData();
}

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

  rows.forEach(row => {
      let text = row.textContent.toLowerCase();
      if (text.includes(input)) {
          row.style.display = "";
      } else {
          row.style.display = "none";
      }
  });
}
//Search event listener
document.getElementById("search").addEventListener("keyup", filterTable);

// Sort function A-Ö
// Sortera data i bokstavsordning, på kurskod, kursnamn samt progression.
new function sortFun() {
    
}

/* Sort function Ö-A
function sortBak() {

}
*/