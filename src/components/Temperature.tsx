import * as React from "react"
import { Tooltip } from "antd"

interface ITemperatureProps {
  tooltipMessage?: string
  value?: number
}

export const Temperature: React.FC<ITemperatureProps> = ({ tooltipMessage, value = 0 }) => {
  const roundedValue = Math.round(value)
  return (
    <Tooltip title={tooltipMessage}>
      <span>{roundedValue}°</span>
    </Tooltip>
  )
}
