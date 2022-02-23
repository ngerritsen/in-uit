import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../actions";
import { getIsLoggingOut } from "../selectors";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";

const Logout = () => {
  const dispatch = useDispatch();
  const isLoggingOut = useSelector(getIsLoggingOut);

  return (
    <LogoutContainer>
      <Button small inline subtle onClick={() => dispatch(logout())}>
        {isLoggingOut && (
          <ButtonIcon>
            <FontAwesomeIcon icon={faCircleNotch} spin />
          </ButtonIcon>
        )}
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
