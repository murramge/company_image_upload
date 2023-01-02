import React from "react";
import "./modal.css";

function Modal(props) {
  const { open, close, header, head, notmain } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div>
              <div>{head}</div>
              <button className="close" onClick={close}>
                <i className="xi-close"></i>
              </button>
            </div>
          </header>
          {notmain !== "notmain" && <main>{header}</main>}
          <footer>{props.children}</footer>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
