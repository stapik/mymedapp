import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class IndexScreen extends React.Component {

    state = {
        count: 0,
    };

    static navigationOptions = (({navigation}) => {
        return {
            title: 'Ваш номер телефона',
            // headerBackTitle: 'A much too long text for back button from B to A',
            headerTruncatedBackTitle: 'Назад',
            headerRight: (
                <Button color='#fff' title="Фильтр" onPress={() => {
                    navigation.navigate('FilterModal');
                }}/>
            ),
        };
    });

    constructor(props) {
        super(props);
        this.getData();
    }

    storeData = () => {
        AsyncStorage.setItem('count', this.state.count).catch((e) => console.log(e.toString()));
    };

    getData = () => {
        AsyncStorage.getItem('count').then((value) => {
            let val = JSON.parse(value);
            this.setState({count: val ?? 0});
        }).catch((e) => {
            this.setState({count: 0});
        });
    };

    _increaseCount = () => {
        let new_count = this.state.count + 1;
        //this.setState({}, () => this.storeData());
        //this.setState();
    };

    componentDidMount(): void {
        this.props.navigation.setParams({increaseCount: this._increaseCount});
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen!</Text>
                <Text>Count: {this.state.count}</Text>
                <Button title='+1 count' onPress={navigation.getParam('increaseCount')}/>
                <Button title='Открыть доктора' onPress={() => {
                    navigation.navigate('Doctor', {id: 86});
                }}/>
            </View>
        );
    }
}

export {IndexScreen};
