import React, {Component} from 'react';
import {Button} from 'react-native'
import TodoService from './TodoService'

export default class ClearButton extends Component{
    constructor(props) {
        super(props);
        this.onClearTodoPress = this.onClearTodoPress.bind(this);
      }
    onClearTodoPress(){
        TodoService.clearCompleted(() => {
            var dataList = TodoService.findAll();
            this.props.updateDataList(dataList);
        });
    }
    render(){
        return(
            <Button
                onPress={this.onClearTodoPress}
                title="Clear Completed"
            />
        )
    }
}