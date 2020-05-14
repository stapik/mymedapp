import React from 'react';
import {CheckBox, Text, Layout, Radio, RadioGroup, Button, Divider} from '@ui-kitten/components';
import {ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import moment from 'moment';

class SelectDateScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Выбор даты приёма',
        };
    };

    render() {
        const {navigation} = this.props;
        const m = moment();
        const current_date = m.format('YYYY-MM-DD');
        const current_date_text = m.format('DD.MM.YYYY');
        const new_date = m.add(1, 'day');
        const second_date = new_date.format('YYYY-MM-DD');
        const second_date_text = new_date.format('DD.MM.YYYY');

        return (
            <Layout>
                <TouchableHighlight
                    onPress={() => navigation.getParam('handleSelectDate')(current_date)}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={<Text category={'s1'}>
                            Сегодня
                            <Text appearance={'hint'}> &mdash; {current_date_text}</Text>
                        </Text>}
                        bottomDivider
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => navigation.getParam('handleSelectDate')(second_date)}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={<Text category={'s1'}>
                            Завтра
                            <Text appearance={'hint'}> &mdash; {second_date_text}</Text>
                        </Text>}
                        bottomDivider
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        navigation.navigate('Calendar', {
                            handleSelectDate: navigation.getParam('handleSelectDate'),
                            allDates: true,
                        });
                    }}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={<Text category={'s1'}>Выбрать день</Text>}
                        bottomDivider
                        chevron
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => navigation.getParam('handleSelectDate')(null)}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={<Text category={'s1'}>Все дни</Text>}
                        bottomDivider
                    />
                </TouchableHighlight>
            </Layout>
        );
    }
}

export {SelectDateScreen};
