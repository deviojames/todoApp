import Realm from 'realm';
import TodoModel from './TodoModel';
import Utils from './Utils';
import RNBackbone from 'react-native-backbone';
import realmStorage from 'react-native-backbone/src/storages/realm';

RNBackbone.storage = realmStorage;

var Todo = RNBackbone.Model.extend({
  realmSchema:{
    name: 'Todo',
    primaryKey: 'id',
    properties: {
        id: {type: 'string', indexed: true},
        title: 'string',
        completed: 'bool',
        createdAt: 'date',
        updatedAt: 'date'
    }
  }
});

var Todos = RNBackbone.Collection.extend({
  model: Todo
});

realmStorage.init({
  models: [Todo]
});

let TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) {
        sortBy = [['completed', true], ['updatedAt', false]];
    }

    var todos = this.todos = new Todos();
    todos.fetch({
      success: () => {
        console.log(todos.models)
      }
    })
    return todos.models
  },
  save: function(todo) {
    var todo = new Todo({
      id : Utils.guid(),
      title: todo.title,
      completed: false,
      createdAt:  new Date(),
      updatedAt:  new Date()
    })
   todo.save(null, {
      success: () =>{
        console.log("Todo is saved")
      }
    })
  },
  update: function(todo,callback){
     callback()
  },
  clearCompleted: function(){

  },
  remove: function(todo){

 
  }
}
module.exports = TodoService;
