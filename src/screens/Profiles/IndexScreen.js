import React from 'react';
import {View, TouchableHighlight, Image} from 'react-native';
import {ListItem, Text} from 'react-native-elements';

class IndexScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.2, flexDirection: 'row', padding: 20, alignItems: 'flex-start'}}>
                    <View>
                        <Image
                            source={require('../../images/profile.png')}
                            style={{height: 100, width: 100, margin: 'auto'}}/>
                    </View>
                    <View style={{paddingLeft: 20}}>
                        <Text>
                            Телефон: +7 (999) 999-99-99
                        </Text>
                        <Text>
                            Фамилия: Тестовый
                        </Text>
                        <Text>
                            Имя: Тест
                        </Text>
                        <Text>
                            Дата рождения: 12.12.1992
                        </Text>
                    </View>
                </View>

                <TouchableHighlight onPress={() => this.props.navigation.navigate('EditProfile')}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Редактировать профиль'}
                        bottomDivider
                        chevron
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Support')}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Поддержка'}
                        bottomDivider
                        chevron
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('SignOut')}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Выход'}
                        bottomDivider
                        chevron
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

export {IndexScreen};
