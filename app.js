#!/usr/bin/env node

const socketIO = require('socket.io-client');
const commander = require('commander');
const inquirer=require('inquirer');


const url = 'http://localhost:3000';

const newConnect = () => {
    const conn = socketIO(url);
    conn.emit('userConnect');
    conn.on('userConnectStatus', (status) => {
       console.log('Połączono z serwerem')
        // inquirer.prompt([{type:'input',message:'>',name:'userInput',prefix:' ',validate: function(value) {
        //     switch (value){
        //         case 'exit':
        //             process.exit(0);
        //             break;
        //         case 'message':
        //             console.log('send message');
        //             break;
        //         default:
        //             return 'Dostępne polecenia to: `exit`, `message`'
        //     }}}]).then(answers => {
        // });
    });

    conn.on('userDisconnectForceStatus', (logout) => {
        console.log(logout.info);
        process.exit(0)
    });

    conn.on('serverShutdownStatus', () => {
        console.log('Rozłączono: serwer wyłączony');
        process.exit(0);
    });

    conn.on('serverRestartStatus', () => {
        console.log('Rozłączono: serwer zrestartowany');
        process.exit(0);
    });
    conn.on('userNewMessage', (message) => {
        console.log(`Wiadomość od administratora: ${message.info}`);
        conn.emit('messageDelivered');
    });
};

commander
    .version('0.1.0');

commander
    .command('newConnect')
    .alias('connect')
    .action(() => {
        newConnect();
    })

commander.parse(process.argv);