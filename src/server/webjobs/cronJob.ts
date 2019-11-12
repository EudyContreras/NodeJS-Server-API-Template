import CronTask from "./cronTask";

export default class CronJob{
   public label: string;
   public interval: number;
   public task: CronTask

   constructor(label: string, interval: number, task: CronTask) {
      this.label = label;
      this.interval = interval;
      this.task = task;
   }
}