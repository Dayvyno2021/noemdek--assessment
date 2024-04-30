import {useCallback, useMemo, useState} from 'react'
import { driverData, dateSelections, vehiclesData, DateSelectionsType } from '../data';
import Calendar from 'react-calendar';
import { Value, getCurrentWeek, months, singleDayInMilliSeconds, dateRange } from '../helper/currentWeek';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

enum Rep{
  driver = "Drivers",
  vehicle = "Vehicles",
}

export enum DateDataType{
  day = "Day",
  week = "Week",
  month = "Month"
}

const ScheduleContent = () => {
  //Handle selections between driver and vehicles
  const [schedule, setSchedule] = useState('Drivers');

  const [dateType, setDateType] = useState<DateSelectionsType[]>(dateSelections);
  const [value, onChange] = useState<Value>(getCurrentWeek());

  const onDateSelect = (ind: number) => {
    const clonedDate = structuredClone(dateSelections);
    const newDateSelection = clonedDate.map((d, i) => {
      if (i === ind) {
        d.selected = true;
      } else {
        d.selected = false;
      }
      return d;
    })
    setDateType(newDateSelection)
  }

  //Retrieve date title selected
  const selectedDateType = useMemo(() => {
    return dateType?.find((date) => date.selected)?.title;
  }, [dateType])

  //This will return week days in this format [Sun 15, Mon 16, ....]
  const getWeekDays = useCallback(() => {
    const dayInString = (val:number) => {
      return days[(new Date(val).getDay())]
    }

    const dayInNumber = (val: number) => {
      return new Date(val).getDate();
    }
    let dateStorage: string[] = [];

    const startDate = Array.isArray(value) && value !== null ? value[0] : 0;
    const endDate = Array.isArray(value) && value !== null ? value[1] : 0;
    if (startDate) {//when date selection is week
      if (selectedDateType === DateDataType.week) {
        let lastSecondsDate = endDate? Date.parse(endDate.toDateString()) : 0;
        let secondsDate = Date.parse(startDate.toDateString());
        dateStorage.push(`${dayInString(secondsDate)} ${dayInNumber(secondsDate)}`)
        while ( lastSecondsDate && secondsDate <= lastSecondsDate ){
          secondsDate = secondsDate + singleDayInMilliSeconds;
          dateStorage.push(`${dayInString(secondsDate)} ${dayInNumber(secondsDate)}`)
        }
      } else if (selectedDateType === DateDataType.day) {
        let presentMonthInNumber = startDate ? startDate.getMonth() : new Date().getMonth();
        const d = new Date(startDate)
        let newDate = d.setFullYear(startDate.getFullYear(), presentMonthInNumber, 1);
        const maxMonthNumber = months[presentMonthInNumber].max;
        dateStorage.push(`${dayInString(newDate)} ${dayInNumber(newDate)}`)
        for (let i = 0; i < maxMonthNumber-1; i++){
          newDate = newDate + singleDayInMilliSeconds;
          dateStorage.push(`${dayInString(newDate)} ${dayInNumber(newDate)}`)
        }
      } else { //When date selection is in Month
        dateStorage = months.map((month) => {
          return month.month;
        })
      }
    } 
    return dateStorage;
  }, [value, dateType])

  const repType = useMemo(() => {
    if (schedule === Rep.driver) {
      return driverData;
    }
    return vehiclesData
  }, [schedule]);

  return (
    <div className="schedule-content">
      <div className="schedule-content-options">
        <div className="select">
          <label htmlFor="schedule" className='header--large'>Schedule for</label>
          <div className="input--control">
            <select name="schedule" id="schedule" onChange={(e)=>setSchedule(e.target.value)}>
              {
                [Rep.driver, Rep.vehicle].map((item) => (
                  <option key={item} value={item}> {item} </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="schedule--view">
          <p className="header--large">View:</p>
          <div className="schedule--view--date">
            {
              dateType.map((d, i) => (
                <button onClick={()=>onDateSelect(i)} className={`btn--date ${d.selected? "btn--primary":"btn--white"}`} key={d.title}> {d.title} </button>
              ))
            }
          </div>
        </div>
      </div>
      <div className="schedule-content--main">
        <div className="main--title hide">
          <p className='header--large text--center'> {dateRange(value, selectedDateType!)} </p>
        </div>
        <div className="calender">
          <div className="calender--display">
            <Calendar
              onChange={onChange}
              value={value}
              className={``}
              selectRange={true}
            />
          </div>
          <div className="calender--table">
            <table id='schedule-table'>
              <thead>
                <tr>
                  <th className='first--column'>{schedule}</th>
                  {
                    getWeekDays()?.map((day) => (
                      <th key={day}> {day} </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  repType?.map((rep) => (
                    <tr key={rep?.name}>
                      <td className="schedule-table__contain first--column">
                        <img src={rep?.image} alt={rep?.name} />
                        <span className="schedule-table__texts">
                          <h3 className='header--light'> {rep?.name} </h3>
                          <p className='font--small'> {rep?.position} </p>
                          {
                            schedule === Rep.vehicle ? (
                              <p className={`${rep.repair ? "danger" : "success"}`}>
                                {
                                  rep?.repair? "Needs Repair" : "Great Condition"
                                }
                              </p>
                            ):('')
                          }
                        </span>
                      </td>
                    </tr>  
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleContent