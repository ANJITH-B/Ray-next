import { Modal } from "antd";
import React from "react";
import './otherComponentStyle.scss'
const ModalLayout = ({ title, open = false, width, setOpen, children }) => {
  return (
    <Modal zIndex={9999} className="modal-head" rootClassName="p-6" width={width} footer={false} title={title} centered open={open} onCancel={() => setOpen(false)}>
      
      {children}
    </Modal>
  );
};

export default ModalLayout;
