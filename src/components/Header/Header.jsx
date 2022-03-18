import React from "react";
import "./Header.css";

export function Header() {
  return (
    <header className="header header--dark">
      <span className="logo cursor--pointer" onClick={() => {}}>
        <img
          src="https://yifgzyyqlpgydlzwcsaj.supabase.in/storage/v1/object/sign/calm-stream/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWxtLXN0cmVhbS9sb2dvLnBuZyIsImlhdCI6MTY0NzYwMDU0NywiZXhwIjoxOTYyOTYwNTQ3fQ.x5u9JALHIA9z3cD9AXOk8BzBQYIAAjqs546G3uqNKlg"
          alt=""
          className="logo--img"
        />
        <h6 className="h4__typography typography--white header__title">
          Calm Stream
        </h6>
      </span>
      {/* <div className="search__container">
        <input type="text" name="" id="" className="search__input" />
        <span className="search__btn">
          <BsSearch />
        </span>
      </div> */}

      <nav className="">
        <ul className="nav__list">
          <button className="button--sm button__solid button--green button__rounded--lg">
            <span className="button__typography typography--white">Logout</span>
          </button>
        </ul>
      </nav>
    </header>
  );
}
