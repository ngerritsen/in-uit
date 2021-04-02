import React from "react";
import styled from "styled-components";
import { useField, FieldHookConfig } from "formik";

import { darken } from "polished";
import Label from "./Label";

type SelectProps = {
  label: string;
  children: JSX.Element | JSX.Element[];
};

const Select = ({
  label,
  children,
  ...props
}: SelectProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div>
      <Label htmlFor={field.name}>{label}</Label>
      <SelectField {...field} error={hasError}>
        {children}
      </SelectField>
      {hasError && <SelectError>{meta.error}</SelectError>}
    </div>
  );
};

type SelectFieldProps = {
  error?: string;
};

const SelectField = styled.select<SelectFieldProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.colors.red
        : darken(0.15, props.theme.colors.border)};
  height: 4rem;
  font-size: 1.4rem;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.foreground};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border: 1px solid
      ${(props) =>
        props.error
          ? darken(0.1, props.theme.colors.red)
          : props.theme.colors.blue};
  }
`;

const SelectError = styled.span`
  display: block;
  padding-top: ${(props) => props.theme.sizes.xxs};
  color: ${(props) => props.theme.colors.red};
`;

export default Select;
