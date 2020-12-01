import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { login } from '../actions';
import Title from './Title';
import PageSection from './PageSection';
import Container from './Container';
import Button from './Button';
import Input from './Input';
import Section from './Section';

const Login = ({ handleSubmit, onSubmit, invalid }) => {
  return (
    <PageSection>
      <Container narrow>
        <Title>Login</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section>
            <Field component={Input} type="text" name="email" label="E-mail" />
          </Section>
          <Section size="md">
            <Field
              component={Input}
              type="password"
              name="password"
              label="Wachtwoord"
            />
          </Section>
          <Button type="submit" disabled={invalid}>
            Inloggen
          </Button>
        </form>
      </Container>
    </PageSection>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

function validate(values) {
  const errors = {};

  if (!values.email || !values.email.match(/\S+@\S+\.\S+/)) {
    errors.email = 'Vul een geldig email adres in.';
  }

  if (!values.password) {
    errors.password = 'Vul een wachtwoord in.';
  }

  return errors;
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit({ email, password }) {
      dispatch(login(email, password));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'login',
    validate,
  })(Login)
);
