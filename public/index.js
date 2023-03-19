let genButton = document.getElementById("generate");
let genText = document.getElementById("genText");
let sendButton = document.getElementById("sendButton");
let sendText = document.getElementById("answered");
let submit = document.getElementById("submitButton");

submit.disabled = true;

function paintRGB() {
    sendButton.style.backgroundColor = 'rgb(238, 101, 101)';
}

function paintWhite() {
    sendButton.style.backgroundColor = 'white'   
}

function paintGreen() {
    sendButton.style.backgroundColor = 'green';
}

const baseUrl = 'http://localhost:8080/'
async function getInfo(e) {
    e.preventDefault();
    sendText.value = '';
    sendButton.innerHTML = 'Test Et';
    sendButton.style.backgroundColor = 'white';
    sendButton.addEventListener('mouseenter', paintRGB);
    sendButton.addEventListener('mouseleave', paintWhite);
    const res = await fetch(baseUrl + 'questions', {method:'GET'});
    const data = await res.json();
    let objLen = Object.keys(data).length;
    let num = Math.floor(Math.random() * objLen);
    genText.innerHTML = `<p>${data[num]}</p>`;
    postInfo(e, response = data[num]);
}

async function postInfo(e, response) {
    e.preventDefault();
    if (!response) {return};
    const res = await fetch(baseUrl, {
        method:'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({parcel: response})
    });
}

async function compareData(e) {
    e.preventDefault();
    let num = await fetch(baseUrl + 'n', {method:'GET'});
    let secNum = await num.json();
    const res = await fetch(baseUrl + 'answer' + secNum['n'], {method:'GET'});
    const data = await res.json();
    const translatedStr = data['translated'];
    const ourStr = sendText.value;
    if (ourStr == translatedStr) {
        sendButton.removeEventListener('mouseenter', paintRGB);
        sendButton.removeEventListener('mouseleave', paintWhite);
        sendButton.innerHTML = 'Doğru';
        sendButton.style.backgroundColor = 'green';
        submit.disabled = false;
        setTimeout(() => {
            sendButton.innerHTML = 'Test Et';
            sendButton.style.backgroundColor = 'white';
        }, 5000);
    }
    else {
        sendButton.removeEventListener('mouseenter', paintRGB);
        sendButton.removeEventListener('mouseleave', paintWhite);
        sendButton.innerHTML = 'Yanlış';
        sendButton.style.backgroundColor = 'red';
        setTimeout(() => {
            sendButton.style.backgroundColor = 'white'
            sendButton.innerHTML = 'Test Et';
            sendButton.addEventListener('mouseenter', paintRGB);
            sendButton.addEventListener('mouseleave', paintWhite);
        }, 3000);
    }
}

submit.addEventListener('click', getInfo);
sendButton.addEventListener('click', compareData);
genButton.addEventListener('click', getInfo);
