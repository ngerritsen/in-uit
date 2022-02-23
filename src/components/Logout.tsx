import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../actions";
import Button from "./Button";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <LogoutContainer>
      <Button small inline subtle onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </LogoutContainer>
  );
};

const LogoutContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.sizes.md};
`;

export default Logout;
