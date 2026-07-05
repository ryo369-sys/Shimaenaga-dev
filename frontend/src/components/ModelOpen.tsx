import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

type ChildProps = {
  showFlag: boolean;
};

const ModalOpen = ({showFlag}:ChildProps) => {
    const [showModal, setShowModal] = useState(false);
    setShowModal(true);

    if (showFlag) return null;    
    else{
        return(
        <>
            <h1>ModalOpen</h1>
            <button onClick={ModalOpen}>Open Modal</button>
        </>
        )
    }
};

export default ModalOpen;

