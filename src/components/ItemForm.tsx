import styled from "styled-components";
import { Formik, Field, Form, FormikErrors } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { CATEGORIES, DEFAULT_CATEGORY } from "../constants";
import shortid from "shortid";

import { addItem, editItem, removeItem } from "../actions";
import Button from "./Button";
import Title from "./Title";
import Section from "./Section";
import Input from "./Input";
import Select from "./Select";
import { capitalize } from "../helpers/formatting";
import { Responsible, ItemType } from "../constants";

type ItemFormProps = {
  id?: string;
  title?: string;
  category?: string;
  itemType: ItemType;
  responsible: Responsible;
  onExit: () => void;
  amount?: number;
  checked?: boolean;
};

type ItemFormValues = {
  title: string;
  amount: number;
  category: string;
};

const ItemForm = ({
  id,
  title,
  category = DEFAULT_CATEGORY,
  amount,
  itemType,
  responsible,
  checked,
  onExit,
}: ItemFormProps): JSX.Element => {
  const editMode = Boolean(id);
  const dispatch = useDispatch();

  return (
    <Formik<ItemFormValues>
      initialValues={{
        title: title || "",
        amount: amount || 0,
        category: category || "",
      }}
      validate={validate}
      onSubmit={(values: ItemFormValues) => {
        const action = editMode ? editItem : addItem;

        dispatch(
          action({
            id: id || shortid.generate(),
            itemType,
            responsible,
            title: values.title,
            amount: Number(values.amount),
            category: values.category,
            checked: checked || false,
          })
        );
        onExit();
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Title>{generateTitle(responsible, itemType, editMode)}</Title>
          <Section>
            <Input name="title" type="text" label="Titel" />
          </Section>
          <Section>
            <Input name="amount" type="number" step="0.01" label="Bedrag" />
          </Section>
          <Section size="md">
            <Select name="category" label="Categorie">
              {CATEGORIES.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </Section>
          <Section>
            <ButtonPair>
              <ButtonPairButton>
                <Button disabled={!isValid && dirty}>Opslaan</Button>
              </ButtonPairButton>
              <ButtonPairButton>
                <Button onClick={onExit} type="button" warning>
                  Annuleren
                </Button>
              </ButtonPairButton>
            </ButtonPair>
          </Section>
          {editMode && (
            <Button
              onClick={() => dispatch(removeItem(id))}
              type="button"
              danger
            >
              Verwijderen
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

const ButtonPair = styled.div`
  display: flex;
`;

const ButtonPairButton = styled.div`
  flex-grow: 1;
  margin-right: 1.6rem;

  &:last-child {
    margin-right: 0;
  }
`;

function generateTitle(
  responsible: Responsible,
  itemType: ItemType,
  editMode: boolean
): string {
  return capitalize(
    (responsible === Responsible.Shared ? "gezamelijke " : "") +
      (itemType === ItemType.Income ? "inkomst " : "uitgave ") +
      (responsible === Responsible.Man ? "voor Niels " : "") +
      (responsible === Responsible.Woman ? "voor Peggy " : "") +
      (editMode ? "bewerken" : "toevoegen")
  );
}

function validate(values: ItemFormValues): FormikErrors<ItemFormValues> {
  const errors: FormikErrors<ItemFormValues> = {};

  if (!values.title || values.title.length < 3) {
    errors.title = "Vul een titel in van minimaal 3 karakters";
  }

  if (isNaN(Number(values.amount))) {
    errors.amount = "Vul een geldig bedrag in";
  }

  return errors;
}

export default ItemForm;
