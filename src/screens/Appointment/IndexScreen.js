import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';


class IndexScreen extends React.Component {

    state = {
        count: 0,
        backgroundColor: '#fff',
        active: false,
    };

    static navigationOptions = (({navigation}) => {
        return {
            title: 'Ваш номер телефона',
            // headerBackTitle: 'A much too long text for back button from B to A',
            headerTruncatedBackTitle: 'Назад',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('FilterModal')}>
                    <Ionicons name='ios-options' style={{color: '#fff', paddingRight: 10}} size={25}/>
                </TouchableOpacity>

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

    _typeSpecialtyHandler(valued) {

    }

    _selectSpecialtyHandler(id) {
        let title = 'Терапия';
        this.props.navigation.navigate('Specialty', {id, title});
    }

    _changeItemStyle() {
        this.setState({
            backgroundColor: '#dadada',
        });
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#dadada',
                    margin: 20,
                }}>
                    <TextInput
                        autoFocus={true}
                        maxLength={25}
                        placeholder='Специальность'
                        onChangeText={(value) => this._typeSpecialtyHandler(value)}
                        style={{
                            fontSize: 22,
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    />
                </View>
                <ScrollView style={{borderTopWidth: 1, borderColor: '#dadada', paddingTop: 15, flex: 1}}>
                    {_.times(4, i => {
                        return (
                            <TouchableHighlight
                                onPress={() => this._selectSpecialtyHandler(i)} key={i}>
                                <View style={{
                                    backgroundColor: '#fff',
                                }}>
                                    <View style={{
                                        padding: 10,
                                        paddingLeft: 0,
                                        margin: 5,
                                        marginTop: 0,
                                        marginBottom: 0,
                                        marginLeft: 20,
                                        borderBottomWidth: 1,
                                        borderColor: '#dadada',
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                        }}>Терапия</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>);
                    })}
                </ScrollView>
            </View>
        );
    }
}

export {IndexScreen};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
    countText: {
        color: '#FF00FF',
    },
});
