import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

class Home extends React.Component {

    state = {
        count: 0,
    };

    constructor(props) {
        super(props);
        this.getData();
        console.log('from = ', this.state.count);
    }

    storeData = () => {
        AsyncStorage.setItem('count', this.state.count).catch((e) => console.log(e.toString()));
    };

    getData = () => {
        AsyncStorage.getItem('count').then((value) => {
            this.setState({count: JSON.parse(value)});
        }).catch((e) => console.log(e.toString()));
    };

    _increaseCount = () => {
        this.setState({count: this.state.count + 1}, () => this.storeData());
    };

    static navigationOptions = (({navigation}) => {
        return {
            title: 'Дом',
            headerBackTitle: 'A much too long text for back button from B to A',
            headerTruncatedBackTitle: `to A`,
            headerRight: (
                <Button title='+1' color='#fff' onPress={navigation.getParam('increaseCount')}/>
            ),
        };
    });

    componentDidMount(): void {
        this.props.navigation.setParams({increaseCount: this._increaseCount});
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen!</Text>
                <Text>Count: {this.state.count}</Text>
                <Button title='Open modal' onPress={() => {
                    this.props.navigation.navigate('MyModal');
                }}/>
                <Button title='test' onPress={() => {
                    this.props.navigation.navigate('Details', {id: 86});
                }}/>
            </View>
        );
    }
}

export {Home};
