import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import AddProduct  from './components/AddProduct';
import ViewProducts from './components/ViewProducts';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title : 'Welcome to MultiShopping!',
      addProductVisible : false,
      viewProductsVisible : false,
      products : [
        {
          name : 'Test Product 1',
          description : 'Test description',
          price : 100
        },
        {
          name : 'Test Product 2',
          description : 'Test description',
          price : 101
        },
        {
          name : 'Test Product 3',
          description : 'Test description',
          price : 102
        },
        {
          name : 'Test Product 4',
          description : 'Test description',
          price : 103
        }
      ],
    }
  }

  addProduct = (product) => {
    let products = this.state.products;
    products.push(product);
    this.setState({
      products
    });
  };

  editProduct = (id, newProduct) => {
    let products = this.state.products;
    products[id].name = newProduct.name;
    products[id].description = newProduct.description;
    products[id].price = newProduct.price;

    this.setState({
      products
    });
  }

  hideAddPrd = () => this.setState({addProductVisible  : false});
  hideViewPr = () => this.setState({viewProductsVisible: false});

  render() {
    const {addProductVisible, viewProductsVisible} = this.state;

    if (addProductVisible){
      return (
        <AddProduct addProduct={this.addProduct} hide={this.hideAddPrd} />
      );
    }
    if (viewProductsVisible){
      return (
        <ViewProducts products={this.state.products} editProduct={this.editProduct} hide={this.hideViewPr} />
      );
    }
    return (
      <View style={{flex : 1, backgroundColor: '#F5FCFF'}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>{this.state.title}</Text>
        </View>
        <View style={{
            flex : 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <View style={{marginVertical: 10}}>
            <Button style={styles.button} title='Add a product' onPress={() => this.setState({addProductVisible : true})}></Button>
          </View>
          <View style={{marginVertical: 10}}>
            <Button style={styles.button} title='View products' onPress={() => this.setState({viewProductsVisible : true})}></Button>
          </View>
          <View style={{marginVertical: 10}}>
            <Button style={styles.button} title='Print array' onPress={() => console.log(this.state.products)}></Button>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginHorizontal: 10
  }
});
