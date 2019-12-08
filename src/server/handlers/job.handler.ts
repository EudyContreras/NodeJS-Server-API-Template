import Agenda from 'agenda';
import config from '../config';
import CronJob from '../webjobs/cronJob';
import CronTask from '../webjobs/cronTask';
import ErrorHandler from './error.handler';
import LoggingHandler from './logging.handler';

import { SchedulerMessages } from '../messages/message.response';

/**
 * Starts the scheduled job that matches the
 * label inside the cron job data.
 * @param scheduler The service back by agendaJS.
 * @param cronJob The data containing information
 * about what job to start.
 */
async function startJob(scheduler: JobHandler, cronJob: CronJob): Promise<void> {

	await scheduler.agenda.start();
	await scheduler.agenda.every(cronJob.interval, cronJob.label);

	scheduler.logger.logInfo(SchedulerMessages.notifyStart(cronJob));
}

export default class JobHandler {

	public agenda: Agenda;
	public logger: LoggingHandler;
	private errorHandler: ErrorHandler;

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
	constructor(logger: LoggingHandler, errorHandler: ErrorHandler, dbConnectionString: string) {
		this.logger = logger;
		this.errorHandler = errorHandler;
		this.agenda = new Agenda({ db: { address: dbConnectionString } });
	}

	/**
	 * Defines a job which is to be scheduled.
	 * @param cronJob The data about the job
	 * @param task The task to be performed.
	 */
	public async scheduleJob(cronJob: CronJob, runImmediately = false): Promise<void> {
		const option = {
			priority: config.agenda.PRIORITY,
			concurrency: config.agenda.CONCURRENCY
		};

		const task: CronTask = cronJob.task;

		this.agenda.define(cronJob.label, option, async (job) => {
			task.performTask(this.logger, this.errorHandler, job);
		});

		if (runImmediately) {
			task.performTask(this.logger, this.errorHandler, null);
		}
		startJob(this, cronJob);
	}
}
