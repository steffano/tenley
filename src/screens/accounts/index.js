import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useAccounts} from '../../contexts/AccountsContext';
import {Button, Card, TextInput, Modal, Portal} from 'react-native-paper';

const AccountsScreen = () => {
  const {
    accounts,
    loading,
    error,
    fetchAccounts,
    addAccount,
    editAccount,
    removeAccount,
  } = useAccounts();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    account_type: 'checking',
  });

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleSubmit = async () => {
    if (editingAccount) {
      await editAccount(editingAccount.id, formData);
    } else {
      await addAccount(formData);
    }
    setModalVisible(false);
    setEditingAccount(null);
    setFormData({name: '', account_type: 'checking'});
  };

  const handleEdit = account => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      account_type: account.account_type,
    });
    setModalVisible(true);
  };

  const handleDelete = async account => {
    await removeAccount(account.id);
  };

  const renderAccountItem = ({item}) => (
    <Card style={styles.accountCard}>
      <Card.Content>
        <Text style={styles.accountName}>{item.name}</Text>
        <Text style={styles.accountType}>
          {item.account_type.charAt(0).toUpperCase() + item.account_type.slice(1)}
        </Text>
        <Text style={styles.accountBalance}>
          Balance: ${parseFloat(item.balance).toFixed(2)}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleEdit(item)}>Edit</Button>
        <Button onPress={() => handleDelete(item)}>Delete</Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Accounts</Text>
        <Button
          mode="contained"
          onPress={() => {
            setEditingAccount(null);
            setFormData({name: '', account_type: 'checking'});
            setModalVisible(true);
          }}>
          Add Account
        </Button>
      </View>

      <FlatList
        data={accounts}
        renderItem={renderAccountItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            setEditingAccount(null);
          }}
          contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingAccount ? 'Edit Account' : 'New Account'}
          </Text>
          <TextInput
            label="Account Name"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
            style={styles.input}
          />
          <View style={styles.accountTypeContainer}>
            {['checking', 'savings', 'credit'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.accountTypeButton,
                  formData.account_type === type && styles.selectedAccountType,
                ]}
                onPress={() => setFormData({...formData, account_type: type})}>
                <Text
                  style={[
                    styles.accountTypeText,
                    formData.account_type === type &&
                      styles.selectedAccountTypeText,
                  ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button mode="contained" onPress={handleSubmit}>
            {editingAccount ? 'Save Changes' : 'Create Account'}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    gap: 16,
  },
  accountCard: {
    marginBottom: 16,
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  accountBalance: {
    fontSize: 16,
    marginTop: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  accountTypeButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedAccountType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  accountTypeText: {
    color: '#000',
  },
  selectedAccountTypeText: {
    color: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default AccountsScreen;
