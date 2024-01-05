"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEnvFromFlag = exports.buildCommand = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const core_1 = require("@oclif/core");
function buildCommand(args) {
    if (args.length === 1) {
        // do not add quotes around arguments if there is only one argument
        // `heroku run "rake test"` should work like `heroku run rake test`
        return args[0];
    }
    let cmd = '';
    for (let arg of args) {
        if (arg.includes(' ') || arg.includes('"')) {
            arg = '"' + arg.replace(/"/g, '\\"') + '"';
        }
        cmd = cmd + ' ' + arg;
    }
    return cmd.trim();
}
exports.buildCommand = buildCommand;
function buildEnvFromFlag(flag) {
    const env = {};
    for (const v of flag.split(';')) {
        const m = v.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        // @ts-ignore
        if (m)
            env[m[1]] = m[2];
        else
            core_1.ux.warn(`env flag ${v} appears invalid. Avoid using ';' in values.`);
    }
    return env;
}
exports.buildEnvFromFlag = buildEnvFromFlag;
