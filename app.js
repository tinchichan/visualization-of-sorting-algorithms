//DOM
var navBtn = document.getElementsByClassName("nav-link");
var hpBtn = document.getElementById("hpBtn");
var saBtn = document.getElementById("saBtn");
var visBtn = document.getElementById("visBtn");
var visTab = document.getElementById("visTab");
var quizBtn = document.getElementById("quizBtn");
var userNameBtn = document.getElementById("userNameBtn");
var userNameInput = document.getElementById("userNameInput");
var userName = "";
var audio = document.getElementById("audio");
audio.volume = 0.4;
var playPauseBtn = document.getElementById("playPauseBtn");
var adjustedVol = document.getElementById("doneSoundEffect");
adjustedVol.volume = 0.4;

//initiation
reset();

function reset() {
    hpBtn.style.display = "block";
    saBtn.style.display = "none";
    visBtn.style.display = "none";
    quizBtn.style.display = "none";
}

//bgm player
var isPlaying = false;

function playPause() {
    if (!isPlaying) {
        isPlaying = true;
        audio.play();
        playPauseBtn.innerHTML = "Bgm ON";
        playPauseBtn.classList.remove("btn-dark");
        playPauseBtn.classList.add("btn-light");
    } else {
        isPlaying = false;
        audio.pause();
        playPauseBtn.innerHTML = "Bgm OFF";
        playPauseBtn.classList.remove("btn-light");
        playPauseBtn.classList.add("btn-dark");
    }
}

//navbar click effect
let preNavBtn = navBtn[0];
for (let i = 0; i < navBtn.length; i++) {
    navBtn[i].addEventListener("click", function () {
        if (preNavBtn != navBtn[i] && i != 4) {
            this.classList.add("active");
            preNavBtn.classList.remove("active");
            preNavBtn = navBtn[i];
        }
        if (i == 4 && userName != "") {
            window.alert(`Yo, ${userName}. How are you today? ^.^ \nYour Quiz Score is: ${result}`)
        }
    })
}

//click nav bar button -> load different div in the center section
for (let i = 0; i < navBtn.length; i++) {
    switch (i) {
        case 0:
            navBtn[i].addEventListener("click", function () {
                hpBtn.style.display = "block";
                saBtn.style.display = "none";
                visBtn.style.display = "none";
                quizBtn.style.display = "none";
            });
            break;
        case 1:
            navBtn[i].addEventListener("click", function () {
                hpBtn.style.display = "none";
                saBtn.style.display = "block";
                visBtn.style.display = "none";
                quizBtn.style.display = "none";
            });
            break;
        case 2:
            navBtn[i].addEventListener("click", function () {
                hpBtn.style.display = "none";
                saBtn.style.display = "none";
                visBtn.style.display = "block";
                quizBtn.style.display = "none";
            });
            break;
        case 3:
            navBtn[i].addEventListener("click", function () {
                hpBtn.style.display = "none";
                visBtn.style.display = "none";
                saBtn.style.display = "none";
                quizBtn.style.display = "block";
                buildQuestion();
            });
            break;
        default:
            break;
    }
}

//click to save username and greet to the user
userNameBtn.addEventListener("click", function () {
    userName = userNameInput.value.trim()?.substring(0, 10);
    var temp = document.getElementById("displayUserName");
    temp.classList.add("anim-typewriter3");
    if (userName != "") {
        document.getElementById("loginSoundEffect").play();
        temp.innerHTML = "Hi, " + userName + "!<br/> Hope you enjoy this website :)" + "<br>" + "Sorting Algorithms Tab for basic knowledge," + "<br>" +
        "Visualization Tab for funny animations and" + "<br>" +
        "Quiz Tab for a fruitful challenge!";
        document.getElementById("updateUserName").innerHTML = userName;
    } else {
        document.getElementById("logoutSoundEffect").play();
        temp.innerHTML = `Opps :(...We cannot get your name. Try Again.`;
    }
})

//Quiz Questions Database
var myQuestion = [{
        question: "Q1: Which sorting algorithm would sort the element randomly each time?",
        answer: [
            "A: BubbleSort",
            "B: SelectionSort",
            "C: InsertionSort",
            "D: BogoSort"
        ],
        correctAnswer: 3
    },

    {
        question: "Q2: Which sorting algorithm that divided the list into two part?",
        answer: [
            "A: SelectionSort",
            "B: BubbleSort",
            "C: BogoSort",
            "D: InsertionSort"
        ],
        correctAnswer: 0
    },

    {
        question: "Q3: Which sorting algorithm is the slowest one?",
        answer: [
            "A: SelectionSort",
            "B: BogoSort",
            "C: BubbleSort",
            "D: InsertionSort"
        ],
        correctAnswer: 1
    },

    {
        question: "Q4: Which sorting algorithm would compare each pair in a list until the entire list is sorted?",
        answer: [
            "A: BubbleSort",
            "B: SelectionSort",
            "C: InsertionSort",
            "D: BogoSort"
        ],
        correctAnswer: 0
    },

    {
        question: "Q5: Which sorting algorithm would removes unsorted element from an array to create a spare element?",
        answer: [
            "A: BubbleSort",
            "B: SelectionSort",
            "C: BogoSort",
            "D: InsertionSort"
        ],
        correctAnswer: 3
    },
];

