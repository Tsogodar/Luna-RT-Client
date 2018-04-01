#!/usr/bin/env node

const socketClient=require('socket.io-client');
const request=require('request');
const commander = require('commander');

const url = 'http://localhost:3000';

const conn=socketClient(url);

const newConnect=()=>{
    request(url,(err,res,body)=>{
        let requestTime=new Date().getTime();
        console.info(`Próba połączenia z serwerem...`);
        conn.on('connectOk', () => {
            let responseTime = new Date().getTime();
            console.info(`Serwer stworzył połączenie...`)
            console.info(`Czas uzyskania połączenia: ${responseTime - requestTime} milisekund`)
        })
    })
}

commander
    .version('0.1.0')
    
commander
    .command('nweConnect')
    .alias('connect')
    .action(() => {
        newConnect();
    })

commander.parse(process.argv);