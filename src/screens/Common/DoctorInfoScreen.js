import React from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {Button, Layout, Text} from '@ui-kitten/components';
import {SlotCarousel} from '../../components/uikit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {bindActionCreators} from 'redux';
import {toggleFavoriteDoctor} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {withDoctorStoreService} from '../../components/hoc';
import moment from 'moment';
import Str from '../../utils/Str';

class ContainerScreen extends React.Component {

    state = {
        selected_date: null,
    };

    static navigationOptions = ({navigation: {state: {params}}}) => {
        const shorthandName = Str.getShorthandName(params.doctor.name);
        const is_favorite = params.is_favorite;
        return {
            title: shorthandName,
            headerRight: (is_favorite === undefined ? <Text/> :
                    <TouchableOpacity activeOpacity={0.6} onPress={params.toggleFavorite}>
                        <Icon name='star' style={{paddingRight: 15, color: 'red'}} size={20}
                              solid={is_favorite}/>
                    </TouchableOpacity>
            ),
        };
    };

    /**
     *
     * @returns {moment.Moment}
     * @private
     */
    _getSelectedDate() {
        let selected_date = moment();
        if (this.state.selected_date) {
            selected_date = moment(this.state.selected_date);
        }
        return selected_date.format('YYYY-MM-DD');
    }

    /**
     *
     * @private
     */
    showCalendar = (slot_days) => {
        this.props.navigation.navigate('Calendar', {
            handleSelectDate: this.handleSelectDate,
            selectedDate: this._getSelectedDate(),
            availableDates: slot_days,
        });
    };

    /**
     *
     */
    componentDidMount(): void {
        const {toggleFavorite, doctors_filter, doctor_info} = this.props;
        const selected_date = doctors_filter.date ?? doctor_info.slot_days[0];
        this.setState({selected_date});
        this.props.navigation.setParams({toggleFavorite});
    }


    /**
     * s
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {navigation, is_favorite} = this.props;
        if (navigation.getParam('is_favorite', -1) !== is_favorite) {
            navigation.setParams({is_favorite});
        }
    }

    /**
     *
     * @param date
     */
    handleSelectDate = (date) => {
        this.setState({selected_date: date});
    };

    /**
     * @param slots
     * @param clinic_id
     * @returns {*}
     * @private
     */
    filterSlots(slots, clinic_id) {
        let clinic_slots = slots.filter(slot => slot.clinic_id === clinic_id);
        return clinic_slots.filter(
            slot => moment(slot.time_start).format('YYYY-MM-DD') === this._getSelectedDate(),
        );
    }

    /**
     *
     * @returns {string}
     * @private
     */
    _getDateName() {
        const format = 'YYYY-MM-DD';
        let selected_date = moment();
        if (this.state.selected_date) {
            selected_date = moment(this.state.selected_date);
        }
        if (moment().format(format) === selected_date.format(format)) {
            return 'Сегодня';
        }
        return selected_date.format('dddd DD.MM');
    }

    /**
     *
     * @param counted
     * @returns {*}
     */
    renderSlotsCountMsg(counted) {
        return counted > 0 ? null :
            <Text style={{padding: 15, textAlign: 'center', paddingTop: 25}} category={'c2'} appearance={'hint'}>
                Нет свободного времени
            </Text>;
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const {navigation, doctor_info: doctor} = this.props;
        const specialties = (doctor.specialties.map((item) => item.name)).join(', ');

        // text
        const work_period_text = doctor.work_period ? 'Стаж ' + doctor.work_period : '';
        const work_rank = doctor.work_rank ?? '';
        const work_degree = doctor.work_degree ?? '';
        const work_rank_and_degree = (work_rank ? work_rank + '. ' : '') + (work_degree ? work_degree + '.' : '');

        const {width} = Dimensions.get('window');
        const slotsCount = doctor.slots.length;

        return (
            <ScrollView
                ref="scroll"
                style={{flex: 1}}>
                <Image
                    source={{uri: doctor.avatar}}
                    resizeMode={'cover'}
                    style={{width: width, height: width * 0.75}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <View style={{padding: 15}}>
                    <Text category={'h6'}>{doctor.name}</Text>
                    <Divider style={{height: 5, backgroundColor: '#fff'}}/>
                    {(work_period_text !== '' || work_rank_and_degree !== '')
                    && (<Text appearance={'hint'}>
                        {work_period_text} {work_rank_and_degree}
                    </Text>)}
                    <Text appearance={'hint'}>
                        {specialties}
                    </Text>
                </View>

                <View style={{paddingTop: 5}}>

                    <View style={{borderColor: '#ddd', borderTopWidth: 2, borderBottomWidth: 2, padding: 10}}>
                        <Text category={'s1'} style={{textAlign: 'center'}}>Расписание</Text>
                    </View>

                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        paddingBottom: 0,
                    }}>
                        <Text category={'s1'}>{this._getDateName()}</Text>
                        <Button appearance={'outline'}
                                status={'info'}
                                size={'small'}
                                disabled={doctor.slots.length === 0}
                                onPress={() => this.showCalendar(doctor.slot_days)}>
                            Изменить дату
                        </Button>
                    </View>

                    {this.renderSlotsCountMsg(slotsCount)}

                    <Layout style={{padding: 15, paddingBottom: 0, marginBottom: -15}}>
                        {doctor.clinics.map((clinic) => {
                            const clinic_slots = this.filterSlots(doctor.slots, clinic.id);
                            return (clinic_slots.length > 0 &&
                                <Layout key={clinic.id} style={{marginBottom: 15}}>
                                    <Layout style={{padding: 15, paddingBottom: 10, borderRadius: 5}} level={'3'}>
                                        <Text category={'p1'} style={{textAlign: 'center'}}>{clinic.name}</Text>
                                        {clinic.address ? <Text style={{paddingLeft: 15, paddingRight: 15}}
                                                                appearance={'hint'}>{clinic.address}</Text> : null}
                                        <Divider style={{marginTop: 10, marginBottom: 5}}/>
                                        <SlotCarousel
                                            scroll={this.refs.scroll}
                                            slots={clinic_slots}
                                            doctor={doctor}
                                            clinic={clinic}
                                            navigation={navigation}/>
                                    </Layout>
                                </Layout>
                            );
                        })}
                    </Layout>

                    <Divider style={{height: 15, backgroundColor: '#fff'}}/>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({doctors_filter, doctor_info, page_loader, doctor_info: {is_favorite}}) => {
    return {doctors_filter, doctor_info, page_loader, is_favorite};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService}) => {
    return bindActionCreators({
        toggleFavorite: toggleFavoriteDoctor(doctorsStoreService),
    }, dispatch);
};

const DoctorInfoScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {DoctorInfoScreen};

