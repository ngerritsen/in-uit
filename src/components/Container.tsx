import styled from "styled-components";

type ContainerProps = {
  narrow?: boolean;
};

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  max-width: ${(props) => (props.narrow ? "44rem" : "100rem")};
  padding: 0 ${(props) => props.theme.sizes.sm};

  @media screen and (min-width: ${(props) => props.theme.mobile}) {
    padding: 0 ${(props) => props.theme.sizes.md};
  }
`;

export default Container;
