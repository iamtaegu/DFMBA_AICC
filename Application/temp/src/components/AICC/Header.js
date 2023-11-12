import React from "react";
import "./Header.css";

const Header = () => {
  return (
      <div className="Header" >

          <div class="image-with-text" >
              <h3>오늘은</h3>

              <a href="" className="" class="image-container">
                  <img src="/img/login.svg" alt="간편로그인" />
              </a>
          </div>

          <h1>{new Date().toDateString()}</h1>

      </div>

  )
};

export default React.memo(Header);
