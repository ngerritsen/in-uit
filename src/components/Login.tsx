import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikErrors, Form, FormikProps } from "formik";

import { login } from "../actions";
import Title from "./Title";
import PageSection from "./PageSection";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";
import Section from "./Section";
import { getIsLoggingIn, getLoginError } from "../selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import ButtonIcon from "./ButtonIcon";
import ErrorMessage from "./ErrorMessage";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(getIsLoggingIn);
  const loginError = useSelector(getLoginError);

  return (
    <PageSection>
      <Container narrow>
        <Title>Login</Title>
        <Formik<LoginFormValues>
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={({ email, password }) => {
            dispatch(login({ email, password }));
          }}
        >
          {({ isValid, dirty }: FormikProps<LoginFormValues>) => (
            <Form>
              <Section>
                <Input type="text" name="email" label="E-mail" />
              </Section>
              <Section size="md">
                <Input type="password" name="password" label="Wachtwoord" />
              </Section>
              {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
              <Button type="submit" disabled={!isValid || !dirty || isLoggingIn}>
                {isLoggingIn && (
                  <ButtonIcon>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                  </ButtonIcon>
                )}
                Inloggen
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </PageSection>
  );
};

function validate(values: LoginFormValues): FormikErrors<LoginFormValues> {
  const errors: FormikErrors<LoginFormValues> = {};

  if (!values.email || !values.email.match(/\S+@\S+\.\S+/)) {
    errors.email = "Vul een geldig email adres in.";
  }

  if (!values.password) {
    errors.password = "Vul een wachtwoord in.";
  }

  return errors;
}

export default Login;
