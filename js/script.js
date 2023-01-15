/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
// GOING FOR EXCEEDS EXPECTATIONS :) 


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
//set page length of 9
const pageLength = 9;
//use this to retreive first 9 elements in the data array and display on the page
function showPage(list, page) {
   const startIndex = ( page * pageLength) - pageLength;
   const endIndex = page * pageLength;
   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';
   for ( let i = 0; i < data.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         const imgUrl = data[i].picture.large; 
         const firstName = data[i].name.first;
         const lastName = data[i].name.last;
         const email = data[i].email;
         const joinedDate = data[i].registered.date;
         const currentStudent = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${imgUrl}" alt="Profile Picture">
                  <h3>${firstName} ${lastName}</h3>
                  <span class="email">${email}</span>
                  </div>
                  <div class="joined-details">
                  <span class="date">Joined ${joinedDate}</span>
               </div>
            </li>
         `;
         ul.insertAdjacentHTML( 'beforeend', currentStudent );
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
//calculate how many pages are needed by dividing the data.length by page length 
// (with 42 items and 9 items per page, this should be around 4.6 pages - although this will be dynamic)


// Call functions
showPage(data, 1);