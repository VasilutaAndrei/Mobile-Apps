import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Picker, KeyboardAvoidingView} from 'react-native';
import {Header, Button, Input, ListItem, Overlay} from 'react-native-elements';

export default class ViewProducts extends Component {
  constructor (props){
    super(props);
    this.state = {
      backString : '< Back',
      title : 'View products',
      isVisible : false,
      newName : '',
      newDescription : '',
      newPrice : '',
      editID : 0
    };
  }

  editProduct = (id) => {
    this.setState({
      editID : id,
      newName : this.props.products[id].name,
      newDescription : this.props.products[id].description,
      newPrice : this.props.products[id].price,
      isVisible : true
    });
  };

  renderProductsList = () => {
    return this.props.products.map((product, id) => {
      return (
        <ListItem
          key={id}
          title={product.name}
          rightTitle={'$' + product.price}
          subtitle={product.description}
          onPress={() => this.editProduct(id)}
          bottomDivider
        />
      );
    });
  }

  editProductCall = () => {
    this.props.editProduct(this.state.editID, {
      name : this.state.newName,
      description : this.state.newDescription,
      price : this.state.newPrice
    });
  };

  renderOverlayContent = () => {
    return (
      <ScrollView contentContainerStyle={{ justifyContent : 'center'}}>
        <KeyboardAvoidingView style={{marginHorizontal: 10, marginTop : 150, marginBottom: 10}} behavior="position" enabled>
          <Input containerStyle={{marginVertical:10}} value={this.state.newName} placeholder='Name' onChangeText={(text) => this.setState({newName : text})} />
          <Input containerStyle={{marginVertical:10}} value={this.state.newDescription} placeholder='Description' onChangeText={(text) => this.setState({newDescription : text})} />
          <Input containerStyle={{marginVertical:10}} value={this.state.newPrice.toString()} placeholder='Price' onChangeText={(text) => this.setState({newPrice : text})} />
        </KeyboardAvoidingView>
        {this.renderEditButton()}
      </ScrollView>
    );
  };

  renderEditButton = () => {
    if (this.state.added) {
      return (
        <Button title='Product edited' buttonStyle={{backgroundColor : '#32a852'}}></Button>
      );
    }
    return (<Button title='Edit the product' onPress={this.editProductCall}></Button>);
  }

  render () {
    return (
    <>
      <Header
        leftComponent={<TouchableOpacity onPress={this.props.hide}><Text style={{color:'#fff'}}>{this.state.backString}</Text></TouchableOpacity>}
        centerComponent={{ text: this.state.title + ' (' + this.props.products.length + ')', style: { color: '#fff' } }}
      />
      <Overlay isVisible={this.state.isVisible} onBackdropPress={() => this.setState({isVisible : false})}>
        {this.renderOverlayContent()}
      </Overlay>
      <View style={{flex : 1, marginHorizontal: 10, marginBottom: 10}}>
        {this.renderProductsList()}
      </View>
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
