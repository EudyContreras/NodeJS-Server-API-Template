
import ErrorHandler from '../handlers/error.handler';
import LoggingHandler from '../handlers/logging.handler';

import { Job } from 'agenda';

interface ICronTask {
    performTask(logger: LoggingHandler, errorHandler: ErrorHandler, job: Job | null): void;
}

export default ICronTask;
