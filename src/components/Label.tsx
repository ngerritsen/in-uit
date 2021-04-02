import styled from "styled-components";

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 0 0 ${(props) => props.theme.sizes.xxs};
`;

export default Label;
