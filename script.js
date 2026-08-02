const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const shareButton = document.getElementById("shareButton");
const chat = document.getElementById("chat");
const welcomeScreen = document.getElementById("welcomeScreen");



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

async function aiAnswer(question) {

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                messages: [

                    {
                        role: "system",
                        content: "Ты MotoAI. Отвечай всегда на русском языке. Ты отлично разбираешься в мотоциклах, скутерах, мопедах, питбайках, ремонте, диагностике, обслуживании и подборе запчастей. Если вопрос не связан с мототехникой — тоже отвечай."
                    },

                    {
                        role: "user",
                        content: question
                    }

                ]

            })

        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {

            return data.choices[0].message.content;

        }

        return "Не удалось получить ответ.";

    } catch (e) {

        return "Ошибка подключения к серверу.";

    }

}
function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    createMessage(text, "user");

    input.value = "";

    input.style.height = "28px";

    setTimeout(async () => {

    const answer = await aiAnswer(text);

    createMessage(answer, "ai");

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
