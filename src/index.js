import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import 'regenerator-runtime/runtime';
import Form from 'simple-forms-react';
import Spinner from './Spinner';

const Container = styled.div`padding: 10px;`;
const ButtonDiv = styled.div`margin: 30px 0;`;
const Error = styled.div`color: red;`;
const InputHolder = styled.div`margin: 12px 0;`;

const nameValidator = val => {
  const regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g);
  return !regex.test(val)
    ? { valid: false, message: 'No special characters' }
    : { valid: true };
};
const emptyValidator = val =>
  !val ? { valid: false, message: 'This is required' } : { valid: true };

const usernameValidator = val =>
  new Promise((resolve, reject) => {
    setTimeout(() => Promise.resolve({valid: true}), 5000);
  });

const App = () => (
  <Container>
    <h1>simple-forms-react</h1>
    <Form
      initialValues={{
        name: '',
        username: '',
      }}
      validators={{
        name: [emptyValidator, nameValidator],
        username: [emptyValidator, usernameValidator],
      }}
      onSubmit={({ values, setSubmitting }) => {
        console.log('Submitted values: ', values);
        setSubmitting(false);
      }}>
      {({
        values,
        touched,
        errors,
        valid,
        fieldProps,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <InputHolder>
            <label>Name: </label>
            <input
              {...fieldProps({
                id: 'name',
                value: values.name,
                placeholder: 'Enter your name',
              })}
            />
            {touched.name && errors.name && <Error>{errors.name}</Error>}
          </InputHolder>
          <InputHolder>
            <label>Username</label>
            <input
              {...fieldProps({
                id: 'username',
                value: values.username,
                placeholder: 'type your username',
              })}
            />
            {valid.username && <Spinner radius="10" stroke="2" />}
            {touched.username &&
            errors.username && <Error>{errors.username}</Error>}
          </InputHolder>
          <ButtonDiv>
            {isSubmitting ? (
              <Spinner />
            ) : (
              <input type="submit" value="Submit" />
            )}
          </ButtonDiv>
        </form>
      )}
    </Form>
  </Container>
);

render(<App />, document.getElementById('root'));
