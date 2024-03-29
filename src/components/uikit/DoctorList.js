import React from 'react';
import {Button, Divider, Layout, Text} from '@ui-kitten/components';
import {ActivityIndicator, Dimensions, FlatList, Image, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import Str from '../../utils/Str';

class DoctorList extends React.Component {

    /**
     * @param doctor
     * @returns {*}
     */
    renderItem = ({item: doctor}) => {

        const {width} = Dimensions.get('window');
        const avatar_part = 0.30;
        const avatar_width = width * avatar_part;
        const avatar_height = width * avatar_part * 0.75;
        const specialties = doctor.specialties ? (doctor.specialties.map((item) => item.name)).join(', ') : '';

        // text
        const work_period_text = doctor.work_period ? 'Стаж ' + doctor.work_period : '';
        const work_rank = doctor.work_rank ?? '';
        const work_degree = doctor.work_degree ?? '';
        const work_rank_and_degree = (work_rank ? work_rank + '. ' : '') + (work_degree ? work_degree + '.' : '');

        return (<Layout style={{
            padding: 10,
            borderRadius: 5,
            shadowOpacity: 0.07,
            shadowRadius: 3,
            marginRight: 15,
            marginLeft: 15,
            borderColor: '#e5e5e5',
            borderWidth: 1,
        }}>
            <TouchableOpacity activeOpacity={0.60} onPress={() => this.props.selectHandler(doctor)}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        source={{uri: doctor.avatar}}
                        resizeMode={'cover'}
                        style={{width: avatar_width, height: avatar_height, borderRadius: 5}}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                    <View style={{
                        padding: 5,
                        paddingTop: 0,
                        paddingLeft: 10,
                        alignItems: 'flex-start',
                        flex: 1,
                        flexWrap: 'wrap',
                    }}>
                        <Text category={'s1'}>{doctor.name}</Text>
                        {work_period_text ? <Text
                            style={{paddingTop: 5, paddingRight: 15}}
                            category={'c2'}
                            appearance={'hint'}>
                            {work_period_text}
                        </Text> : null}

                        <Text
                            style={{paddingTop: 5, paddingRight: 15}}
                            category={'c2'}
                            appearance={'hint'}>
                            {work_rank_and_degree}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{paddingTop: 5}}
                    category={'c2'}
                    appearance={'hint'}>
                    {specialties}
                </Text>
                <Divider style={{marginTop: 10, marginBottom: 10, backgroundColor: '#e7e7e7'}}/>
                {this.renderSlotDays(doctor.siblings_slot_days, doctor)}
            </TouchableOpacity>
        </Layout>);
    };

    /**
     *
     * @param slot_days
     * @param doctor
     * @returns {*}
     */
    renderSlotDays(slot_days, doctor) {
        slot_days = slot_days !== undefined ? slot_days : [];
        const {selectedDate} = this.props;
        const slot_days_text = slot_days.map((item) => moment(item).format('dddd DD.MM')).join(', ');
        let datesText = '';

        if (selectedDate) {
            const selectedDateText = moment(selectedDate).format('dddd DD.MM');
            datesText = (<View>
                <Text category={'s2'}>Выбранная дата приёма</Text>
                <Text category={'s2'} appearance={'hint'}>
                    {selectedDateText} &mdash;
                    &nbsp;{doctor.day_slots_count}
                    &nbsp;{Str.numberStr(doctor.day_slots_count, ['номерок', 'номерка', 'номерков'])}
                </Text>
            </View>);
        } else {
            datesText = (<View>
                <Text category={'s2'}>Ближайшие даты приёма</Text>
                <Text category={'s2'} appearance={'hint'}>{slot_days_text}</Text>
            </View>);
        }

        if (slot_days_text) {
            return (<View>
                <View style={{paddingBottom: 5}}>{datesText}</View>
                <Button status={'danger'}
                        size={'small'}
                        onPress={() => this.props.selectHandler(doctor)}>Записаться</Button>
            </View>);
        }

        return (<Text category={'c2'} appearance={'hint'}>Нет свободного времени</Text>);
    }


    /**
     *
     * @returns {*}
     */
    renderDivider = () => {
        return <View style={{height: 15, backgroundColor: 'transparent'}}/>;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {doctors, renderHeader} = this.props;
        return (<FlatList
            ListHeaderComponent={renderHeader ?? this.renderDivider}
            keyExtractor={(item, idx) => idx.toString()}
            data={doctors}
            initialNumToRender={5}
            style={{backgroundColor: '#f5f5f5'}}
            ItemSeparatorComponent={this.renderDivider}
            ListFooterComponent={this.renderDivider}
            ListEmptyComponent={<Text appearance={'hint'} category={'p1'} style={{padding: 15}}>Пусто</Text>}
            renderItem={this.renderItem}/>);
    }
}

export {DoctorList};
