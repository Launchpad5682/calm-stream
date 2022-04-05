import React from "react";
import { CustomNavLink } from "../../helper/CustomNavLink";
import "./Sidebar.css";
import { AiFillHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import {
  BsFillCollectionPlayFill,
  BsHandThumbsUpFill,
  BsStopwatchFill,
} from "react-icons/bs";
import { useDataProvider } from "../../context/data-context";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar() {
  const { drawerState } = useDataProvider();
  const width = window.innerWidth;
  const { isAuthenticated } = useAuth();

  return (
    <aside
      className={
        width > 1000
          ? "aside--grid padding--sm"
          : `drawer__container drawer__container--dark drawer--${
              drawerState ? "on" : "off"
            }`
      }
    >
      <CustomNavLink
        activeClassName="typography--green"
        className="h5__typography typography--white navlink"
        inactiveClassName="typography--white"
        to="/"
      >
        <AiFillHome />
        <span>Home</span>
      </CustomNavLink>
      <CustomNavLink
        activeClassName="typography--green"
        className="h5__typography typography--white navlink"
        inactiveClassName="typography--white"
        to="/history"
      >
        <MdHistory />
        <span>History</span>
      </CustomNavLink>
      <CustomNavLink
        activeClassName="typography--green"
        className="h5__typography typography--white navlink"
        inactiveClassName="typography--white"
        to="/playlists"
      >
        {" "}
        <BsFillCollectionPlayFill />
        <span>Playlists</span>
      </CustomNavLink>
      <CustomNavLink
        activeClassName="typography--green"
        className="h5__typography typography--white navlink"
        inactiveClassName="typography--white"
        to="/liked-videos"
      >
        <BsHandThumbsUpFill />
        <span>Liked Videos</span>
      </CustomNavLink>
      <CustomNavLink
        activeClassName="typography--green"
        className="h5__typography typography--white navlink"
        inactiveClassName="typography--white"
        to="/watch-later"
      >
        <BsStopwatchFill />
        <span>Watch Later</span>
      </CustomNavLink>
      {!isAuthenticated && (
        <CustomNavLink
          activeClassName="typography--green"
          className="h5__typography typography--white navlink"
          inactiveClassName="typography--white"
          to="/login"
        >
          <AiOutlineLogin />
          <span>Login</span>
        </CustomNavLink>
      )}
      {isAuthenticated && (
        <CustomNavLink
          activeClassName="typography--green"
          className="h5__typography typography--white navlink"
          inactiveClassName="typography--white"
          to="/user"
        >
          <AiOutlineUserAdd />
          <span>User</span>
        </CustomNavLink>
      )}
    </aside>
  );
}
