import React from 'react';
import {Platform} from '../../Constants';
import {ListItem} from 'react-native-elements';
import {
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';

class IndexScreen extends React.Component {

    state = {
        count: 0,
        backgroundColor: '#fff',
        active: false,
        search: '',
    };

    static navigationOptions = (({navigation}) => {
        return {
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

    updateSearch = search => {
        this.setState({search});
    };

    render() {
        const {navigation} = this.props;
        const {search} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#dadada',
                }}>
                    <SearchBar
                        placeholder='Специальность'
                        onChangeText={this.updateSearch}
                        value={search}
                        lightTheme={true}
                        showCancel={true}
                        platform={Platform}
                        style={{
                            fontSize: 22,
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    />
                </View>
                <ScrollView style={{flex: 1}}>
                    {_.times(4, i => {
                        return (
                            <TouchableHighlight onPress={() => this._selectSpecialtyHandler(i)} key={i}>
                                <ListItem
                                    style={{backgroundColor: '#fff'}}
                                    title={'Терапия'}
                                    bottomDivider
                                    chevron
                                />
                            </TouchableHighlight>
                        );
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
