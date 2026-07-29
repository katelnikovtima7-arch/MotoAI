const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const shareButton = document.getElementById("shareButton");
const chat = document.getElementById("chat");

const placeholders = [
    "Чем я могу помочь?",
    "Спросите MotoAI...",
    "Как выбрать мотоцикл?",
    "Какие запчасти подойдут?",
    "Опишите проблему...",
    "Задайте любой вопрос...",
    "О чём вы хотите узнать?",
    "Чем помочь с вашей техникой?"
];

let currentPlaceholder = 0;

function changePlaceholder(){

    input.style.opacity = "0";

    setTimeout(()=>{

        currentPlaceholder++;

        if(currentPlaceholder >= placeholders.length){
            currentPlaceholder = 0;
        }

        input.placeholder = placeholders[currentPlaceholder];

        input.style.opacity = "1";

    },400);

}

setInterval(changePlaceholder,12000);

function createMessage(text,type){

    const div = document.createElement("div");

    div.className = "message " + type;

    div.textContent = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

const endings=[

"Кстати, моя основная специализация — мототехника.",
"Лучше всего я разбираюсь в мотоциклах, скутерах и питбайках.",
"Если захотите, можем поговорить о двухколёсной технике.",
"Также могу помочь с ремонтом и диагностикой."

];

function aiAnswer(question){

    const q=question.toLowerCase();

    const motoWords=[
        "мото",
        "скут",
        "пит",
        "альфа",
        "двиг",
        "карб",
        "масл",
        "цеп",
        "свеч",
        "ремонт",
        "вариатор",
        "колес",
        "техник"
    ];

    let moto=false;

    motoWords.forEach(word=>{

        if(q.includes(word)){
            moto=true;
        }

    });

    if(moto){

        return "Пока что MotoAI работает в демонстрационном режиме. Совсем скоро здесь будет подключён настоящий искусственный интеллект, который сможет подробно отвечать на любые вопросы по мототехнике.";

    }

    const random=endings[Math.floor(Math.random()*endings.length)];

    return "Конечно, я могу отвечать и на обычные вопросы. Но всё же я создан прежде всего для помощи с мототехникой.\n\n"+random;

}

function sendMessage(){

    const text=input.value.trim();

    if(text==="") return;

    createMessage(text,"user");

    input.value="";
    input.style.height="26px";

    setTimeout(()=>{

        createMessage(aiAnswer(text),"ai");

    },600);

}

sendButton.onclick=sendMessage;

input.addEventListener("keydown",e=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});

input.addEventListener("input",()=>{

    input.style.height="26px";

    input.style.height=input.scrollHeight+"px";

});

shareButton.onclick=async()=>{

    if(navigator.share){

        await navigator.share({

            title:"MotoAI",

            text:"Попробуй MotoAI",

            url:window.location.href

        });

    }else{

        await navigator.clipboard.writeText(window.location.href);

        alert("Ссылка скопирована!");

    }

};
