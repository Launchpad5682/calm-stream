import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";
import { ACTION_TYPE } from "../../utils";
import { BadgeButton } from "../Buttons/BadgeButton";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const { drawerState, dispatch } = useDataProvider();

  const drawerHandler = () => dispatch({ type: ACTION_TYPE.TOGGLE_DRAWER });
  return (
    <header className="header header--dark">
      <span
        className="logo cursor--pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="https://yifgzyyqlpgydlzwcsaj.supabase.in/storage/v1/object/sign/calm-stream/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWxtLXN0cmVhbS9sb2dvLnBuZyIsImlhdCI6MTY0NzYwMDU0NywiZXhwIjoxOTYyOTYwNTQ3fQ.x5u9JALHIA9z3cD9AXOk8BzBQYIAAjqs546G3uqNKlg"
          alt=""
          className="logo--img"
        />
        <h6 className="h4__typography typography--white header__title">
          Calm Stream
        </h6>
      </span>
      <SearchBar />
      <nav className="">
        <ul className="nav__list">
          <span className="drawer--utils">
            <BadgeButton clickHandler={drawerHandler}>
              {!drawerState ? <AiOutlineMenu /> : <AiOutlineClose />}
            </BadgeButton>
          </span>
        </ul>
      </nav>
    </header>
  );
}
