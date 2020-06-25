import * as React from 'react';
import {
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {styles} from '../utilities/styles';

export default function TextInputs({task: {id, title, state}, onChange}) {
  return (
    <SafeAreaView style={styles.ListItem}>
      <TextInput
        placeholder="Input Title"
        style={
          state === 'TASK_ARCHIVED'
            ? styles.ListItemInputTaskArchived
            : styles.ListItemInputTask
        }
        value={title}
        editable={false}
      />
    </SafeAreaView>
  );
}
