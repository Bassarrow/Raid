const readline = require('readline');
const os = require('os');
const { ascii } = require('./ascii.js');
const { exec } = require('child_process');

console.log(`Bonjour ${os.userInfo().username} !`);
console.log(ascii.art);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function poserQuestion() {
    rl.question("compte=1 bot=2\n", function(choix) {
        if (choix === "1") {
            console.clear();
            rl.close();
            require('./compte.js');
        } else if (choix === "2") {
            console.clear();
            console.log("Tu as choisi 2 !");
            rl.close();
            require('./bot.js');
        } else {
            console.log("Choix invalide. Tu dois entrer 1 ou 2.");
            poserQuestion();
        }
    });
}

poserQuestion();
