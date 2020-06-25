import React, {useState} from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {GreenModal} from '../Modal';
import {BufferView} from './decorators';

import {State, Store} from '@sambego/storybook-state';

const store = new Store({
  visible: false,
});

storiesOf('Modal', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <State store={store}>
      <GreenModal
        onClose={() => store.set({visible: false})}
        visible={store.get('visible')}
        key={1}>
        <Text>Modal Children</Text>
        <Text>More child stuff</Text>
      </GreenModal>
      <TouchableHighlight
        style={{backgroundColor: 'black'}}
        onPress={() => store.set({visible: true})}
        key={0}>
        <Text style={{color: 'white'}}>Show Modal</Text>
      </TouchableHighlight>
    </State>
  ));
