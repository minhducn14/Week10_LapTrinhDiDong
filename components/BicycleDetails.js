import React, { useEffect } from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  View, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBicycleById } from '../redux/slices/bicyclesSlice';

export default function BicycleDetail({ route, navigation }) {
  const { id } = route.params; // Lấy id từ params
  const dispatch = useDispatch();
  const { bicycleDetail: product, loading, error } = useSelector((state) => state.bicycles);

  useEffect(() => {
    dispatch(fetchBicycleById(id));
  }, [id, dispatch]);

  const handleAddToCart = () => {
    Alert.alert('Success', `${product.name} has been added to your cart!`);
  };

  const toggleFavorite = () => {
    Alert.alert('Favorite', `${product.name} has been added to favorites!`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading product details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load product details. Please try again later.</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product details not available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={{ uri: product.image+'.jpg' }} />
      </View>

      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.discount}>15% OFF</Text>
        <Text style={styles.originalPrice}>${product.price}</Text>
        <View style={styles.finalPriceContainer}>
          <Text style={styles.finalPrice}>${Math.round(product.price * 0.85)}</Text>
        </View>
      </View>

      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{product.description}</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
          <Image source={require('../assets/akar-icons_heart.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    backgroundColor: '#FFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    height: 300,
    width: '100%',
  },
  img: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  discount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E94141',
    marginRight: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 20,
    fontWeight: '500',
    color: 'gray',
    marginRight: 10,
  },
  finalPriceContainer: {
    borderWidth: 1,
    borderColor: '#E94141',
    padding: 5,
    borderRadius: 5,
  },
  finalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E94141',
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'justify',
    marginVertical: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  heartIcon: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFEFEF',
  },
  icon: {
    height: 30,
    width: 30,
  },
  button: {
    backgroundColor: '#E94141',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
