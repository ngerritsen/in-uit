import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import Label from "./Label";
import { FieldHookConfig, useField } from "formik";

type InputProps = {
  label: string;
};

const Input = ({ label, ...props }: InputProps & FieldHookConfig<string>): JSX.Element => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div>
      <Label htmlFor="name">{label}</Label>
      <InputField {...props} {...field} error={hasError} />
      {hasError && <InputError>{meta.error}</InputError>}
    </div>
  );
};

type InputFieldProps = {
  error: string;
};

const InputField = styled.input<InputFieldProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => (props.error ? props.theme.colors.red : props.theme.colors.border)};
  padding: 1rem;
  font-size: 1.4rem;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.foreground};

  &:focus {
    outline: none;
    border: 1px solid ${(props) => (props.error ? darken(0.1, props.theme.colors.red) : props.theme.colors.blue)};
  }
`;

const InputError = styled.span`
  display: block;
  padding-top: ${(props) => props.theme.sizes.xxs};
  color: ${(props) => props.theme.colors.red};
`;

export default Input;
