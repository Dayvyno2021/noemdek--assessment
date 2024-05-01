import { PiUsersThreeBold } from "react-icons/pi";
import { ImPriceTag } from "react-icons/im";
import { TbDatabaseDollar } from "react-icons/tb";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import NotificationIcon from "./components/notificationIcon";
import { IoIosHelpCircle } from "react-icons/io";

export interface NavElementsType{
  title: string,
  links: string[],
  open: boolean,
  children: string[]
}

export interface RepType{
  name: string,
  position: string,
  image: string,
  repair?: boolean
  weeks?: {[key:string]: {}}
}

export interface DateSelectionsType {
  title: string,
  selected: boolean
}

export const icons = [
  <PiUsersThreeBold />,
  <ImPriceTag />,
  <TbDatabaseDollar />,
  <MdOutlineIntegrationInstructions color="#94a3b8" />,
  <ImPriceTag />,
  <MdOutlineSettings />
]

export const navElements: NavElementsType[] = [
  {title: 'Business Development', open: false, children: [], links:[]},
  {title: 'Reservations', open: false, children: ['Bookings', 'Scheduling'], links:['/bookings', '/scheduling']},
  {title: 'Operations', open: false, children: [], links:[]},
  {title: 'Infrastructure', open: false, children: [], links:[]},
  {title: 'Reports & Tools', open: false, children: [], links:[]},
  {title: 'Setup', open: false, children: [], links:[]},
]

export const topics = [
  { title: "Notificatioons", icon: <NotificationIcon />, link: '/notifications', spot: true},
  { title: "Tools", icon: <MdOutlineSettings />, link: '/tools', spot: false },
  {title: "Help", icon: <IoIosHelpCircle/>, link: '/help', spot: false}
]

export const metricData = [
  {amount: "500", profit: '+12.6%', header: 'Revenue', desc: '(Last 30 Days)'},
  {amount: "300", profit: '+12.6%', header: '', desc: 'Gross Margin'},
  {amount: "200", profit: '+12.6%', header: 'ROI', desc: 'for Vehicle'},
  {amount: "500m", profit: '+12.6%', header: 'Avg. Rental Rate', desc: 'accross Fleets'},
  {amount: "300m", profit: '+12.6%', header: 'Annual', desc: 'Gain'},
]

export const dateSelections: DateSelectionsType[] = [
  {title: 'Day', selected: false},
  {title: 'Week', selected: true},
  {title: 'Month', selected: false},
]

export const driverData: RepType[] = [
  {name: "David James", position: "Senior Driver", image: '/images/james.png'},
  {name: "Charles Erikson", position: "Senior Driver", image: '/images/charles.png'},
  {name: "Sunday Abu", position: "Standard Driver", image: '/images/sunday.png'}
]
export const vehiclesData: RepType[] = [
  { name: "Lexus GLS 500", position: "Full Size SUV", image: '/images/lexus500.png', repair: true },
  { name: "Lexus GLS 350", position: "Full Size SUV", image: '/images/lexus450.png', repair: false },
  { name: "Toyota Camry", position: "Mid Size Sedan", image: '/images/camry.png', repair: false }
]

  // repTitle: string,
  // username: string,
  // coompany: string
  //  repTitle: 'Lexus GLS 500', username: "Clinton", coompany: "British Petroleum"