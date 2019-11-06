"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agenda_1 = __importDefault(require("agenda"));
const vault_1 = __importDefault(require("../config/vault"));
const message_response_1 = require("../messages/message.response");
class JobHandler {
    /**
     * Constructs a Scheduling Service with the given haandlers
     * and database connection string used by AgendaJS. AgendaJS
     * handles the internal job scheduling of this service.
     * @param logger The logging handler used for logging
     * different types of events.
     * @param errorHandler The error handler used for handling
     * any type of error that can occur within this service.
     * @param dbConnectionString The connection string to our mongoDB
     */
    constructor(logger, errorHandler, dbConnectionString) {
        this.logger = logger;
        this.errorHandler = errorHandler;
        this.agenda = new agenda_1.default({ db: { address: dbConnectionString } });
    }
    /**
     * Defines a job which is to be scheduled.
     * @param cronJob The data about the job
     * @param task The task to be performed.
     */
    scheduleJob(cronJob, runImmediately = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = {
                priority: vault_1.default.agenda.PRIORITY,
                concurrency: vault_1.default.agenda.CONCURRENCY
            };
            const task = cronJob.task;
            this.agenda.define(cronJob.label, option, (job) => __awaiter(this, void 0, void 0, function* () {
                task.performTask(this.logger, this.errorHandler, job);
            }));
            if (runImmediately) {
                task.performTask(this.logger, this.errorHandler, null);
            }
            startJob(this, cronJob);
        });
    }
}
exports.default = JobHandler;
/**
 * Starts the scheduled job that matches the
 * label inside the cron job data.
 * @param scheduler The service back by agendaJS.
 * @param cronJob The data containing information
 * about what job to start.
 */
function startJob(scheduler, cronJob) {
    return __awaiter(this, void 0, void 0, function* () {
        yield scheduler.agenda.start();
        yield scheduler.agenda.every(cronJob.interval, cronJob.label);
        scheduler.logger.logInfo(message_response_1.SchedulerMessages.notifyStart(cronJob));
    });
}
