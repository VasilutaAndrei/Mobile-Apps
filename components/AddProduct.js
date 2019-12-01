import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native';
import {Header, Button, Input} from 'react-native-elements';

export default class AddProduct extends Component {
  constructor (props){
    super(props);
    this.state = {
      backString : '< Back',
      title : 'Add a product',
      category : '',
      productName : '',
      productDescription : '',
      productPrice : 0,
      added : false
    };
  }

  renderCategoryList = () => {
    console.log(this.props.categoryNames);

  }

  addProduct = () => {
    this.props.addProduct({
      name : this.state.productName,
      description : this.state.productDescription,
      price : this.state.productPrice
    });
    this.setState({
      added : true
    });
    setTimeout(() => { this.setState({added : false}) }, 1000);
  }

  renderAddButton = () => {
    if (this.state.added) {
      return (
        <Button title='Product added' buttonStyle={{backgroundColor : '#32a852'}}></Button>
      );
    }
    return (<Button title='Add the product' onPress={this.addProduct}></Button>);
  }

  render () {

    return (
    <>
      <Header
        leftComponent={<TouchableOpacity onPress={this.props.hide}><Text style={{color:'#fff'}}>{this.state.backString}</Text></TouchableOpacity>}
        centerComponent={{ text: this.state.title, style: { color: '#fff' } }}
      />
      <View style={{flex : 1, marginHorizontal: 10, marginBottom: 10}}>
        <View>
          <Input containerStyle={{marginVertical:10}} placeholder='Name' onChangeText={(text) => this.setState({productName : text})} />
          <Input containerStyle={{marginVertical:10}} placeholder='Description' onChangeText={(text) => this.setState({productDescription : text})} />
          <Input containerStyle={{marginVertical:10}} placeholder='Price' onChangeText={(text) => this.setState({productPrice : text})} />
        </View>
      </View>
      {this.renderAddButton()}
    </>
    );
  }
}

const styles = StyleSheet.create({
  textInput : {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    width: 200
  },
  navBarContainer : {
    height: 50,
    marginTop: 23,
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInputContainer: {flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, alignItems: 'center'}
});
