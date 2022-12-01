import React, { useEffect, useRef } from "react";

import AwesomeSvg from "../svg-icons/Awesome.module";
import "./Modal.style.scss";

const Modal = (props) => {
  const refModal = useRef();
  const CloseIcon = AwesomeSvg.CircleXMarkIcon;

  useEffect(() => {
    if (typeof refModal.current.showModal !== "function")
      refModal.current.hidden = true;
  }, []);

  return (
    <dialog ref={refModal} className="modal">
      <div className="modal__content">
        <div className="modal-icon">
          <i
            className="fas fa-window-close close-modal"
            onClick={() => refModal.current.close()}
          >
            <CloseIcon />
          </i>
        </div>

        <div className="tab-area">
          <div className="tab-area__project-info">
            <div className="project-info__logo">
              {props.logo ? props.logo : null}
            </div>
            <h2>{props.title}</h2>
          </div>

          <div className="faq-cont">
            <div className="faq-cont__content">
              <h2> // Built with:</h2>
              <ul className="faq-cont__content_list">
                {props.content.map((item, index) => (
                  <li key={index}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="faq-cont__content">
              <h2> // Credits:</h2>
              <ul className="faq-cont__content_list">
                {props.credit.map((item, index) => (
                  <li key={index}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tab-area__author-info">
            <p>{`${props.author ? props.author : null} ${
              props.year ? props.year : null
            }`}</p>

            <ul className="social-links">
              {props.children
                ? props.children.map((item, index) => (
                    <li key={index} className="social-icon">
                      {item}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
