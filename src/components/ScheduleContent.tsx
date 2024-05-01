import {useCallback, useMemo, useState} from 'react'
import { driverData, dateSelections, vehiclesData, DateSelectionsType } from '../data';
import Calendar from 'react-calendar';
import { Value, getCurrentWeek, months, singleDayInMilliSeconds, dateRange } from '../helper/currentWeek';
import Modal from './Modal';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

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

export enum Drv {
  david = "David James",
  charles = "Charles Erikson",
  sunday = "Sunday Abu"
}

export enum Veh {
  lexus500 = "Lexus GLS 500",
  lexus450 = "Lexus GLS 450",
  camry = "Toyota Camry"
}

interface DateStorageProps {
  duration: string;
  repTitle: string[];
  username: string;
  company: string;
  driver: string,
  vehicle: string;
}

const ScheduleContent = () => {
  //Handle selections between driver and vehicles
  const [schedule, setSchedule] = useState('Drivers');

  const [dateType, setDateType] = useState<DateSelectionsType[]>(dateSelections);
  const [value, onChange] = useState<Value>(getCurrentWeek());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContents, setModalContents] = useState<Partial<DateStorageProps>>({})
  // const [weekDayData, setWeekDayData] = useState<StoragePropsType[]>([])

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
  const scheduleInfo = useCallback(() => {
    const dayInString = (val:number) => {
      return days[(new Date(val).getDay())]
    }

    const dayInNumber = (val: number) => {
      return new Date(val).getDate();
    }
    let dateStorage: DateStorageProps[] = [];

    const startDate = Array.isArray(value) && value !== null ? value[0] : 0;
    const endDate = Array.isArray(value) && value !== null ? value[1] : 0;
    if (startDate) {//when date selection is week
      if (selectedDateType === DateDataType.week) {
        let lastSecondsDate = endDate? Date.parse(endDate.toDateString()) : 0;
        let secondsDate = Date.parse(startDate.toDateString());
        let count = 0;
        while (lastSecondsDate && secondsDate <= lastSecondsDate) {
          let duration = `${dayInString(secondsDate)} ${dayInNumber(secondsDate)}`;
          dateStorage.push({driver: '', vehicle: '', duration, repTitle: [], username: "", company: ""})
          if (duration === "Mon 29") {
            dateStorage[count].repTitle = ['Lexus GLS 500', 'Wisdom Ademola'];
            dateStorage[count].username = "Clinton";
            dateStorage[count].company = "British Petroleum";
            dateStorage[count].driver = Drv.david;
            dateStorage[count].vehicle = Veh.lexus500;
          }
          secondsDate = secondsDate + singleDayInMilliSeconds;
          count++;
        }
      } else if (selectedDateType === DateDataType.day) {
        let presentMonthInNumber = startDate ? startDate.getMonth() : new Date().getMonth();
        const d = new Date(startDate)
        let newDate = d.setFullYear(startDate.getFullYear(), presentMonthInNumber, 1);
        const maxMonthNumber = months[presentMonthInNumber].max;
        const duration = `${dayInString(newDate)} ${dayInNumber(newDate)}`
        dateStorage.push({driver: '', vehicle:'', duration, repTitle: [], username: '', company: ''})
        for (let i = 0; i < maxMonthNumber-1; i++){
          newDate = newDate + singleDayInMilliSeconds;
          const duration = `${dayInString(newDate)} ${dayInNumber(newDate)}`
          dateStorage.push({driver:'', vehicle:'', duration, repTitle: [], username: '', company: ''})
        }
      } else { //When date selection is in Month
        dateStorage = months.map((month) => {
          return {driver:'', vehicle:'', duration: month.month, repTitle: [], username: '', company: ''};
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

  const onSchedule = (obj: DateStorageProps) => {
    setShowModal(true);
    setModalContents(obj);
  }

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
              selectRange={true}
              calendarType='gregory'
            />
          </div>
          <div className="calender--table">
            <table id='schedule-table'>
              <thead>
                <tr>
                  <th className='first--column'>{schedule}</th>
                  {
                    scheduleInfo()?.map((day) => (
                      <th key={day.duration}> {day.duration} </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="schedule-table__contain first--column">
                    <img src={repType[0].image} alt={repType[0].name} />
                    <span className="schedule-table__texts">
                      <h3 className='header--light'> {repType[0]?.name} </h3>
                      <p className='font--small'> {repType[0]?.position} </p>
                      {
                        schedule === Rep.vehicle ? (
                          <p className={`${repType[0].repair ? "danger" : "success"}`}>
                            {
                              repType[0]?.repair? "Needs Repair" : "Great Condition"
                            }
                          </p>
                        ):('')
                      }
                    </span>
                  </td>
                  {
                    scheduleInfo()?.map((rep) =>  (
                      <td key={Math.random()}>
                        {
                          rep?.driver === Drv.david && 
                            <div onClick={()=>onSchedule(rep)} className={rep?.repTitle.length ? "data--filled" : ''}>
                              <h5> {schedule === Rep.driver?  rep?.repTitle[0]: rep?.repTitle[1]} </h5>
                              <span>{rep?.username} </span>
                              <span> {rep?.company} </span>
                            </div>
                        }
                      </td>
                      )
                    ) 
                  }
                </tr>
                <tr>
                  <td className="schedule-table__contain first--column">
                    <img src={repType[1].image} alt={repType[1].name} />
                    <span className="schedule-table__texts">
                      <h3 className='header--light'> {repType[1]?.name} </h3>
                      <p className='font--small'> {repType[1]?.position} </p>
                      {
                        schedule === Rep.vehicle ? (
                          <p className={`${repType[1].repair ? "danger" : "success"}`}>
                            {
                              repType[1]?.repair? "Needs Repair" : "Great Condition"
                            }
                          </p>
                        ):('')
                      }
                    </span>
                  </td>
                  {
                    scheduleInfo()?.map((rep) =>  (
                      <td key={Math.random()}>
                        {
                          rep?.driver === Drv.charles && 
                            <div onClick={()=>setShowModal(true)} className={rep?.repTitle ? "data--filled" : ''}>
                              <h5> {rep?.repTitle} </h5>
                              <span>{rep?.username} </span>
                              <span> {rep?.company} </span>
                            </div>
                        }
                      </td>
                      )
                    ) 
                  }
                </tr>
                <tr>
                  <td className="schedule-table__contain first--column">
                    <img src={repType[2].image} alt={repType[2].name} />
                    <span className="schedule-table__texts">
                      <h3 className='header--light'> {repType[2]?.name} </h3>
                      <p className='font--small'> {repType[2]?.position} </p>
                      {
                        schedule === Rep.vehicle ? (
                          <p className={`${repType[2].repair ? "danger" : "success"}`}>
                            {
                              repType[2]?.repair? "Needs Repair" : "Great Condition"
                            }
                          </p>
                        ):('')
                      }
                    </span>
                  </td>
                  {
                    scheduleInfo()?.map((rep) =>  (
                      <td key={Math.random()}>
                        {
                          rep?.driver === Drv.sunday && 
                            <div onClick={()=>onSchedule(rep)} className={rep?.repTitle ? "data--filled" : ''}>
                              <h5> {rep?.repTitle} </h5>
                              <span>{rep?.username} </span>
                              <span> {rep?.company} </span>
                            </div>
                        }
                      </td>
                      )
                    ) 
                  }
                </tr>
              </tbody>
            </table>
          </div>
            {
              showModal && (
              <Modal>
                <div className="schedule--modal" onClick={() => { setShowModal(false)}} >
                  <div className="overview schedule--detail" onClick={(e)=>e.stopPropagation()}>
                    <div className="overview--edit px1">
                      <h1>Schedule Overview</h1>
                      <div className="overview--edit__icons">
                        <span className='edit'><MdModeEdit/></span>
                        <span className='edit'> <MdDelete /> </span>
                        <span onClick={()=>setShowModal(false)}> <MdClose className='close' /> </span>
                      </div>
                    </div>
                    <hr />
                    <div className="overview--car">
                      <img src="/images/lexus500.png" alt="Lexus 500" />
                      <div className="overview--car__details">
                        <h3> {modalContents?.vehicle} </h3>
                        <p> Full Size SUV </p>
                        <p>Needs Repair</p>
                      </div>
                    </div>
                    <div className="overview--detail px1">
                      <div className="overview--detail__texts">
                        <h4>Driver</h4>
                        <p> {modalContents?.driver} </p>
                      </div>
                      <div className="overview--detail__texts">
                        <h4>Customer:</h4>
                        <p> {modalContents?.username} </p>
                      </div>
                      <div className="overview--detail__texts">
                        <h4>Service:</h4>
                        <p> Full Day Rental </p>
                      </div>
                      <div className="overview--detail__texts">
                        <h4>Start Date:</h4>
                        <p> {modalContents?.duration} </p>
                      </div>
                      <div className="overview--detail__texts">
                        <h4>Start Date:</h4>
                        <p> {modalContents?.duration} </p>
                      </div>
                      <div className="overview--detail__texts-2">
                        <h4>Pickup Location: </h4>
                        <p> Zuma Close, Osborne Phase 1 Estate, Ikoyi </p>
                      </div>
                      <div className="overview--detail__texts-2">
                        <h4>Drop-Off Location: </h4>
                        <p> Same as Pickup Location </p>
                      </div>
                    </div>
                    <hr />
                    <div className="overview--ratings px1 py05">
                      <h4>Ratings: </h4>
                      <div className="overview--ratings__stars">
                        {
                          [...Array(5).keys()].map((_ob) => (
                            <FaRegStar key={Math.random()} className='icon-grey' />
                          ))
                        }
                      </div>
                    </div>
                    <form className='overview--form py05'>
                      <textarea name="overview--text-area" id="" cols={30} placeholder='Comment...' rows={3}></textarea>
                      <div className="buttons">
                        <button className="clear">Clear</button>
                        <button className="save">Save</button>
                      </div>
                    </form>
                    <hr />
                    <div className="overview--creators px1 py05">
                      <span className='font--small'>Created By: Okafor David</span>
                      <span className='font--small'>Last Edit By: Okafor David</span>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
        </div>
      </div>
    </div>
  )
}

export default ScheduleContent