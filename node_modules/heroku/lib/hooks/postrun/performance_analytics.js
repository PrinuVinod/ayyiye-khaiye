"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telemetry = require("../../global_telemetry");
const performance_analytics = async function () {
    if (global.cliTelemetry) {
        const cmdStartTime = global.cliTelemetry.commandRunDuration;
        global.cliTelemetry.commandRunDuration = telemetry.computeDuration(cmdStartTime);
        global.cliTelemetry.lifecycleHookCompletion.postrun = true;
    }
};
exports.default = performance_analytics;
