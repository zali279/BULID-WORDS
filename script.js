const englishWordsLink="https://api.dictionaryapi.dev/api/v2/entries/en/"
const submitButton = document.querySelector(".submit")
const input = document.querySelector(".word")
const lettersDiv =document.querySelectorAll(".letter") 
const clearButton = document.querySelector("#clear")
const clearAllButton =document.querySelector("#allclear")
const correctWordList= document.querySelector("#correct")
const startButton = document.querySelector(".start")
const timer = document.querySelector(".timer")
const heart = document.querySelector(".heart")
const nextLevelButton = document.querySelector('.next')
const restartButton = document.querySelector('.restart')
const resualtButton = document.querySelector('.resualt')
const gameStatues  = document.querySelector('.statues')
const addTime= document.querySelector('.add-time')
const hintButton = document.querySelector('.hint')
const hintBymeaningButton = document.querySelector('.hint-by-meaning')
nextLevelButton.classList.toggle('hide')
let targetCorrectWord = 2
let word 
let wordLink 
let correctWordArray=[]
let coinsDiv =document.querySelector(".coins")
let diamondDiv=document.querySelector(".diamond")
let levelDiv = document.querySelector('.level')
let task =document.querySelector('.task')
let level=1
let coins=30
let diamond=0
diamondDiv.innerText=diamond
coinsDiv.innerText=coins
let time
let end=false
let win=false
let start = 0
let remainTime
let targetTime = 80
let t=targetTime
let letterArry = []
let letterDiv 
let hintWord
let englishLetterArray =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let allLetter =""
let wrongWordCounter = 0
let heartCounter = 5
let wrongWordArray=[]
let finalLevel = 3
//let hintSearch =0
task.innerText=`Complate ${targetCorrectWord} words in ${targetTime} sec`
heart.innerText=heartCounter
let totaltargettWord =0
let hintWordArray = []
let repateLetter=0
let z=1
let finalHintWord
const randomLetter = () => {

    while (letterArry.length < 6){
        letterIndex=Math.floor(Math.random()*englishLetterArray.length)
        letter = englishLetterArray[letterIndex]
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
    console.log(totaltargettWord)
    targetCorrectWord+=1
        if (targetTime === 60 ){
        t=60
    }else {
        targetTime-=10
        t= targetTime}
    console.log (level < (finalLevel-1))
    if (level < (finalLevel-1) ){
       task.innerText=`Next level : Complate ${targetCorrectWord} words in ${targetTime} sec`
    }else if (level === finalLevel-1){
        task.innerText=`The Final  : Complate ${targetCorrectWord} words in ${targetTime} sec`
    }else if (level ==finalLevel) {
        task.innerText=`GO TO THE RESULT :) `
        

    }

} 

const nextLevel = () => {
    wrongWordCounter = 0
    wrongWordArray=[]
    hintWordArray = []
    heartCounter = 5
    heart.innerText=heartCounter
    let h3remove=document.querySelectorAll('.correctwords')
    h3remove.forEach((element) => {
        element.remove()
        })
    task.innerText=`Complate ${targetCorrectWord} words in ${targetTime} sec`
    nextLevelButton.classList.toggle('hide')
    level++
    levelDiv.innerText=level
    gameStatues.innerText=""
    end = false 
    win =false
    letterArry=[]
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
        nextLevelButton.classList.toggle('hide')
        gameStatues.innerText="winner"
        if (remainTime >= targetTime/2){
            diamond++
            diamondDiv.innerText=diamond
        }
        if (level ===finalLevel){
            nextLevelButton.style.opacity=0
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
        task.innerText="you fininsh your trail :( !! "
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
/*
const timeStop = () => {
    clearInterval(time)
}
*/
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
                            heart.innerText=heartCounter
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

const responseData = async () => {
let responseData =  await axios.get(wordLink)
//console.log(responseData.data[0])
//console.log(responseData.data[0].meanings[0].definitions[0].definition)
    //.meaning[0].definitions[0].definition)
} 

const printLetter = () => {
    if (!end && start){
        let index = parseInt(event.target.getAttribute('id'))
        input.innerText+=letterArry[index]
    }
}

const clearLastLetter = () => {
    input.innerText=input.innerText.slice(0,-1)
}

const addTimeDiamond = () => {
    if (diamond >0){
        t+=10
        diamond--
        diamondDiv.innerText=diamond
    }
}


const wordHint = async () => {
    //console.log(coins >= 5 && !end)
    if (coins >= 5 && !end){
        for (let i=0; i<100;i++){
            await wordHintSearch(i)
            if (!correctWordArray.includes(finalHintWord)){
                correctWordArray.push(finalHintWord)
                console.log(finalHintWord)
                coins-=5
                coinsDiv.innerText=coins
                let newh3 = document.createElement('h3')
                newh3.setAttribute('class','correctwords')
                correctWordList.appendChild(newh3)
                newh3.innerText=finalHintWord
                gameStatues.innerText="Hint word"
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

const wordHintSearch =async (hintSearch) => {
    allLetter=""
    letterArry.forEach((element) => {
        allLetter +=element
    })
    let hintLink=`https://api.datamuse.com/words?sp=[${allLetter}]{3}&max`
    let response = await axios.get (hintLink)

    
    hintWord = response.data[hintSearch].word
    console.log("HintSearch" ,hintWord)
    await doubleCheakHint()
}
const doubleCheakHint = async () => {
    wordLink = `${englishWordsLink}${hintWord}`
    console.log("hint word check:",hintWord)
    await fetch(wordLink)
                .then(response => {
                    if (!response.ok) {
                        wordHintSearch(z)
                        z++
                        }
                    else {
                        word=hintWord
                        finalHintWord = hintWord
                        console.log("correct hint word",finalHintWord)
                    }
                })
}

const meaningHint = async () => {
    
    hintWordArray.push(...correctWordArray)
    if (coins >= 1 && !end){
        for (let i=0; i<10;i++){
            await wordHintSearch(i)
            if (!hintWordArray.includes(hintWord)){
                coins-=1
                coinsDiv.innerText=coins
                break ;
            }
        }hintWordArray.push(hintWord)
        wordLink = `${englishWordsLink}${hintWord}`
        let responseData =  await axios.get(wordLink)
        console.log(responseData.data[0].meanings[0].definitions[0].definition)
        gameStatues.innerText=responseData.data[0].meanings[0].definitions[0].definition
    }
}


const restatGame = () =>{
    clearInterval(time)
    end = false
    win = false 
    startButton.style.opacity = 1
    level=1
    start=0 
    targetCorrectWord = 2
    targetTime = 160
    coins=0
    diamond=0
    diamondDiv.innerText=diamond
    coinsDiv.innerText=coins
    t=targetTime
    correctWordArray=[]
    input.innerText=""
    diamondDiv.innerText=diamond
    coinsDiv.innerText=coins
    timer.innerText=""
    gameStatues.innerText=""
    let h3remove=document.querySelectorAll('.correctwords')
    console.log(h3remove)
    h3remove.forEach((element) => {
        element.remove()
    })
    task.innerText=`Complate ${targetCorrectWord} words in ${targetTime} sec`
    nextLevelButton.style.opacity=0
    lettersDiv.forEach((element) => {
        element.innerText = ""
    })
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


lettersDiv.forEach(
    (element) => {
    element.addEventListener('click', printLetter)
})
clearAllButton.addEventListener ('click', () => {
    input.innerText="" 
})
submitButton.addEventListener('click',checkWord)
nextLevelButton.addEventListener('click' , nextLevel)
startButton.addEventListener('click' , timerStart)
clearButton.addEventListener('click',clearLastLetter)
addTime.addEventListener('click' ,addTimeDiamond)
restartButton.addEventListener('click',restatGame)
hintButton.addEventListener('click',wordHint)
hintBymeaningButton.addEventListener('click',meaningHint)
resualtButton.addEventListener('click',winnerResult)


/*
for (let i= 1 ; i<word.length ;i++){
    if (word[i] === word[0]){
        repateLetter++
    }
    }
if (repateLetter === word.length){

}*/