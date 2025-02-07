import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useProfile} from '../../contexts/ProfileContext';
import {TextInput} from 'react-native-paper';

const ProfileScreen = () => {
  const {profile, loading, error, fetchProfile, updateProfile} = useProfile();
  const [formData, setFormData] = useState({
    given_name: '',
    family_name: '',
    phone_number: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        given_name: profile.given_name || '',
        family_name: profile.family_name || '',
        phone_number: profile.phone_number || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButtonText}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          label="First Name"
          value={formData.given_name}
          onChangeText={text => setFormData({...formData, given_name: text})}
          disabled={!isEditing}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={formData.family_name}
          onChangeText={text => setFormData({...formData, family_name: text})}
          disabled={!isEditing}
          style={styles.input}
        />
        <TextInput
          label="Phone Number"
          value={formData.phone_number}
          onChangeText={text => setFormData({...formData, phone_number: text})}
          disabled={!isEditing}
          style={styles.input}
          keyboardType="phone-pad"
        />

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 16,
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileScreen;
