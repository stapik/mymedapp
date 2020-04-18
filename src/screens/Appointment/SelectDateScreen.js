import React from 'react';
import {CheckBox, Text, Layout, Radio, RadioGroup, Button, Divider} from '@ui-kitten/components';
import {ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

class SelectDateScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Выбор даты приёма',
        };
    };

    render() {
        const {navigation} = this.props;

        return (
            <Layout>
                <TouchableHighlight
                    onPress={() =>{}}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Сегодня'}
                        bottomDivider
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() =>{}}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Завтра'}
                        bottomDivider
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() =>{navigation.navigate('Calendar')}}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Выбрать день'}
                        bottomDivider
                        chevron
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() =>{}}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Все дни'}
                        bottomDivider
                    />
                </TouchableHighlight>
            </Layout>
        );
    }
}

export {SelectDateScreen};
