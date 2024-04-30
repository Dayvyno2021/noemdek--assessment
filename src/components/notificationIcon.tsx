import { memo } from "react";
import { FaBell } from "react-icons/fa6";

const NotificationIcon = () => {
  return (
    <>
      <div className="bell">
        <FaBell />
      </div>
    </>
  )
}

export default memo(NotificationIcon);