import React from 'react';
import {View, Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';

import {BufferView} from './decorators';
import {Form, FieldWrapper, TextInput} from '../Form';

const defaultTextInputProps = {
  label: 'Demo',
  onChangeText: action('onChangeText'),
};

storiesOf('Form/TextInput', module)
  .addDecorator(BufferView)
  .add('with placeholder', () => (
    <TextInput {...defaultTextInputProps} label="Label" value="" />
  ))
  .add('with value', () => (
    <TextInput {...defaultTextInputProps} label="Label" value="hello value" />
  ))
  .add('with error message', () => (
    <TextInput
      {...defaultTextInputProps}
      message="This is an error"
      messageType="error"
    />
  ))
  .add('highlight on focus', () => (
    <TextInput
      {...defaultTextInputProps}
      label="Email"
      value="sarah@email.com"
      keyboardType="email-address"
      highlightOnFocus
    />
  ))
  .add('email', () => (
    <TextInput
      {...defaultTextInputProps}
      label="Email"
      value="sarah@email.com"
      keyboardType="email-address"
    />
  ))
  .add('password', () => (
    <TextInput
      {...defaultTextInputProps}
      label="Password"
      value="password"
      secureTextEntry
    />
  ));

storiesOf('Form/FieldWrapper', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <FieldWrapper label="Email">
      <Text>Input Text</Text>
    </FieldWrapper>
  ))
  .add('error message', () => (
    <FieldWrapper
      label="Email"
      message="Please enter a valid email!"
      messageType="error">
      <Text>Input Text</Text>
    </FieldWrapper>
  ))
  .add('success message', () => (
    <FieldWrapper label="Email" message="Success" messageType="success">
      <Text>Input Text</Text>
    </FieldWrapper>
  ))
  .add('multiple fields', () => (
    <>
      <FieldWrapper label="Email">
        <Text>Input Text</Text>
      </FieldWrapper>
      <FieldWrapper
        label="Email"
        message="Please enter a valid email!"
        messageType="error">
        <Text>Input Text</Text>
      </FieldWrapper>
      <FieldWrapper label="Email" message="Success" messageType="success">
        <Text>Input Text</Text>
      </FieldWrapper>
    </>
  ));

storiesOf('Form', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <Form>
      <View style={{flex: 1, backgroundColor: '#e6e6e6'}} />
    </Form>
  ))
  .add('with header', () => (
    <Form header="Header">
      <View style={{flex: 1, backgroundColor: '#e6e6e6'}} />
    </Form>
  ))
  .add('with header and subheader', () => (
    <Form
      header="Header"
      subheader="Subheader subheader subheader subheader subheader subheader">
      <View style={{flex: 1, backgroundColor: '#e6e6e6'}} />
    </Form>
  ));
