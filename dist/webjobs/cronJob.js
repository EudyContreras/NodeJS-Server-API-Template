"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CronJob {
    constructor(label, interval, task) {
        this.label = label;
        this.interval = interval;
        this.task = task;
    }
}
exports.default = CronJob;
