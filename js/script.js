/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Henry CS
// !!!GOING FOR EXCEEDS EXPECTATIONS!!! :) 

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
   for ( let i = 0; i < list.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         const imgUrl = list[i].picture.large; 
         const firstName = list[i].name.first;
         const lastName = list[i].name.last;
         const email = list[i].email;
         const joinedDate = list[i].registered.date;
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
/**
 * Creating an addPagination function to dynamically add as many pages to the app that there are in the data array (depending on the number of items per page)
 * @param {Array} list data array to pass into the function
 * calculate how many pages are needed by dividing the data.length by page length
 * (with 42 items and 9 items per page, this should be around 4.6 pages - although this will be dynamic)
*/
function addPagination(list) {
   // rounding to the next highest int since a float is not useful for the loop 
   // and we will always need the additional page to display left over students from the division data.length/pageLength
   const numOfBtns = Math.ceil(list.length / pageLength);
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

/**
 * Create function to build and include search bar onto the DOM
 */
function addSearch() {
   const searchContainer = document.getElementsByClassName('header')[0];
   //create outer label
   const searchComponent = document.createElement('label');
   searchComponent.for = 'search';
   searchComponent.className = 'student-search';
   //create inner components 
   //span
   const searchSpan = document.createElement('span');
   searchSpan.textContent = 'Search by name';
   //input
   const searchInput = document.createElement('input');
   searchInput.id = 'search';
   searchInput.placeholder = 'Search by name...'
   //button
   const searchButton = document.createElement('button');
   searchButton.type = 'button';
   const searchIcon = document.createElement('img');
   searchIcon.src = 'img/icn-search.svg';
   searchIcon.alt = 'Search icon';
   searchButton.appendChild(searchIcon);
   //add inner components to outer label parent
   searchComponent.appendChild(searchSpan);
   searchComponent.appendChild(searchInput);
   searchComponent.appendChild(searchButton);
   //add constructed label to the header 
   searchContainer.appendChild(searchComponent);
}

// Perform search function with searchInput.value against data array
function perfSearch(searchInput, list) {
   // declare empty array to store matches
   let searchResults = [];
   // iterate through data array
   for ( let i = 0; i < list.length; i++ ) {
     // if searchInput.value isNOT 0 and
            // searchInput.value IS included in data FIRST name OR
            // searchInput.value IS included in data LAST name
      if ( searchInput.value.length !== 0 && 
           list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
           list[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ) {
            // push the current student object to the results array   
            searchResults.push(list[i]);  
         }
   }
   // if the searchResults array isn't empty
   if ( searchResults.length != 0 ) {
      // update page with searchResults and new page numbers
      showPage(searchResults, 1);
      addPagination(searchResults);
   } else {
      // if the searchResults array is empty, provide message to let user know that there are no matches
      // also remove pag buttons to prevent confusion
      const displayBox = document.querySelector('.student-list');
      const linkListUl = document.querySelector('.link-list');
      displayBox.innerHTML = `<h4>No results found</h4>`;
      linkListUl.innerHTML = '';
   }
}

// Add event listener to the search bar 
function searchEvListeners() {
   const searchInput = document.querySelector('#search');
   searchInput.addEventListener('keyup', () => {
      perfSearch(searchInput, data);
   })

   const submitBtn = document.querySelector('.student-search button');
   submitBtn.addEventListener('click', () => {
      perfSearch(searchInput, data);
   })
}

//Call functions
showPage(data, 1);
addPagination(data);
addSearch();
searchEvListeners();
