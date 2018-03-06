/*
The Lost Library of Socrates
Written by: Matthew Hill
Date of last edit: 16 November 2017
Contact: matthillprogramdeveloper@gmail.com

All comments removed on 6 March 2018 to be used as an exercise in
Code Bootcamp at theClubhou.se
 */

//An array of words that are used during the game
var user;

var library = ["television","cat","banana","computer","ocean","couch","refrigerator","forest","printer","shampoo","table","vehicle","controller","shelf","fence","ottoman","cabinet","coaster","fence","bushes","picture","frame","weight"];



class Puzzle{

    constructor(word){
        this.word = word;
        this.answer = this.wordToArray(word);
        this.currentBoard = this.buildBoard(word);
        this.lettersGuessed = [];
    }
    //The constructor takes a word and in a for loop to allow the code to be excuted repeatedly
    wordToArray(word){
        let board = [];
        for(let letter of word){
            board.push(letter);
        }
        return board;
    }
    //used to build the dislayed board array by making an array w/ the same number
    buildBoard(word){
        let board = [];
        for(let letter of word){
            board.push("_");
        }
        return board;
    }
    //the guess letter function has a parameter for letter and returns 3 options
    guessLetter(letter){
        if(this.lettersGuessed.indexOf(letter) === -1){//Checks if the letter has been guessed before
            this.lettersGuessed.push(letter);//If it has not been guessed it adds it to the letters guessed array
            if(this.answer.indexOf(letter) !== -1){//checks if the letter is in the answer
                for(let i = 0; i < this.answer.length; i++) {//By use of the indexof array method
                    if (this.answer[i] === letter) {
                        this.currentBoard[i] = letter;//and adds that letter to the current board
                    }
                }
                return true;//returns true

            }else{//alerts you that it is an incorrect letter
                return false;//returns false
            }
        }else{//informs you of a previously guessed letter
            return "You already guessed this letter!";
        }
    }

    guessWord(word){
        let winner = false;
        let guess = this.wordToArray(word);

        if (guess.length === this.answer.length) {
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] !== this.answer[i]) {
                    winner = false;
                    break;
                } else {
                    winner = true;
                }
            }
        }else{
            winner = false;
        }
        //TernaryStatement
        return winner ? true:false;
    }


}

/*
class hols name, level, score, remaining guesses, the puzzle an a json inventory of specials
*/
class User{

    constructor(name){
        this.name = name;
        this.level = 1;
        this.score = 0;
        this.guesses = 10;
        this.puzzle = null;
        this.specials = {inventory:{Streln: 1,Vowels: 1,PickALetter: 1,FreeLetter: 1 }};

    }

    useSpecial(type){
        //This is going to use buttons to start the function
        let special = this.specials.inventory;
        console.log("Made it inside the use special function."); //Console used for debugging
        switch(type){//#conditional

            case "Streln":
                if(special.Streln < 1){
                    alert("You do not have any Streln special abilities to use.")
                }else{
                    let streln = new Streln();
                    this.puzzle = streln.use(this.puzzle);
                    special.Streln--;
                }
                break;

            case "Vowels":
                if(special.Vowels < 1){
                    alert("You do not have any Vowels special abilities to use.")
                }else{
                    let vowels = new Vowels();
                    this.puzzle = vowels.use(this.puzzle);
                    special.Vowels--;
                }
                break;

            case "PickALetter":
                if(special.PickALetter < 1){
                    alert("You do not have any Pick A Letter special abilities to use.")
                }else{
                    let pickALetter = new PickALetter();
                    this.puzzle = pickALetter.use(this.puzzle);
                    special.PickALetter--;
                }
                break;

            case "FreeLetter":
                if(special.FreeLetter < 1){
                    alert("You do not have any Free Letter special abilities to use.")
                }else{
                    let freeLetter = new FreeLetter();
                    this.puzzle = freeLetter.use(this.puzzle);
                    special.FreeLetter--;
                }
                break;


        }

    }
//This whether the user guess the same letter twice
    guessLetter(letter){
        let res = this.puzzle.guessLetter(letter);

        switch(res){
            case true:
                this.score +=13;
                return true;
                break;

            case false:
                this.guesses --;
                return false;
                break;

            case "You already guessed this letter!":
                alert(res);
                return true;
                break;

        }

    }
//This checks whether the guess was valid or not
    guessWord(word){
        let res = this.puzzle.guessWord(word);
        if(res){
            YouWin();
        }else{
            alert("Incorrect Guess");
            this.guesses --;
        }

    }


}




