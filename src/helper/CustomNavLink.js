import React from "react";
import { Link, useLocation } from "react-router-dom";

export const CustomNavLink = ({
  activeClassName,
  className,
  inactiveClassName,
  to,
  ...rest
}) => {
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname);
  const isActive = location.pathname.includes(to);
  // console.log(isActive);

  // console.log(inactiveClassName);

  const allClassName =
    className +
    (isActive === true ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  // console.log(allClassName);
  return <Link className={allClassName} to={to} {...rest} />;
};
