import { FaSearch } from "react-icons/fa";
import { metricData, topics } from "../../data";
import { Link } from "react-router-dom";
import MetricComponent from "../../components/MetricComponent";
import ScheduleContent from "../../components/ScheduleContent";

const Scheduling = () => {
  return (
    <>
      <div className="schedule">
        <div className="schedule-search">
          <div className="search-zone">
            <form>
              <label htmlFor="search"><FaSearch /> </label>
              <input type="search" id="search" placeholder="search" />
            </form>
            <div className="search-zone-nav">
              {
                topics.map((topic) => (
                  <Link key={topic.title} to={`${topic.link}`} className="search-zone-nav-topics">
                    <span style={{ display: 'flex', alignItems: 'center' }}> {topic.icon} </span>
                    {
                      topic?.spot ? (
                        <span className="red--spot"></span>
                      ):('')
                    }
                    <p> {topic.title} </p>
                  </Link>
                ))
              }
              <Link to='/' className="logo">
                <img src="/images/noemdek-logo.png" alt="Noemdek Logo"  />
              </Link>
            </div>
          </div>
          <div className="schedule-metrics">
            <h1>Scheduling</h1>
            <div className="metrics-container">
              {
                metricData.map((m, i) => (
                  <MetricComponent key={`${Math.random()}${i}`}
                    amount={m.amount}
                    profit={m.profit}
                    header={m.header}
                    desc={m.desc}
                    bg={i === 0 ? "orange-bg" : "green-bg"}
                    badgeColor={i === 0 ? "badgeOrange" : "badgeGreen"}
                    topRadius="top-right-radius"
                  />
                ))
              }
              <div className="large-metric">
                <MetricComponent
                  amount="70m"
                  profit='+12.6%'
                  header="Total"
                  desc="Pipeline"
                  bg="orange-bg"
                  badgeColor="badgeOrange"
                />
                <div className="large-metric-2">
                  <div className="large-metric-2-child-1"> &#36;70m - &#36;100m (High) </div>
                  <div className="large-metric-2-child-2">&#36;40m - &#36;70m (Mid)</div>
                  <div className="large-metric-2-child-3"> &#36;0m - &#36;40m (Low) </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScheduleContent/>
      </div>
    </>
  )
}

export default Scheduling