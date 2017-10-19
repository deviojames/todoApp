import React, { Component } from 'react';
import { TextInput, Button, View} from 'react-native';
import TodoModel from './TodoModel';
import TodoService from './TodoService';
import Utils from './Utils';

class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onAddTodoPress = this.onAddTodoPress.bind(this)
    this.state = { newValue: '' };
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  onChange(event){
    var title = event.nativeEvent.text;
    var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

    this.setState({
      newValue: title
    });
  }

  onKeyPress(event){
   
  }
  onAddTodoPress(){
    if (this.state.newValue != '') {
      var newDataItem = new TodoModel(this.state.newValue);
      var dataList = this.props.data;

      dataList.unshift(newDataItem);
      TodoService.save(newDataItem);

      this.setState({
        newValue: ''
      });
     // dataList = TodoService.findAll();
      this.props.updateDataList(dataList);
    }
  }
  onClearCompleted(){
  
  }

  render() {
    return (
      <View>
        <TextInput style={{height: 36, padding: 4, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
          placeholder='Add a todo'
          blurOnSubmit={false}
          value={this.state.newValue}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}>
        </TextInput>
          <Button
            onPress={this.onAddTodoPress}
            value={this.state.newValue}
            title="Add a todo"
          />
      </View>
    );
  }
}

module.exports = TextInputBox;