const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const shareButton = document.getElementById("shareButton");
const chat = document.getElementById("chat");

const placeholders = [
    "Чем я могу помочь?",
    "Спросите MotoAI...",
    "Как выбрать мотоцикл?",
    "Какое масло лучше?",
    "Какие запчасти подойдут?",
    "Опишите, что вас интересует...",
    "О чём вы хотите узнать?",
    "Чем помочь с вашей мототехникой?"
];

let placeholderIndex = 0;

function changePlaceholder() {

    input.style.opacity = "0";

    setTimeout(() => {

        placeholderIndex++;

        if (placeholderIndex >= placeholders.length) {
            placeholderIndex = 0;
        }

        input.placeholder = placeholders[placeholderIndex];

        input.style.opacity = "1";

    }, 350);

}

setInterval(changePlaceholder, 12000);

function createMessage(text, type) {

    const div = document.createElement("div");

    div.className = "message " + type;

    div.textContent = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

const hints = [

"Если захотите, можем поговорить о мотоциклах и ремонте.",

"Я лучше всего разбираюсь в мототехнике.",

"Моя основная специализация — двухколёсная техника.",

"Также могу помочь с диагностикой и обслуживанием."

];


function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    createMessage(text, "user");

    input.value = "";

    input.style.height = "28px";

    setTimeout(() => {

        createMessage(aiAnswer(text), "ai");

    }, 700);

}

sendButton.onclick = sendMessage;

input.addEventListener("keydown", function(e){

    if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});

input.addEventListener("input", function(){

    input.style.height = "28px";

    input.style.height = input.scrollHeight + "px";

});

shareButton.onclick = async function(){

    if(navigator.share){

        await navigator.share({

            title:"MotoAI",

            text:"Попробуй MotoAI",

            url:window.location.href

        });

    }else{

        navigator.clipboard.writeText(window.location.href);

        alert("Ссылка скопирована!");

    }

};
