import { DateDataType } from "../components/ScheduleContent";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export const months = [
  {month:"January", max: 31},
  {month: "February", max: 28},
  {month: "March", max: 31},
  {month:"April", max: 30},
  {month:"May", max: 31},
  {month:"June", max: 30},
  {month:"July", max: 31},
  {month:"August", max: 31},
  {month:"September", max: 30},
  {month:"October", max: 31},
  {month:"November", max: 30},
  {month:"December", max: 31}];
export const singleDayInMilliSeconds = 1 * 24 * 60 * 60 * 1000;
//Get Active week
export function getCurrentWeek(): Value {
  const weekDay = new Date().getDay();
  switch (weekDay) {
    case 0:
      return validDate(0, 6);
    case 1:
      return validDate(1, 5);
    case 2:
      return validDate(2, 4);
    case 3:
      return validDate(3, 3);
    case 4:
      return validDate(4, 2);   
    case 5:
      return validDate(5, 1);  
    case 6:
      return validDate(6, 0);
    default:
      return validDate(0, 6);
  }
}

function validDate(min: number, max: number):Value {
  const today = Date.now();
  return [new Date(today - (singleDayInMilliSeconds * min)), new Date(today + (singleDayInMilliSeconds * max))];
}

//Get week range header
export function dateRange(dateRange: Value, rangeType: string):string {
  const startDay = Array.isArray(dateRange) && dateRange !== null ? new Date(dateRange[0]!).getDate().toString() : '';
  const endDay = Array.isArray(dateRange) && dateRange !== null ? new Date(dateRange[1]!).getDate().toString() : '';
  const startMonth = Array.isArray(dateRange) && dateRange !== null ? new Date(dateRange[0]!).getMonth(): 0;
  const endMonth = Array.isArray(dateRange) && dateRange !== null ? new Date(dateRange[1]!).getMonth(): 0;
  const startYear = Array.isArray(dateRange) && dateRange !== null ? new Date(dateRange[0]!).getFullYear().toString() : '';
  const endYear = Array.isArray(dateRange) && dateRange !== null ? new Date(dateRange[1]!).getFullYear().toString() : '';

  if (rangeType === DateDataType.week) {
    if (endYear === startYear) {
      if (endMonth === startMonth) {
        return `${months[startMonth].month} ${startDay} - ${endDay}, ${endYear}`
      }
      return `${months[startMonth].month +" " + startDay} - ${months[endMonth].month + " " + endDay}, ${endYear}`
    }
    return `${months[startMonth].month +" " + startDay}, ${startYear} - ${months[endMonth].month + " " + endDay}, ${endYear}` 
  } else if (rangeType === DateDataType.day) {
    return `${months[startMonth].month} 01 - ${months[startMonth].max}, ${endYear}`
  } else {
    return "Year: " + startYear;
  }
}