/*

 */
class Special{

    use(currentPuzzle){
        let puzzle = currentPuzzle;
        //do some stuff
        return puzzle;
    }
}

/*

 */

class Streln extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        puzzle.guessLetter("s");
        puzzle.guessLetter("t");
        puzzle.guessLetter("r");
        puzzle.guessLetter("e");
        puzzle.guessLetter("l");
        puzzle.guessLetter("n");

        return puzzle;
    }
}
//
class Vowels extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        puzzle.guessLetter("a");
        puzzle.guessLetter("e");
        puzzle.guessLetter("i");
        puzzle.guessLetter("o");
        puzzle.guessLetter("u");
        return puzzle;
    }
}
/*
The prompt for the user to pick a letter
*/
class PickALetter extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        let menu = new Menu("Pick a space to reveal the letter",puzzle.currentBoard);
        let choice = "1";
        let chosenIndex = -1;
        while (choice !== "_"){//Reveals which letter you revealed by choosing a space
            chosenIndex = menu.displayReturnInt();
            choice = puzzle.currentBoard[chosenIndex];
            /*
            */
        }
        let letter = puzzle.answer[chosenIndex];
        puzzle.guessLetter(letter);
        return puzzle;
    }
}


//Informs user to use free letter //Keeps remaining letters
class FreeLetter extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        let remaining = [];
        for(let i = 0; i < puzzle.answer.length; i++){
            if(puzzle.currentBoard[i] === "_") {
                remaining.push(puzzle.answer[i]);
            }
        }
        console.log("remaining",remaining);
        let randIndex = Math.round((Math.random()*(remaining.length-1)));
        console.log("random letter chosen",remaining[randIndex]);
        puzzle.guessLetter(remaining[randIndex]);
        return puzzle;
    }
}






function letterGuess(key){//A function written to tell the user if their guess was valid
    if(key.keyCode === 13){
        key.preventDefault();//prevents the default event from occuring
        let letter = document.getElementById("letterGuess").value.toLowerCase();
        let alphabet =/[a-zA-z]*/g;
        let testLetter = letter.replace(alphabet,"");
        if(letter.length === 1 && testLetter.length === 0){
            let guess = user.guessLetter(letter);//Takes letter guess, stores value into variable //true,false,or

                console.log("the guess here is "+guess);
                if (!guess){
                    alert(letter+ " is not a piece of the current puzzle.")
                }
        }else{
            alert("Your guess was not a valid letter!");

        }
        document.getElementById("letterGuess").value = "";
        let win = user.puzzle.guessWord(user.puzzle.currentBoard);
        if (win){
            YouWin();
        }

        UpdateBoard();
        UpdateHeader();
        if(user.guesses < 1){
            YouLose();
        }
    }

}

function wordGuess(key){//A function written to tell you whether your guess has no characters or is invalid
    if(key.keyCode === 13){
        key.preventDefault();//prevents the default event from occuring
        let word = document.getElementById("wordGuess").value.toLowerCase().trim();
        let alphabet =/[a-zA-z]*/g;
        let testWord = word.replace(alphabet,"");

        if(word.length > 0 && testWord.length === 0){
            user.guessWord(word);

        }else{
            alert("Your guess contained invalid or no characters!")
        }
        document.getElementById("wordGuess").value = "";
        let win = user.puzzle.guessWord(user.puzzle.currentBoard);
        if (win){
            YouWin();
        }

        UpdateBoard();
        UpdateHeader();
        if(user.guesses < 1){
            YouLose();
        }
    }

}

