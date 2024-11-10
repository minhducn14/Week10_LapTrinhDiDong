import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes, setSelectedCategory } from '../redux/slices/bicyclesSlice';

const BicycleList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: Bikes, loading, selectedCategory } = useSelector((state) => state.bicycles);

  useEffect(() => {
    dispatch(fetchBikes(selectedCategory));
  }, [selectedCategory, dispatch]);

 const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BicycleDetail', { id: item.id })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: `${item.image}.jpg` }} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text>Loading Bikes</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBicycle')}
      >
        <Text style={styles.addButtonText}>Add Bicycle</Text>
      </TouchableOpacity>

      <Text style={styles.title}>The world’s Best Bike</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === '' && styles.selectedButton]}
          onPress={() => dispatch(setSelectedCategory(''))}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'RoadBike' && styles.selectedButton]}
          onPress={() => dispatch(setSelectedCategory('RoadBike'))}>
          <Text style={styles.filterText}>RoadBike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Moutain' && styles.selectedButton]}
          onPress={() => dispatch(setSelectedCategory('Moutain'))}>
          <Text style={styles.filterText}>Moutain</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Bikes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#f5a623',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F7BA8326',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
  backgroundColor: '#f5a623',
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  alignItems: 'center',
},
addButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});

export default BicycleList;
