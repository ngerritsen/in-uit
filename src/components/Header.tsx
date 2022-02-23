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
import Settings from "./Settings";

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
              <Icons>
                <Status dirty={isDirty}>
                  {isDirty && <FontAwesomeIcon icon={faSync} spin />}
                  {!isDirty && <FontAwesomeIcon icon={faCheck} />}
                </Status>
                <Settings />
              </Icons>
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

const Icons = styled.div`
  display: flex;
  font-size: 1.6rem;
  margin-right: ${(props) => props.theme.sizes.xxs};

  > *:not(:first-child) {
    margin-left: ${(props) => props.theme.sizes.lg};
  }
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
  margin-top: -2px;
  color: ${(props) =>
    props.dirty ? props.theme.colors.grey : props.theme.colors.green};
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  flex-grow: 1;
`;

export default Header;
