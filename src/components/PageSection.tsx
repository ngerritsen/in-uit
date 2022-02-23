import styled from "styled-components";

const PageSection = styled.div`
  padding: ${(props) => props.theme.sizes.md} 0;
  margin-top: ${(props) => props.theme.sizes.sm};
  background-color: ${(props) => props.theme.colors.background};
  position: relative;

  @media screen and (min-width: ${(props) => props.theme.mobile}) {
    padding: ${(props) => props.theme.sizes.lg} 0;
    margin-top: ${(props) => props.theme.sizes.md};
  }
`;

export default PageSection;
