import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';

export default class AddCategory extends Component {
  constructor (props){
    super(props);
    this.state = {
      backString : '< Back',
      title : 'Add a category',
      fieldName : '',
      categoryName : '',
      fields : []
    };
  }

  addField = () => {
    let fields = this.state.fields;
    fields.push(this.state.fieldName);

    this.setState({
      fields
    });
  };

  onFieldNameChange = (text) => {
    this.setState({fieldName : text});
  };
  onCategoryNameChange = (text) => {
    this.setState({categoryName : text});
  };

  renderAddFields = () => {
    return (
      <View style={styles.textInputContainer}>
        <Text>Field name : </Text>
        <TextInput style={styles.textInput} onChangeText={(text) => this.onFieldNameChange(text)}></TextInput>
        <Button title='Add field' onPress={this.addField}></Button>
      </View>
    );
  };

  removeField = (id) => {
    let fields = this.state.fields;
    fields.splice(id, 1);
    this.setState({
      fields
    });
  };

  renderFields = () => {
    return this.state.fields.map((field, index) => {
      return (
        <View style={styles.textInputContainer}>
          <Text>{field}</Text>
          <TouchableOpacity onPress={() => this.removeField(index)}>
            <Text style={{color : 'red'}}>x</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  addCategory = () => {
    this.props.addCategory({
      [this.state.categoryName] : {
        name : this.state.categoryName,
        fields : this.state.fields
      }
    })
  };



  render () {

    return (
      <View style={{flex : 1, marginHorizontal: 10, marginBottom: 10}}>
        <Header
          leftComponent={<TouchableOpacity onPress={this.props.hide}><Text>{this.state.backString}</Text></TouchableOpacity>}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View style={styles.textInputContainer}>
          <Text>Category name : </Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.onCategoryNameChange(text)}></TextInput>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Category fields</Text>
        </View>
        {this.renderAddFields()}
        <ScrollView style={{height: 500, borderBottomColor: 'gray', borderBottomWidth: 1}}>
          {this.renderFields()}
        </ScrollView>
        <Button title='Add Category' onPress={this.addCategory}></Button>
      </View>
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
