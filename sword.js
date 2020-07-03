const problem = document.getElementById('problem')
const timer = document.getElementById('timer')
const counter = document.getElementById('counter')
const answer = document.getElementById('answer')
const skip = document.getElementById("skip")

// isi array untuk shuffle

let animals = [
    'kalajengking', 'kepiting', 'kelabang', 'belalang', 'belatung', 'kangguru', 'belatung', 'bunglon', 'harimau', 'cendrawasih', 'jerapah', 'banteng', 'beruang', 'kecebong', 'kumbang', 'penyu', 'kijang', 'biawak', 'bekantan'
]


// fungsi-funngsi untuk shuffling

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function shuffle(s) {
    let arr = s.split('');
    let n = arr.length;
    
    for(let i=0 ; i<n-1 ; i++) {
        let j = getRandomInt(n);
        
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    s = arr.join('');
    return s;
}
    
function shuffleProblem(arr) {
    let n = arr.length;
    let questions = []
    
    for(let i=0; i<n; i++) {
        let j = getRandomInt(n);
        
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    for (let j=0; j<10; j++) {
        questions.push(arr[j])
    }
    return questions;
}

// penghitung waktu maju(tidak mundur)
let totalSeconds = 0;
setInterval(setTime, 1000);
let totalTime = 0;

function setTime() {
    ++totalSeconds;
    timer.innerHTML = pad(totalSeconds)
}

function pad(val) {
    var valString = val + "";
    if(valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}

// let's start the game from here


function swordGame () {
    
    let i = 0;
    let questions = shuffleProblem(animals);
    let answered = 0;

    problem.innerHTML = shuffle(questions[i])
    counter.innerHTML = `${i+1}/${questions.length}`

    answer.addEventListener("keyup", function() {
        let x = answer.value
        if (x == questions[i]) {
            i++
            totalTime += totalSeconds
            answered++
            totalSeconds = 0;
            problem.innerHTML = shuffle(questions[i])
            counter.innerHTML = `${i+1}/${questions.length}`
            answer.value = ''
        } 
        
        if (i == questions.length) {
            problem.innerHTML = `Answered ${answered} problem(s). Average completion time ${totalTime/questions.length} seconds/problem.`
            counter.innerHTML = ''
            counter.remove()
            timer.remove()
            answer.remove()
            skip.remove()

        }
    })
    document.getElementById("skip").onclick = skipButton
    
    function skipButton() {
        i++
        if (i == questions.length) {
            problem.innerHTML = `Answered ${answered} problem(s). Average completion time ${totalTime/questions.length} seconds/problem.`
            counter.innerHTML = ''
            counter.remove()
            timer.remove()
            answer.remove()
            skip.remove()
        }
        totalTime += totalSeconds
        totalSeconds = 0;
        problem.innerHTML = shuffle(questions[i])
        counter.innerHTML = `${i+1}/${questions.length}`
        answer.value = ''
    }
    
}


swordGame()