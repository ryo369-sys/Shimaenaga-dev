import React from "react";

const ModalClose = (props) => {
  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay">
          <div id="modalContent">
            <h1>ModalClose</h1>
            <p>This is CloseModalContent</p>
            <button>Close Modal</button>
          </div>
        </div>
      ) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default ModalClose;