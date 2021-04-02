import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";

import Container from "./Container";
import PageSection from "./PageSection";

type ModalProps = {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
};

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay>
      <PageSection>
        <Container narrow>{children}</Container>
      </PageSection>
    </ModalOverlay>,
    document.getElementById("modal-root")
  );
};

const ModalOverlay = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: stretch;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default Modal;
