import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";

const Loader = () => (
  <LoaderContainer>
    <FontAwesomeIcon icon={faCircleNotch} spin />
  </LoaderContainer>
);

const LoaderContainer = styled.div`
  margin: 16rem auto 0;
  font-size: 4rem;
  color: ${(props) => props.theme.colors.grey};
  text-align: center;
`;

export default Loader;
