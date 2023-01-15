/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
// GOING FOR EXCEEDS EXPECTATIONS :) 

/**
 * Creating the showPage() function: 
 *  first setting the number of students per page
 *  then using this number to calculate the range of indices to display
 * @param {arr} list list of data to pass into the function
 * @param {number} page page selection used to calculate the necessary indices
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
function addPagination(list) {
   const numOfBtns = list.length / pageLength;
   const linkListUl = document.querySelector('.link-list');
   linkListUl.innerHTML = '';
   for ( let i = 0; i < numOfBtns; i++ ) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'button';
      button.textContent = i+1;
      li.appendChild(button);
      linkListUl.appendChild(li);
   }
   const pagBtn1 = document.querySelector('.button');
   pagBtn1.classList.add('active');
   linkListUl.addEventListener('click', (e) => {
      if ( e.target.tagName === 'BUTTON' ) {
         const currentActivtBtn = document.getElementsByClassName('active')[0];
         currentActivtBtn.classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
      }
   })
}



// Call functions
showPage(data, 1);
addPagination(data);