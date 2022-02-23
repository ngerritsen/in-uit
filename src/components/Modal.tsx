import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";

import Container from "./Container";
import PageSection from "./PageSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  close: () => void;
  children: JSX.Element | JSX.Element[];
};

const Modal = ({ children, close }: ModalProps) =>
  ReactDOM.createPortal(
    <ModalOverlay>
      <PageSection>
        <CloseButton onClick={close}>
          <FontAwesomeIcon size="lg" icon={faTimes} />
        </CloseButton>
        <Container narrow>{children}</Container>
      </PageSection>
    </ModalOverlay>,
    document.getElementById("modal-root")
  );

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  cursor: pointer;
  right: ${(props) => props.theme.sizes.sm};
  top: ${(props) => props.theme.sizes.sm};
  padding: ${(props) => props.theme.sizes.sm};
  color: ${(props) => props.theme.colors.foreground};
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

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
