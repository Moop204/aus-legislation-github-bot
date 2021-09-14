"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var octokit_1 = require("octokit");
var octokit = new octokit_1.Octokit({ auth: process.env.PAT });
var login = (await octokit.rest.users.getAuthenticated()).data.login;
console.log("Login %s", login);
