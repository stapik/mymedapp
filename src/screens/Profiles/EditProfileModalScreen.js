import React from 'react';
import {View, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Button, Divider, Header, Input, Text} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class EditProfileModalScreen extends React.Component {

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
                    centerComponent={{text: 'Редактирование', style: {fontSize: 15}}}
                    leftComponent={<Button title={'Закрыть'}
                                           titleStyle={{fontSize: 15}}
                                           type="clear"
                                           onPress={() => this.props.navigation.goBack()}/>}
                    rightComponent={<Button title={'Сохранить'}
                                            titleStyle={{fontSize: 15}}
                                            type="clear"
                                            onPress={() => this.props.navigation.goBack()}/>}
                    rightContainerStyle={{flex: 0.3}}
                    centerContainerStyle={{flex: 0.4}}
                    leftContainerStyle={{flex: 0.3}}
                />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView>
                        <View style={{paddingTop: 20, alignItems: 'center'}}>
                            {/*<Image*/}
                            {/*source={require('../../images/profile.png')}*/}
                            {/*style={{height: 100, width: 100, margin: 'auto'}}/>*/}
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
                                    locale={'ru'}
                                    mode="date"
                                    placeholder="Выберите дату"
                                    format="DD.MM.YYYY"
                                    confirmBtnText="Выбрать"
                                    cancelBtnText="Закрыть"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            display: 'none',
                                            left: 0,
                                            marginLeft: 0,
                                        },
                                        dateInput: {
                                            marginLeft: 0,
                                            fontSize: 15,
                                        },
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({date: date});
                                    }}
                                />
                            </View>
                        </View>
                        <Divider style={{height: 30, backgroundColor: '#fff'}}/>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export {EditProfileModalScreen};
