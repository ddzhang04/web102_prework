/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

 function addGamesToPage(games) {
    for (let game of games) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> $${game.backers}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter games with pledged < goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Add unfunded games to the DOM
    addGamesToPage(unfundedGames);

    console.log("Unfunded games:", unfundedGames.length); // For Secret Key
}

// Show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter games with pledged >= goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Add funded games to the DOM
    addGamesToPage(fundedGames);

    console.log("Funded games:", fundedGames.length); // For Secret Key
}

// Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Display all games
    addGamesToPage(GAMES_JSON);
}

// Select each button
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// count the number of unfunded games
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// count total number of games
const totalGames = GAMES_JSON.length;


// create the message string
const displayStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
  Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded.
  We need your help to fund these amazing games!
`;

// create a new paragraph element and add the string
const descriptionElement = document.createElement("p");
descriptionElement.innerText = displayStr;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
  });
  // sort the games by pledged amount in descending order
  const [firstGame, secondGame] = [...sortedGames];
  
  // create a new element to hold the name of the top pledge game, then append it to the correct element
  const firstGameElement = document.createElement("p");
  firstGameElement.textContent = firstGame.name;
  firstGameContainer.appendChild(firstGameElement);
  
  // do the same for the runner-up item
  const secondGameElement = document.createElement("p");
  secondGameElement.textContent = secondGame.name;
  secondGameContainer.appendChild(secondGameElement);
  
  console.log("Secret Key component 1:", firstGame.name.split(" ")[0]);
  console.log("Secret Key component 2:", secondGame.name.split(" ")[0]);
  