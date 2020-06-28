import React from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-elements';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TextSmall} from '../../components/base';
import moment from 'moment/src/moment';
import * as _ from 'lodash';

LocaleConfig.locales['ru'] = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    dayNames: [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';

class CalendarScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Выберите день',
        };
    };

    /**
     *
     * @param day
     */
    handleSelectDate = (day) => {
        const {navigation} = this.props;
        const {handleSelectDate} = this.props.navigation.state.params;
        handleSelectDate(day);
        navigation.goBack();
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {
            selectedDate: selected_date_str,
            availableDates: available_dates, allDates,
        } = this.props.navigation.state.params;
        // get from api
        let date_format = 'YYYY-MM-DD';
        let from_date_str = moment().format(date_format);

        // parse
        let first_date = moment(from_date_str, date_format),
            max_days = 15,
            selected_color = '#1087cc',
            current_day_color = '#ffc6bf';

        let last_date_format = from_date_str;

        let marked_dates = {
            [from_date_str]: {selected: true, selectedColor: current_day_color},
            [selected_date_str]: {selected: true, selectedColor: selected_color},
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

            if (_.indexOf(available_dates, temp_date_str) === -1 && !allDates) {
                marked_dates[temp_date_str] = Object.assign(
                    {},
                    {disabled: true, disableTouchEvent: true},
                    marked_dates[temp_date_str] ?? {});
            }

            temp_date.add(1, 'day');
            temp_count_days--;
        }

        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                <View style={{width: '100%', marginTop: 20}}>
                    <Calendar
                        minDate={from_date_str}
                        current={new Date()}
                        maxDate={last_date_format}
                        onDayPress={(day) => this.handleSelectDate(day.dateString)}
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

export {CalendarScreen};
