const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const shareButton = document.getElementById("shareButton");
const chat = document.getElementById("chat");
const welcomeScreen = document.getElementById("welcomeScreen");
const conversation = [];



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

    conversation.push({
        role: "user",
        content: question
    });

    try {

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: conversation
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {

            const answer = data.choices[0].message.content;

            conversation.push({
                role: "assistant",
                content: answer
            });

            return answer;
        }

        return "Не удалось получить ответ.";

    } catch {

        return "Ошибка подключения к серверу.";

    }

}

function sendMessage() {



    const text = input.value.trim();

    if (text === "") return;

    createMessage(text, "user");
    if (welcomeScreen) {
    welcomeScreen.style.display = "none";
}

    input.value = "";
    sendButton.style.background = "#3a3a3a";
    sendButton.style.color = "#ffffff";

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

if(input.value.trim() === ""){
    sendButton.style.background = "#3a3a3a";
    sendButton.style.color = "#ffffff";
}else{
    sendButton.style.background = "#ffffff";
    sendButton.style.color = "#000000";
}
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
sendButton.style.background = "#3a3a3a";
sendButton.style.color = "#ffffff";
