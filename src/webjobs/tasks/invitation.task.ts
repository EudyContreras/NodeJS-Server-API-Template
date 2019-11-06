import CronTask from "../cronTask";
import ErrorHandler from "../../handlers/error.handler";
import LoggingHandler from "../../handlers/logging.handler";

import { Job } from "agenda";

export class InvitationTask implements CronTask {

   performTask(logger: LoggingHandler, errorHandler: ErrorHandler, job: Job | null): void {
      throw new Error("Method not implemented.");
   }

   private async removedExpiredInvitation() {
      
   }
}