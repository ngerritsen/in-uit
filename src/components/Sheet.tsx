import styled from "styled-components";
import React from "react";

import List from "./List";
import Container from "./Container";
import PageSection from "./PageSection";
import Title from "./Title";
import { ItemType, Responsible } from "../constants";

type SheetProps = {
  responsible: Responsible;
  title: string;
};

const Sheet = ({ responsible, title }: SheetProps) => {
  return (
    <PageSection>
      <Container>
        <Title>{title}</Title>
        <Lists>
          <ListContainer>
            <List responsible={responsible} itemType={ItemType.Income} />
          </ListContainer>
          <ListContainer>
            <List responsible={responsible} itemType={ItemType.Expense} />
          </ListContainer>
        </Lists>
      </Container>
    </PageSection>
  );
};

const Lists = styled.div`
  @media screen and (min-width: ${(props) => props.theme.mobile}) {
    display: flex;
  }
`;

const ListContainer = styled.div`
  margin-bottom: ${(props) => props.theme.sizes.md};

  @media screen and (min-width: ${(props) => props.theme.mobile}) {
    margin-right: ${(props) => props.theme.sizes.md};
    width: 50%;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Sheet;
