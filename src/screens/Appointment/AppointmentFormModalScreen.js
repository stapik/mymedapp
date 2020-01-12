import React from 'react';
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {Button, Text, Header, Divider, Input, Card, Image} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {TextSmall} from '../../components/base';
import moment from 'moment/src/moment';
import * as _ from 'lodash';

class AppointmentFormModalScreen extends React.Component {

    state = {
        country_code: '+7',
        birth_date: '',
    };

    constructor(props) {
        super(props);
        this.state = {birth_date: new Date()};

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({birth_date: newDate});
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fff'}
                    leftComponent={<Button title={'Закрыть'}
                                           titleStyle={{fontSize: 16}}
                                           type="clear"
                                           onPress={() => this.props.navigation.goBack()}/>}
                    rightComponent={<Button title={'Записаться'}
                                            titleStyle={{fontSize: 16}}
                                            type="clear"
                                            onPress={() => this.props.navigation.goBack()}/>}

                    leftContainerStyle={{flex: 0.3}}
                    centerContainerStyle={{flex: 0}}
                    rightContainerStyle={{flex: 0.5}}
                />

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView style={{padding: 20}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: '#009989',
                        }}>
                            <View style={{flex: 0.4}}>
                                <Image
                                    PlaceholderContent={<ActivityIndicator/>}
                                    resizeMode="cover"
                                    style={{height: 105}}
                                    source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}}
                                />
                            </View>
                            <View style={{flex: 0.6, paddingLeft: 15, paddingTop: 9}}>
                                <Text style={{fontSize: 16}}>Иванов Иван Иванович</Text>
                                <Divider style={{height: 5, backgroundColor: '#fff'}}/>
                                <Text style={{fontSize: 16}}>20.01.2020</Text>
                                <Divider style={{height: 5, backgroundColor: '#fff'}}/>
                                <Text style={{fontSize: 16}}>16:00</Text>
                            </View>
                        </View>
                        <Divider style={{height: 10, backgroundColor: '#fff'}}/>
                        <Input
                            label={'Номер телефона'}
                            placeholder=''
                            autoFocus={true}
                            keyboardType={'numeric'}
                            maxLength={10}
                            style={{fontSize: 18}}
                            leftIcon={
                                <Text style={{paddingRight: 5, fontSize: 18, marginTop: -1}}>+7</Text>
                            }
                        />
                        <Divider style={{height: 10, backgroundColor: '#fff'}}/>
                        <Input
                            label={'Фамилия'}
                            placeholder=''
                            autoFocus={true}
                            style={{fontSize: 18}}
                        />
                        <Divider style={{height: 10, backgroundColor: '#fff'}}/>
                        <Input
                            label={'Имя'}
                            placeholder=''
                            autoFocus={true}
                            style={{fontSize: 18}}
                        />
                        <Divider style={{height: 10, backgroundColor: '#fff'}}/>
                        <View style={{padding: 10}}>
                            <Text style={{color: '#919191', fontWeight: 'bold', fontSize: 16}}>Дата рождения</Text>
                            <DatePicker
                                style={{width: 150, paddingTop: 10}}
                                date={this.state.date}
                                mode="date"
                                placeholder="Выберите дату"
                                format="DD.MM.YYYY"
                                confirmBtnText="Выбрать"
                                cancelBtnText="Закрыть"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 35,
                                        fontSize: 15,
                                    },
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {
                                    this.setState({date: date});
                                }}
                            />
                        </View>
                        <Divider style={{height: 30, backgroundColor: '#fff'}}/>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export {AppointmentFormModalScreen};
