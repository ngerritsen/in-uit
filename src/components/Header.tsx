import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import Container from "./Container";
import { getHasDirtyItems, getIsLoggedIn } from "../selectors";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { lighten } from "polished";

const Header = () => {
  const isDirty = useSelector(getHasDirtyItems);
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div>
      <HeaderBar asPlaceholder />
      <HeaderBar>
        <Container>
          <HeaderContent>
            <LogoContainer>
              <FontAwesomeIcon icon={faCoins} />
            </LogoContainer>
            <HeaderTitle>In & uit</HeaderTitle>
            {isLoggedIn && (
              <Status dirty={isDirty}>
                {isDirty && <FontAwesomeIcon icon={faSync} spin />}
                {!isDirty && <FontAwesomeIcon icon={faCheck} />}
              </Status>
            )}
          </HeaderContent>
        </Container>
      </HeaderBar>
    </div>
  );
};

const LogoContainer = styled.span`
  font-size: 1.8rem;
  margin-right: 1.2rem;
  float: left;
  background-color: ${(props) => props.theme.colors.coin};
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3rem;
  color: ${(props) => lighten(0.1, props.theme.colors.black)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type HeaderBarProps = {
  asPlaceholder?: boolean;
};

const HeaderBar = styled.header<HeaderBarProps>`
  position: ${(props) => (props.asPlaceholder ? "static" : "fixed")};
  top: 0;
  width: 100%;
  z-index: ${(props) => (props.asPlaceholder ? "inherit" : 2)};
  background-color: ${(props) => props.theme.colors.background};
  height: 6rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  @media screen and (min-width: ${(props) => props.theme.mobile}) {
    height: 8rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;

  @media screen and (min-width: ${(props) => props.theme.mobile}) {
    height: 8rem;
  }
`;

type StatusProps = {
  dirty?: boolean;
};

const Status = styled.div<StatusProps>`
  margin: 0.6rem ${(props) => props.theme.sizes.xxs} 0 0;
  font-size: 1.6rem;
  color: ${(props) =>
    props.dirty ? props.theme.colors.grey : props.theme.colors.green};
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  flex-grow: 1;
`;

export default Header;
