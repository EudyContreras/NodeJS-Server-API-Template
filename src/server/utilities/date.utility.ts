/**
 * @description Gets a simple readable string for a specified date.
 * @param date 
 */
export function normalize(date: Date) {

   let year = date.getFullYear().toString();
   let month = (date.getMonth() + 1).toString();
   let day =  date.getDate().toString();

   if (month.length < 2)
      month = '0' + month;
   if (day.length < 2)
      day = '0' + day;

   return [year, month, day].join('-');
}

export default {
   normalize
};