import styled from "styled-components";

const IconButton = styled.button`
  background: none;
  opacity: 0.8;
  cursor: pointer;
  border: none;
  font-size: inherit;
  color: ${(props) => props.theme.colors.foreground};

  &:hover {
    opacity: 1;
  }
`;

export default IconButton;
