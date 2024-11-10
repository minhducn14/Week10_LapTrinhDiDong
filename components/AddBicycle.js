import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBicycle } from '../redux/slices/bicyclesSlice';

const AddBicycle = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleAddBicycle = () => {
    if (!name || !price || !category || !image || !description) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newBicycle = {
      name,
      price: parseFloat(price),
      category,
      image,
      description,
    };

    dispatch(addBicycle(newBicycle))
      .then(() => {
        Alert.alert('Success', 'Bicycle added successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => {
        console.error('Error adding bicycle:', error);
        Alert.alert('Error', 'Failed to add bicycle. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Bicycle</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Roadbike, Mountain)"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddBicycle}>
        <Text style={styles.buttonText}>Add Bicycle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddBicycle;
