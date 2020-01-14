import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {Button, Card, Divider, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

class IndexScreen extends React.Component {
    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                {_.times(12, i => {
                    return (<View key={i}>
                        <View style={{
                            backgroundColor: '#eeeeee',
                            padding: 10,
                            borderRadius: 5,
                            flex: 1,
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    borderColor: '#F04155',
                                    paddingBottom: 5,
                                    borderBottomWidth: 1,
                                }}>
                                <Icon name={'calendar'} style={{fontSize: 15, color: '#009989'}}/>
                                <Text style={{paddingLeft: 10}}>10.01.2020 в 12:00</Text>
                            </View>
                            <Divider style={{height: 5, backgroundColor: 'transparent'}}/>
                            <Text>Врач: Иванов Иван Иванович</Text>
                            <Divider
                                style={{
                                    height: 5,
                                    backgroundColor: 'transparent',
                                }}/>
                            <Text>Пациент: Тестовый Тест Тестович</Text>
                        </View>
                        <Divider style={{height: 10, backgroundColor: 'transparent'}}/>
                    </View>);
                })}

                <Divider style={{height: 10, backgroundColor: 'transparent'}}/>
            </ScrollView>
        );
    }
}

export {IndexScreen};
