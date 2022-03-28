const { Client, Collection } = require('discord.js')
const { readdirSync, statSync, readFile } = require('fs')
module.exports = class Main extends Client {
    constructor (options = {}) {
        super (options)
        this.fs = require("fs")
        this.path = require('path')
        this.commands = new Collection()
        this.Discord = require('discord.js')
        this.initializeCommands('./Commands')
        this.initializeEvents('./Events')
        this.fetch = require("node-fetch")
    }

    initializeCommands (path) {
        readdirSync(path).forEach(file => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    const Command = require(filePath)
                    const commandName = file.replace(/.js/g,'').toLowerCase()
                    const command = new Command(commandName, this, filePath)
                    this.commands.set(commandName, command, filePath)
                    console.log('[INFO] Comandos carregados')
                } else if (statSync(filePath).isDirectory()) { 
                    this.initializeCommands(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    };

    initializeEvents (path) {
        readdirSync(path).forEach(file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    let Listener = require(filePath)
                    this.on(file.replace(/.js/g, ''), Listener)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeEvents(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
        console.log('[INFO] Eventos carregados')
    };
}