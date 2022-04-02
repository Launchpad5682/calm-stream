import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDataProvider } from "../../context/data-context";
import "./Alert.css";

/**
 * You have a color options for red, green, blue, yellow
 */

export function Alert() {
  const {
    alert: { message, active, color },
    dispatch,
  } = useDataProvider();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deactivateAlert = () => dispatch({ type: "DEACTIVATE_ALERT" });

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        deactivateAlert();
      }, 5000);
    }
  }, [active, deactivateAlert]);

  return (
    <>
      {active && (
        <div className={`alert--${color} alert--box position--alert`}>
          <span
            className={`h6__typography bold--typography typography--${color}`}
          >
            {message}
          </span>
          <span
            className={`h6__typography typography--${color}`}
            onClick={deactivateAlert}
          >
            <IoMdClose />
          </span>
        </div>
      )}
    </>
  );
}
