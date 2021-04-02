import styled from "styled-components";

type SectionProps = {
  size?: "xs" | "sm" | "md" | "lg" | undefined;
};

const Section = styled.div<SectionProps>`
  margin-bottom: ${(props) => props.theme.sizes[props.size || "sm"]};
`;

export default Section;
