import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class IndexScreen extends React.Component {

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
        }).catch((e) => {
            this.setState({count: 0});
            console.log(e.toString())
        });
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
                    this.props.navigation.navigate('Modal');
                }}/>
                <Button title='test' onPress={() => {
                    this.props.navigation.navigate('Details', {id: 86});
                }}/>
            </View>
        );
    }
}

export {IndexScreen};
