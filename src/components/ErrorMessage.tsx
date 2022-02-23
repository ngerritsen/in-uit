import styled from "styled-components";

const ErrorMessage = styled.p`
  display: block;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.sizes.xs} ${(props) => props.theme.sizes.sm};
  border-radius: 3px;
  margin-bottom: ${(props) => props.theme.sizes.md};
`;

export default ErrorMessage;
