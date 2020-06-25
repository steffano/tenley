import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {Button} from '../Button';
import {BufferView} from './decorators';

storiesOf('Button', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <Button onPress={action('tapped-default')} title="Default Button" />
  ))
  .add('secondary', () => (
    <Button
      onPress={action('tapped-secondary')}
      title="Secondary Button"
      secondary
    />
  ))
  .add('disabled', () => <Button title="disabled Button" disabled />);