//A function that prompts you if win a special
function Specials(type){
    user.useSpecial(type);

    let win = user.puzzle.guessWord(user.puzzle.currentBoard);
    if (win){
        YouWin();
    }
    UpdateInventory();
    UpdateBoard();
    UpdateHeader();
}

//function that keeps the header updated //header contains level and score
function UpdateHeader(){
    document.getElementById("header").innerHTML = "";
    let header = document.createTextNode(user.name + "_______"+user.guesses+" guesses remain_______Level: "+user.level+"_______"+user.score+" points");
    document.getElementById("header").appendChild(header);
}
//function that updates the board
function UpdateBoard(){
    document.getElementById("board").innerHTML = "";
    let boardString = " ";
    user.puzzle.currentBoard.forEach(function(v){
        boardString += v;
        boardString +=" ";
    });
    let board = document.createTextNode(boardString);
    document.getElementById("board").appendChild(board);
}
//function that updates the letter inventory
function UpdateInventory(){
    document.getElementById("streln").innerHTML = "";
    let streln = document.createTextNode(user.specials.inventory.Streln);
    document.getElementById("streln").appendChild(streln);

    document.getElementById("vowels").innerHTML = "";
    let vowels = document.createTextNode(user.specials.inventory.Vowels);
    document.getElementById("vowels").appendChild(vowels);

    document.getElementById("pickALetter").innerHTML = "";
    let pickALetter = document.createTextNode(user.specials.inventory.PickALetter);
    document.getElementById("pickALetter").appendChild(pickALetter);

    document.getElementById("freeLetter").innerHTML = "";
    let freeLetter = document.createTextNode(user.specials.inventory.FreeLetter);
    document.getElementById("freeLetter").appendChild(freeLetter);
}


//Allows user to string their name and cancel their prompt //Prompt if user quits the game //#else used to prompt new user with a new puzzle
function Main(){
    let validator = new Validator();
    let userName = validator.getString("Please enter your name.");
    if (userName === null){
        document.getElementById("header").innerHTML = "";
        document.getElementById("board").innerHTML = "User quit the game!";
        document.getElementById("guess").innerHTML = "";
        document.getElementById("specials").innerHTML = "";

    }else{
        user = new User(userName);
        let randIndex = Math.round((Math.random()*(library.length-1)));
        user.puzzle = new Puzzle(library[randIndex]);

        UpdateHeader();
        UpdateInventory();
        UpdateBoard();
    }

}
//An alert that shows the user the answer //Alerted for the points that are awared //Alert for a new special //Alert for an extra guess
function YouWin(){
    let types = ["Streln","Vowels","PickALetter","FreeLetter"];
    let randIndex1 = Math.round((Math.random()*(types.length-1)));
    let lettersLeft = 0;
    for(let letter of user.puzzle.currentBoard){
        if(letter = "_"){
            lettersLeft +=13;
        }
    }
    let score = ((user.puzzle.answer.length)*11)+lettersLeft;
    user.score += score;
    user.specials.inventory[types[randIndex1]]++;
    user.guesses++;
    user.level++;
    alert("The answer is "+user.puzzle.word.toUpperCase()+"!\nPoints awarded for completion: "+ score+"\nYou got a new special: "+types[randIndex1]+"\nYou got an extra guess!");

    let randIndex2 = Math.round((Math.random()*(library.length-1)));
    user.puzzle = new Puzzle(library[randIndex2]);

    UpdateHeader();
    UpdateBoard;
    UpdateInventory();

}
//A final report of your game showing your final score, prompt that tells you you're out of guesses and to refresh.
function YouLose(){
    document.getElementById("board").innerHTML = "Above is your final score.";
    document.getElementById("guess").innerHTML = "You have run out of guesses.";
    document.getElementById("specials").innerHTML = "Refresh the page to play again.";

}



Main();
