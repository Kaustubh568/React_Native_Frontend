import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const PreferenceModal = ({ visible, onClose }) => {
  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Urdu', value: 'Urdu' },
    { label: 'Bengali', value: 'Bengali' },
  ];

  const regions = [
    { label: 'India', value: 'India' },
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'Bangladesh', value: 'Bangladesh' },
    { label: 'Colombia', value: 'Colombia' },
    { label: 'Brazil', value: 'Brazil' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.label}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Preferences</Text>
          <Text style={styles.sectionTitle}>Languages</Text>
          <FlatList
            data={languages}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
            style={styles.list}
          />
          <Text style={styles.sectionTitle}>Regions</Text>
          <FlatList
            data={regions}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
            style={styles.list}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    width: '100%',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PreferenceModal;
