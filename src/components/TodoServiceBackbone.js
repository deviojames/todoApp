import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import RNBackbone from 'react-native-backbone';
import realmStorage from 'react-native-backbone/src/storages/realm';

//Config RNBackbone to use Realm as storage
RNBackbone.storage = realmStorage;

var Todo = RNBackbone.Model.extend({
  realmSchema:{
    name: 'TodoBackbone',
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

let TodoServiceBackbone = {
  findAll: function(sortBy) {
    if (!sortBy) {
        sortBy = [['completed', true], ['updatedAt', false]];
    }
    return repository.objects('Todo');
  },
  save: function(todo) {
    var todo = new Todo({
      title: todo.title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    todo.save(null, {
      success: () =>{
        console.log(todo)
      }
    })
  },
  update: function(todo){
    
  },
  clearCompleted: function(){

  },
  remove: function(todo){
    
  }

}
module.exports = TodoServiceBackbone;