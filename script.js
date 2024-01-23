///////////GLOBEL VARIBLE ////////////////////////////////////////
//API
const englishWordsLink="https://api.dictionaryapi.dev/api/v2/entries/en/"
let word 
let wordLink 

//game button :
const submitButton = document.querySelector(".submit")
const clearButton = document.querySelector("#clear")
const clearAllButton =document.querySelector("#allclear")
//the playe enter word (by click):
const input = document.querySelector(".word")

//letters
const lettersDiv =document.querySelectorAll(".letter") 
let letterArry = []
let englishLetterArray =['b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't',  'v', 'w', 'x', 'y', 'z']
let vowel = ['a','o','e','i','u']
let allLetter =""
//let letterDiv 

//main game button (start / next /restat)
const startButton = document.querySelector(".start")
const nextLevelButton = document.querySelector('.next')
const restartButton = document.querySelector('.restart')
nextLevelButton.classList.toggle('hide')

//help button (addtimer / hint word / hint meaning)
const addTime= document.querySelector('.add-time')
const hintButton = document.querySelector('.hint')
const hintBymeaningButton = document.querySelector('.hint-by-meaning')

//for hint function 
let hintWordArray = []
let hintItration=1
let finalHintWord
const meaningfooter =document.querySelector(".meaning")

//correct word 
const correctWordList= document.querySelector("#correct")

//game live and timer 
const timer = document.querySelector(".timer")
const heart = document.querySelector(".heart")

//game resualt
const resualtButton = document.querySelector('.resualt')

//design  game 
let targetCorrectWord = 2
let targetTime = 80
let t=targetTime
let levelDiv = document.querySelector('.level')

let finalLevel = 3

//score + level 
let coinsDiv =document.querySelector(".coins")
let diamondDiv=document.querySelector(".diamond")
let coins=30
let diamond=0
diamondDiv.innerText=diamond
coinsDiv.innerText=coins

//to do during the game 
let correctWordArray=[]
const gameStatues  = document.querySelector('.statues')
let task =document.querySelector('.task')
task.innerText=`Complate ${targetCorrectWord} words in ${targetTime} sec`

//initial value
let time
let end=false
let win=false
let start = 0
let remainTime//to git diamond if fininsh task less than half time 
let hintWord
let wrongWordCounter = 0
let wrongWordArray=[]
let repateLetter=0 
let level=1
let heartCounter = 5
let totaltargettWord =0 //for result 

//draw heart icon
for (let i =0;i<heartCounter; i++){
    let heartIcon=document.createElement('i')
    heartIcon.className="fa fa-heart"
    heart.appendChild(heartIcon)
}


/////////GAME FUNCTION////////////



const randomLetter = () => {
    while (letterArry.length < 4){
        letterIndex=Math.floor(Math.random()*englishLetterArray.length)
        letter = englishLetterArray[letterIndex]
        if (!letterArry.includes(letter)){
            letterArry.push(letter)
        }
    }
    while((letterArry.length < 6)){
        letterIndex=Math.floor(Math.random()*vowel.length)
        letter = vowel[letterIndex]
        if (!letterArry.includes(letter)){
            letterArry.push(letter)
        }
    }

    for (let i =0 ; i<letterArry.length;i++){
        letterDiv =document.getElementById(i)
        letterDiv.innerText = letterArry[i]
    }
}

const prepareNextLevel = () => {
    totaltargettWord+=targetCorrectWord
    targetCorrectWord+=1
        if (targetTime === 60 ){
        t=60
    }else {
        targetTime-=10
        t= targetTime}
    if (level < (finalLevel-1) ){
       task.innerText=`Next level : Complate ${targetCorrectWord} words in ${targetTime} sec`
    }else if (level === finalLevel-1){
        task.innerText=`The Final  : Complate ${targetCorrectWord} words in ${targetTime} sec`
    }else if (level ==finalLevel) {
        task.innerText=`GO TO THE RESULT :) `
        

    }

} 

const nextLevel = () => {
    nextLevelButton.classList.toggle('hide')
    level++
    initialize()
    randomLetter()
    timerStart()
}

const endLevel = () => {
    clearInterval(time) 
    end=true
    correctWordArray=[]
    input.innerText=""
    if (win){
        timer.innerText="YOU win !"
        nextLevelButton.classList.remove('hide')
        gameStatues.innerText="winner"
        if (remainTime >= targetTime/2){
            diamond++
            diamondDiv.innerText=diamond
        }
        if (level ===finalLevel){
            nextLevelButton.classList.add('hide')
            resualtButton.style.opacity=1
        }
        prepareNextLevel()
    } 
    else if (t <= 0) {
        timer.innerText="time is up ! :( "
        task.innerText="Task not complate , play agin !"
        gameStatues.innerText="loser"
    }
    else {
        timer.innerText="loser"
        task.innerText="you fininsh your Live :( !! "
        gameStatues.innerText="play agin !"
        }
}

const timerStart = () => {
    if (level=== 1){
        randomLetter()
        start = 1
        startButton.style.opacity = 0
    }
    time=setInterval(timerCount, 1000)
}

const timerCount = () => {
    timer.innerText=t
    t--
    if (t <0 ) {
        endLevel()
    }
}

const correctWord = () => {
    if (correctWordArray.includes(word)){
        gameStatues.innerText="repate word"
    }else {
        gameStatues.innerText="correct word"
        correctWordArray.push(word)
        coins+=word.length
        coinsDiv.innerText=coins
        newh3 = document.createElement('h3')
        newh3.setAttribute('class','correctwords')
        newh3.innerText=word
        correctWordList.appendChild(newh3)
        input.innerText=""
        if (correctWordArray.length === targetCorrectWord){
                win=true
                end=true
                remainTime = t
                endLevel()
            }
        }
}

const  checkWord  = async () => { 
    if (start && !end ){   
        word =input.innerText 
        wordLink = `${englishWordsLink}${word}`
        for (let i= 1 ; i<word.length ;i++){
            if (word[i] === word[0]){
                repateLetter++
            }
        }
        if (word.length === 1) {
                gameStatues.innerText='ITS A letter !!' 
            }
        else if (repateLetter === word.length-1){
            gameStatues.innerText='YOU ARE JOKING :)'
        }else {
            if (word.length > 1){
                await fetch(wordLink)
                .then(response => {
                    if (!response.ok) {
                        let wrongWord=input.innerText 
                        if (!wrongWordArray.includes(word)){
                            gameStatues.innerText='ITS NOT A WORD !!'
                            wrongWordCounter++
                            wrongWordArray.push(wrongWord)
                            heartCounter--
                            let lastChild = heart.lastChild
                            heart.removeChild(lastChild) 
                            //heart.innerText=heartCounter
                            if(wrongWordArray.length >= 5 ){
                            endLevel()
                            }
                        }else {
                            gameStatues.innerText='ITS NOT A WORD , you try this before :))'
                        }
                    }
                    else {
                        correctWord()
                    }
                })
                
            }else {
            gameStatues.innerText='ITS  empty !!'
            }
        }
    repateLetter=0}
}

//TO print that player clicked 
const printLetter = () => {
    if (!end && start){
        let index = parseInt(event.target.getAttribute('id'))
        input.innerText+=letterArry[index]
    }
}

const clearLastLetter = () => {
    input.innerText=input.innerText.slice(0,-1)
}

const clearAllLetter = () => {
    input.innerText="" 
}

const addTimeDiamond = () => {
    if (diamond >0  && !end){
        t+=10
        diamond--
        diamondDiv.innerText=diamond
    }
}


const wordHint = async () => {
    if (coins >= 5 && !end){
        for (let i=0; i<100;i++){
            await wordHintSearch(i)
            if (!correctWordArray.includes(finalHintWord) && finalHintWord){
                for (let i= 1 ; i<word.length ;i++){
                    if (word[i] === word[0]){
                        repateLetter++
                    }
                }
                if (repateLetter !== finalHintWord.length-1){
                correctWordArray.push(finalHintWord)
                coins-=5
                coinsDiv.innerText=coins
                let newh3 = document.createElement('h3')
                newh3.setAttribute('class','correctwords')
                correctWordList.appendChild(newh3)
                newh3.innerText=finalHintWord
                gameStatues.innerText="Hint word"
                finalHintWord=false
                if (correctWordArray.length === targetCorrectWord){
                    win=true
                    end=true
                    remainTime = t
                    endLevel()
                }
                break ;
                }
                repateLetter=0
            }
        }
    }
}

const wordHintSearch =async (hintSearch) => {
    allLetter=""
    letterArry.forEach((element) => {
        allLetter +=element
    })
    let hintLink=`https://api.datamuse.com/words?sp=[${allLetter}]{3}&max`
    let response = await axios.get (hintLink)
    hintWord = response.data[hintSearch].word
    await doubleCheakHint()
}

const doubleCheakHint = async () => {
    wordLink = `${englishWordsLink}${hintWord}`
    await fetch(wordLink)
                .then(response => {
                    if (!response.ok) {
                        wordHintSearch(hintItration)
                        hintItration++
                        }
                    else {
                        word=hintWord
                        finalHintWord = hintWord
                    }
                })
}

const meaningHint = async () => {
    if (coins >= 5 && !end){
        for (let i=0; i<100;i++){
            await wordHintSearch(i)
            if (!correctWordArray.includes(finalHintWord) && finalHintWord){
                wordLink = `${englishWordsLink}${hintWord}`
                let responseData =  await axios.get(wordLink)
                meaningfooter.innerText=responseData.data[0].meanings[0].definitions[0].definition
                if (correctWordArray.length === targetCorrectWord){
                    win=true
                    end=true
                    remainTime = t
                    endLevel()
                }
                break ;
            }
        }
    }

}

const restatGame = () =>{
    clearInterval(time)
    nextLevelButton.classList.add('hide')
    startButton.style.opacity =1
    resualtButton.style.opacity=0
    level=1
    start=0 
    targetCorrectWord = 2
    targetTime = 80
    t=targetTime
    coins=30
    diamond=0
    diamondDiv.innerText=diamond
    coinsDiv.innerText=coins
    timer.innerText=""
    lettersDiv.forEach((element) => {
        element.innerText = ""
    })
    initialize()
    
}

const initialize = () => {

    levelDiv.innerText=level
    finalHintWord=false
    wrongWordCounter = 0
    end = false
    win = false 
    correctWordArray=[]
    wrongWordArray=[]
    hintWordArray = []
    letterArry=[]
    input.innerText=""
    gameStatues.innerText=""
    let h3remove=document.querySelectorAll('.correctwords')
    h3remove.forEach((element) => {
        element.remove()
    })
    task.innerText=`Complate ${targetCorrectWord} words in ${targetTime} sec`
    heartCounter=5
    heart.innerHTML=""
    for (let i =0;i<heartCounter; i++){
        let heartIcon=document.createElement('i')
        heartIcon.className="fa fa-heart"
        heart.appendChild(heartIcon)
    }
}

const winnerResult = () => {
    let h3remove=document.querySelectorAll('.correctwords')
    h3remove.forEach((element) => {
        element.remove()
    })
    task.innerText="THE RESUALT"
    if (coins > totaltargettWord *5 && (0.8*finalLevel < diamond < finalLevel)){
        gameStatues.innerText="Profetional"}
    else if (coins > totaltargettWord *5 && (0.5*finalLevel < diamond < 0.7*finalLevel)){
        gameStatues.innerText="Expert"
    }
    else if ( coins > totaltargettWord*4 ){
        gameStatues.innerText="Intermediate"
    }
    else if (totaltargettWord*4 <= coins <= totaltargettWord*3 ){
        gameStatues.innerText="Elementary"
    }else {
        gameStatues.innerText="Beginner"

    }
}



///////////EVENT LISTENER //////////////////
lettersDiv.forEach(
    (element) => {
    element.addEventListener('click', printLetter)
})
clearAllButton.addEventListener ('click', clearAllLetter)
submitButton.addEventListener('click',checkWord)
nextLevelButton.addEventListener('click' , nextLevel)
startButton.addEventListener('click' , timerStart)
clearButton.addEventListener('click',clearLastLetter)
addTime.addEventListener('click' ,addTimeDiamond)
restartButton.addEventListener('click',restatGame)
hintButton.addEventListener('click',wordHint)
hintBymeaningButton.addEventListener('click',meaningHint)
resualtButton.addEventListener('click',winnerResult)

