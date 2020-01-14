import React from 'react';
import {View} from 'react-native';
import {Button, Text, Header, Divider} from 'react-native-elements';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TextSmall} from '../../components/base';
import moment from 'moment/src/moment';
import * as _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноябрь', 'Декабрь'],
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';

class CalendarModalScreen extends React.Component {

    apply_filter() {
        this.props.navigation.goBack();
    }

    reset_filter() {
        this.props.navigation.goBack();
    }

    render() {
        // selected from redux
        let selected_date_str = '2020-01-15';

        // get from api
        let date_format = 'YYYY-MM-DD';
        let available_dates = ['2020-01-15', '2020-01-16', '2020-01-19', '2020-01-20', '2020-01-23', '2020-01-24',
                '2020-01-27', '2020-01-28', '2020-01-31', '2020-02-01'],
            from_date_str = moment().format(date_format);

        // parse
        let first_date = moment(from_date_str, date_format),
            max_days = 15,
            selected_color = '#1087cc',
            current_day_color = '#ffc6bf';

        let last_date_format = from_date_str;

        let marked_dates = {
            [from_date_str]: {selected: true, selectedColor: current_day_color},
            // [selected_date_str]: {selected: true, selectedColor: selected_color},
        };

        // add marked days
        let temp_date = first_date;
        let temp_count_days = max_days;
        while (true) {

            if (!temp_count_days) {
                break;
            }

            let temp_date_str = temp_date.format(date_format);
            last_date_format = temp_date_str;

            if (_.indexOf(available_dates, temp_date_str) === -1) {
                marked_dates[temp_date_str] = Object.assign(
                    {},
                    {disabled: true, disableTouchEvent: true},
                    marked_dates[temp_date_str] ?? {});
            }

            temp_date.add(1, 'day');
            temp_count_days--;
        }

        const {navigation} = this.props;

        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Header
                    backgroundColor={'#fff'}
                    leftContainerStyle={{flex: 0.30}}
                    centerContainerStyle={{flex: 0.40}}
                    rightContainerStyle={{flex: 0.3}}

                    leftComponent={<Button type={'clear'} onPress={() => navigation.goBack()}
                                           titleStyle={{fontSize: 16}} title={'Закрыть'}/>}
                    centerComponent={<Text style={{fontSize: 16}}>Выберите день</Text>}
                />
                <View style={{paddingTop: 15, width: '100%'}}>
                    <Calendar
                        minDate={from_date_str}
                        maxDate={last_date_format}
                        onDayPress={(day) => {
                            console.log('selected day', day);
                        }}
                        markedDates={marked_dates}
                    />
                    <Divider style={{height: 30, backgroundColor: '#fff'}}/>
                </View>
                <View style={{padding: 5}}>
                    <TextSmall>Записаться к врачу можно только на ближайшие 2 недели</TextSmall>
                </View>
            </View>
        );
    }
}

export {CalendarModalScreen};
