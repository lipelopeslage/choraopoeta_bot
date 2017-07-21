const http = require('http');

const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `399186909:AAG2S4Yx1vuWDdaSHwyOJyoYLcyU81y8qZs`

const bot = new TelegramBot( TOKEN, { polling: true } )

var timeout = 0;

const TIME = 1800000;

const msgs = [
    `Eles querem que você se sinta mal, pois assim eles se sentem bem.`,
    `As flores são bonitas em qualquer lugar do mundo muita gente tem forma mais não tem conteúdo`,
    `Cada escolha 
    Uma renúncia 
    Essa é a vida.`,
    `Meu estilo de vida
Liberta minha mente
Completamente louco
Mas um louco consciente...`,
    `O melhor presente Deus me deu, a vida me ensinou a lutar pelo que é meu...`,
    `Às vezes faço o que quero
Às vezes faço o que tenho que fazer`,
    `O que se leva dessa vida é o que se vive, é o que se faz.`,
    `O amor é a paz de Deus que nunca acaba!`,
    `Às vezes fico acordado à noite, e eu pergunto: “Onde eu tenho errado?”
Então uma voz me diz: “Isso vai levar mais de uma noite.”`,
    `Cada um tem sua história. Eu estou aqui pra aprender, não pra julgar.`,
    `Minha mente nem sempre tão lúcida fez ela se afastar.`,
    `Parecia inofensiva
    mas te dominou.`,
    `Nossas vidas, nossos sonhos têm o mesmo valor.`,
    `Mas um homem de verdade não se faz só com palavras.`,
    `Com a cabeça erguida e mantendo a fé em Deus.`,
    `Que bom viver, como é bom sonhar.`,
    `Só por uma noite
Mas se é difícil pra você tudo bem
Quando a gente se diverte com o que tem`
];

const lastMsgs = new Array(msgs.length);

const getRand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const randomMsg = () => {
    var msg = msgs[getRand(0, msgs.length-1)];
    return msg;
}

const isInHistory = (theMsg) => {
    var checkArray = lastMsgs.slice(0);
    return checkArray.filter((msg) => {
        return msg === theMsg;
    }).length > 0;
}

const checkHistory = (theMsg) => {
    var msg = randomMsg();
    if(isInHistory(theMsg)){
        console.log("[ERRO]", theMsg, "ESTA NO HISTORICO, checar", msg)
        return checkHistory(msg);
    }else{
        console.log("[OK]", theMsg, "NAO ESTA NO HISTORICO")
        return theMsg;
    }
}

const sendMsg = (msg, match) => {
    var text = msg.text.toLowerCase();
    var msgToSend = "mentira, isso tudo é mentira";
    if(text.match(/(amor|calma|paz|assim)/)){
        bot.sendMessage( msg.chat.id, msgToSend);
    }else if(!text.match(/\/start/)){
        msgToSend = checkHistory(randomMsg());
        setTimeout(() => {
            bot.sendMessage( msg.chat.id, msgToSend);
        }, Math.random()*4000);
    }
    lastMsgs[0] = msgToSend;
    for(var i = 0, total = msgs.length - 1; i < total; i++){
        lastMsgs[i+1] = lastMsgs[i];
    }
}

const autoMsg = () => {
    clearTimeout(timeout);
    bot.sendMessage( msg.chat.id, checkHistory(randomMsg()));
    timeout = setTimeout(autoMsg, TIME);
}

bot.onText( /(^\/start|.*)/, sendMsg);
timeout = setTimeout(autoMsg, TIME);
console.log('rodando bot...')

http.createServer(()=>{}).listen(process.env.PORT || 6000)