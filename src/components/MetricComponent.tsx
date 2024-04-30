import React from 'react'

interface MetricProps{
  amount: string,
  profit: string,
  header: string,
  desc: string,
  bg: string,
  badgeColor: string
  topRadius?: string
}

const MetricComponent:React.FC<MetricProps> = ({amount, profit, header, desc, bg,badgeColor, topRadius}) => {
  return (
    <div className={`metric-comp left-radius metric ${bg} ${topRadius}`}>
      <h1 className="metric-amount"> &#36;{amount} </h1>
      <div className="metric-comp-details">
        <span className={`metric-badge ${badgeColor}`}> {profit} </span>
        <div className="metric-comp-details-more">
          <p className="metric-comp-details-more-1"> {header} </p>
          <p className="metric-comp-details-more-2"> {desc} </p>
        </div>
      </div>
    </div>
  )
}

export default MetricComponent