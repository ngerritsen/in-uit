import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { getHasDirtyItems } from "../selectors";

const Status = () => {
  const isDirty = useSelector(getHasDirtyItems);

  return (
    <StatusIcon dirty={isDirty}>
      {isDirty && <FontAwesomeIcon icon={faSync} spin />}
      {!isDirty && <FontAwesomeIcon icon={faCheck} />}
    </StatusIcon>
  );
};

type StatusIconProps = {
  dirty?: boolean;
};

const StatusIcon = styled.div<StatusIconProps>`
  margin-top: -2px;
  color: ${(props) => (props.dirty ? props.theme.colors.grey : props.theme.colors.green)};
`;

export default Status;
