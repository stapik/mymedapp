import React from 'react';
import moment from 'moment/src/moment';
import {Button, Layout, Input, Text, Divider} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';

class AppointmentFormScreen extends React.Component {

    state = {
        country_code: '+7',
        birth_date: '',
    };

    static navigationOptions = (({}) => {
        return {
            title: 'Запись на приём',
        };
    });

    render() {

        return (
            <Layout style={{padding: 15}}>
                <Input
                    label='Номер телефона'
                    placeholder=''
                />
                <Input
                    label='Фамилия'
                    placeholder=''
                />
                <Input
                    label='Имя'
                    placeholder=''
                />
                <Input
                    label='Дата рождения'
                    placeholder=''
                />
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    timeZoneOffsetInMinutes={0}
                />
                <Button style={{marginTop: 25}}>
                    Записаться
                </Button>
            </Layout>
        );
    }
}

export {AppointmentFormScreen};
