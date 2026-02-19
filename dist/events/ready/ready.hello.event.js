"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vimcord_1 = require("vimcord");
exports.default = new vimcord_1.EventBuilder({
    event: "ready",
    name: "Ready.Hello",
    async execute(client) {
        console.log("Hello world!");
    }
});