//Quiz System (Total 5 questions temp)
var i = 0;
var result = 0;
var hasAttempted = false;
function buildQuestion(n) {
    if(hasAttempted){
        result = 0;
        hasAttempted = false;
    }
    var parentEle = document.getElementById("quizTab")
    var current_slide = 0
    var current_question = myQuestion[i].question;
    parentEle.innerHTML = current_question;
    parentEle.appendChild(document.createElement("br"));
    var answer_list = myQuestion[i].answer;
    var btn_name = "radio" + i;
    //}

    for (var choice in answer_list) {
        var radio_btn = document.createElement("input");
        radio_btn.type = "radio";
        radio_btn.name = btn_name;
        radio_btn.className = "quizOptions";
        radio_btn.id = `choice${choice}`;
        radio_btn.value = answer_list[choice];
        radio_btn.onclick = function(){
            this.checked = true;
        }
        parentEle.appendChild(radio_btn);
        var answer_label = document.createElement("answer_label");
        answer_label.innerHTML = answer_list[choice];
        parentEle.appendChild(answer_label);
        parentEle.appendChild(document.createElement("br"));
    }

    parentEle.appendChild(document.createElement("br"));
    var submit_btn = document.createElement("input");
    submit_btn.type = "button";
    submit_btn.value = "Submit";
    submit_btn.id = "sub_btn";
    parentEle.appendChild(submit_btn);

    document.getElementById("sub_btn").addEventListener("click", function(){
        var ans = document.getElementById(`choice${myQuestion[i].correctAnswer}`);
        if(ans.checked == true){
            result ++;
        }
        i ++;
        if(i < myQuestion.length){
            buildQuestion(i);
        }
        if(i == 5){
            showResultPage();
            i = 0;
            hasAttempted = true;
            submit_btn.disabled = true;
        }
    })
}

function showResultPage(){
    window.alert(`Your score is ${result}`);
}

//============================================
//==============Visualization=================
//============================================

var startBtn = document.querySelector(".start");
async function start() {
    var algoVal = parseInt(document.querySelector(".algo-menu").value);
    var speed = parseFloat(document.querySelector(".speed-menu").value);
    var sizeVal = parseInt(document.querySelector(".size-menu").value);

    abort = false;
    if (isNaN(algoVal)) {
        window.alert("Please select a sorting algorithm.");
    } else if (isNaN(sizeVal)) {
        window.alert("Please select number of bars.");
    } else {
        startBtn.disabled = true;
    }

    let algorithm = new SortAlgorithms(speed);
    switch (algoVal) {
        case 1:
            await algorithm.bubbleSort();
            break;
        case 2:
            await algorithm.selectionSort();
            break;
        case 3:
            await algorithm.insertionSort();
            break;
        case 4:
            await algorithm.quickSort();
            break;
        case 5:
            await algorithm.bogoSort();
            break;
        default:
            break;
    }
};

var abort = false;
async function regenFrame() {
    startBtn.disabled = false;
    abort = true;
    let algoVal = parseFloat(document.querySelector(".algo-menu").value);
    await regenList();
}

async function regenList() {
    let sizeValue = parseFloat(document.querySelector(".size-menu").value);
    await clearData();

    let list = await randomList(sizeValue);
    const arrayNode = document.querySelector(".array");
    for (const element of list) {
        const node = document.createElement("div");
        node.className = "bar";
        node.setAttribute("value", String(element));
        node.style.height = `${3*element}px`;
        arrayNode.appendChild(node);
    }
};

const RenderArray = async (sorted) => {
    let sizeValue = parseInt(document.querySelector(".size-menu").value);
    await clearData();

    let list = await randomList(sizeValue);
    if (sorted){
        list.sort((a, b) => a - b);
    };

    const arrayNode = document.querySelector('.array');
    const divnode = document.createElement('div');
    divnode.className = 's-array';

    for (const e of list) {
        const dNode = document.createElement('div');
        dNode.innerText = e;
        dNode.className = 's-bar';
        divnode.appendChild(dNode);
    }
    arrayNode.appendChild(divnode);
}

const randomList = async (l) => {
    var list = [];
    var lowerBound = 1;
    var upperBound = 100;

    for (var i = 0; i < l; ++i) {
        var randomNum = Math.floor(Math.random() * (upperBound - lowerBound + 1) +
            lowerBound);
        list.push(parseFloat(randomNum));
    }
    return list;
};

