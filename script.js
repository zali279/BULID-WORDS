const englishWordsLink="https://api.dictionaryapi.dev/api/v2/entries/en/"
const submitButton = document.querySelector(".submit")
const input = document.querySelector(".word")
const lettersDiv =document.querySelectorAll(".letter") 
const clearButton = document.querySelector("#clear")
const clearAllButton =document.querySelector("#allclear")
const correctWordList= document.querySelector(".correct")
const startButton = document.querySelector(".start")
const timer = document.querySelector(".timer")
const nextLevelButton = document.querySelector('.next')
const restartButton = document.querySelector('.restart')
const gameStatues  = document.querySelector('.statues')
const addTime= document.querySelector('.add-time')
const hintButton = document.querySelector('.hint')
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
let coins=0
let diamond=0
diamondDiv.innerText=diamond
coinsDiv.innerText=coins
let time
let end=false
let win=false
let start = 0
let remainTime
let targetTime = 90
let t=targetTime
let letterArry = []
let letterDiv 
let englishLetterArray =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let allLetter =""
let hintSearch =1
task.innerText=`Complate ${targetCorrectWord} words in ${targetTime} sec`


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
    targetCorrectWord+=1
    targetTime-=10
    t= targetTime
    task.innerText=`Next level : Complate ${targetCorrectWord} words in ${targetTime} sec`
} 

const nextLevel = () => {
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
        prepareNextLevel()
    } 
    else {
        timer.innerText="time is up ! :( "
        task.innerText="Task not complate , play agin !"
        gameStatues.innerText="loser"
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
        console.log(word.length)
        if (word.length > 1){
            await fetch(wordLink)
            .then(response => {
                if (!response.ok) {
                    gameStatues.innerText='ITS NOT A WORD !!'
                }
                else {
                    correctWord()
                }
                })
                
        }else if (word.length === 1) {
            gameStatues.innerText='ITS A letter !!' 
        }else {
            gameStatues.innerText='ITS  empty !!'
        }
    }
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

/*
const wordHint = async () => {
    if (coins >= 5 && !end){
        letterArry.forEach((element) => {
            allLetter +=element
        })
    let hintLink=`https://api.datamuse.com/words?sp=[${allLetter}]{3}&max`
    let response = await axios.get (hintLink)

    let hintWord = response.data[0].word

    correctWordArray.push(hintWord)
    
    coins-=5
    coinsDiv.innerText=coins
    }
    

    
}
*/
const repateHint = () => {
    let hintWord = response.data[hintSearch].word
    hintSearch++
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
    nextLevelButton.classList.toggle('hide')
    lettersDiv.forEach((element) => {
        element.innerText = ""
    })
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

//hintButton.addEventListener('click',wordHint)
