import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import RNBackbone from 'react-native-backbone';
import fetchStorage from 'react-native-backbone/src/storages/fetch';

class FetchStorageExample extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true
        };

        fetchStorage.globalOptions.headers = {
            "Authorization": "Bearer token"
        };

        var Businesses = RNBackbone.Collection.extend({
   
            url: 'https://facebook.github.io/react-native/movies.json'
            
        });

        var businesses = this.business = new Businesses();

        businesses.fetch({
            success: () => {
                this.setState({isLoading: false});
            },
            error: (model, error) => {
                console.error(error);
            }
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Fetching from API, please wait...</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>Test {this.business.length} </Text>
                </View>
            )
        }
    }
}

export default FetchStorageExample;