const clearData = async () => {
    var arr = document.querySelector(".array");
    arr.innerHTML = "";
};

//Compare, select, unselect bars in the animations
class Helper {
    constructor(time, list = []) {
        this.time = Number(500 / time);
        this.list = list;
    }

    mark = (index) => {
        this.list[index].setAttribute("class", "bar compare");
    }

    markSpl = (index) => {
        this.list[index].setAttribute("class", "bar min");
    }

    unmark = (index) => {
        this.list[index].setAttribute("class", "bar");
    }

    pause = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.time);
        });
    }

    compare = async (index1, index2) => {
        await this.pause();
        let val1 = parseFloat(this.list[index1].getAttribute("value"));
        let val2 = parseFloat(this.list[index2].getAttribute("value"));
        if (val1 > val2) {
            return true;
        }
        return false;
    }

    swap = async (index1, index2) => {
        await this.pause();
        let val1 = this.list[index1].getAttribute("value");
        let val2 = this.list[index2].getAttribute("value");
        this.list[index1].setAttribute("value", val2);
        this.list[index1].style.height = `${3*val2}px`;
        this.list[index2].setAttribute("value", val1);
        this.list[index2].style.height = `${3*val1}px`;
    }
};

//Vis Tab buttons eventListeners
startBtn.addEventListener("click", start);
var sizeMenu = document.querySelector(".size-menu");
sizeMenu.addEventListener("change", regenFrame);
var algoMenu = document.querySelector(".algo-menu");
algoMenu.addEventListener("change", regenFrame);


//All 5 types of sorting algorithms
class SortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".bar");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
    }

    //Bubble Sort
    async bubbleSort(){
        for (let i = 0; i < this.size - 1; ++i) {
            for (let j = 0; j < this.size - i - 1; ++j) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                if (await this.help.compare(j, j + 1)) {
                    await this.help.swap(j, j + 1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
            }
            if (abort) {
                return;
            }
            this.list[this.size - i - 1].setAttribute("class", "bar end");
            adjustedVol.play();
        }
        this.list[0].setAttribute("class", "bar end");
        adjustedVol.play();
    }

    //Bogo Sort
    async bogoSort(){
        var notCorrect;
        do {
            notCorrect = false;
            //random shuffle
            for (var i = 0; i < this.size; i++) {
                // genereate random index for the array
                var random_index = Math.floor(Math.random() * this.size);
                // shuffle the element for the exist array with the random index 
                await this.help.mark(i);
                await this.help.mark(random_index);
                await this.help.swap(i, random_index);
                await this.help.unmark(i);
                await this.help.unmark(random_index);
            }
            for (let i = 0 ; i < this.size - 1 ; i++){
                if(!(await this.help.compare(i + 1, i))){
                    notCorrect = true;
                }
            }
        }
        while (notCorrect) // if array not in ascending order, repeat the shuffle
        for (let i = 0 ; i < this.list.length ; i++){
            this.list[i].setAttribute("class", "bar end");
        }
        adjustedVol.play();
    }

    //Insertion Sort
    async insertionSort(){
        for (let i = 0; i < this.size - 1; ++i) {
            let j = i;
            while (j >= 0 && await this.help.compare(j, j + 1)) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                await this.help.pause();
                await this.help.swap(j, j + 1);
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
                j -= 1;
            }
            if (abort) {
                return;
            }
        }
        for (let counter = 0; counter < this.size; ++counter) {
            this.list[counter].setAttribute("class", "bar end");
            adjustedVol.play();
            if (abort) {
                return;
            }
        }
    }

    // Selection Sort
    async selectionSort(){
        for (let i = 0; i < this.size; ++i) {
            let minIndex = i;
            for (let j = i; j < this.size; ++j) {
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if (await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "bar end");
            adjustedVol.play();
            if (abort) {
                return;
            }
        }
    }

    // QUICK SORT
    async quickSort(){
        await this.quickDivider(0, this.size - 1);
        for (let c = 0; c < this.size; ++c) {
            this.list[c].setAttribute("class", "bar end");
            adjustedVol.play();
        }
    }

    quickDivider = async (s, e) => {
        if (s < e) {
            let pivot = await this.partition(s, e);
            await this.quickDivider(s, pivot - 1);
            await this.quickDivider(pivot + 1, e);
        }
    }

    partition = async (s, e) => {
        let pivot = this.list[e].getAttribute("value");
        let prev_index = s - 1;

        await this.help.markSpl(e);
        for (let c = s; c < e; ++c) {
            let curr = Number(this.list[c].getAttribute("value"));
            await this.help.mark(c);
            if (curr < pivot) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                await this.help.unmark(prev_index);
            }
            await this.help.unmark(c);
        }
        await this.help.swap(prev_index + 1, e);
        await this.help.unmark(e);
        return prev_index + 1;
    }
};