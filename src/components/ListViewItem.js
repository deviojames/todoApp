import React, {Component} from 'react';
import {TouchableHighlight, View, Text, Button} from 'react-native';
import CheckBox from './CheckBox';
import TodoService from './TodoService';
import Icon from  'react-native-vector-icons/MaterialIcons';
class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this.onDelTodo = this.onDelTodo.bind(this);
    this.state = {
      data: this.props.data
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  }

  _onCheckBoxPressed() {
    var data = this.state.data;
    this.setState({
      data: data
    })
    TodoService.update(data, () => {
      data.completed = !data.completed;
    });
    
    this.setState({
       data: data
    });

    this.props.onCompletedChange();
    
  }
  onDelTodo(){
    var data = this.state.data;
    var dataList = TodoService.findAll();
    TodoService.remove(data, () => {
      this.props.updateDataList(dataList);
    });
  };

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    return (
    
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
          <Text style={{fontSize:18, color: color, textDecorationLine: textDecorationLine}}>{data.title}</Text>
          <Icon.Button
            style={{alignItems: 'flex-end'}}
            name={'delete'}
            backgroundColor='rgba(255,0,0,0)'
            color={color}
            underlayColor='rgba(255,0,0,0)'
            size={20}
            iconStyle={{marginLeft: -10, marginRight: 0}}
            activeOpacity={1}
            borderRadius={5}
            onPress={this.onDelTodo}
          >
          </Icon.Button>
        </View>
    
    )
  }
}

module.exports = ListViewItem;