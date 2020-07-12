import React, {Component} from 'react';
import {Button, Layout, Text, Divider} from '@ui-kitten/components';
import {ActivityIndicator, Alert, Dimensions, FlatList, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {bindActionCreators} from 'redux';
import {cancelVisit, deleteVisit, fetchDoctorInfo, fetchVisits} from '../actions';
import compose from '../utils/compose';
import {withDoctorStoreService, withVisitsStoreService} from './hoc';
import {connect} from 'react-redux';
import {Phone} from '../utils';
import Push from '../utils/Push';

class VisitListContainer extends Component {

    state = {
        refreshing: false,
    };

    /**
     * @param doctor
     * @private
     */
    _selectDoctor = (doctor) => {
        const {fetchDoctorInfo, navigation} = this.props;
        fetchDoctorInfo(doctor.id, () => navigation.navigate('DoctorInfo', {doctor}));
    };

    /**
     * @param id
     * @private
     */
    _cancelVisit = (id) => {
        const {cancelVisit, fetchVisits} = this.props;
        Alert.alert(
            '',
            'Отмениить визит?',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да', onPress: () => {
                        cancelVisit(id, () => {
                            fetchVisits();
                            Push.cancel(id);
                        });
                    },
                },
            ],
            {cancelable: false},
        );
    };

    /**
     * @param id
     * @private
     */
    _deleteVisit = (id) => {
        const {deleteVisit, fetchVisits} = this.props;
        Alert.alert(
            '',
            'Удалить визит?',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да', onPress: () => {
                        deleteVisit(id, () => {
                            fetchVisits();
                        });
                    },
                },
            ],
            {cancelable: false},
        );
    };

    /**
     *
     */
    renderItem = ({item: {doctor, patient, clinic, date, time, canceled, id}}) => {
        const {old} = this.props;
        const {width} = Dimensions.get('window');
        const avatar_part = 0.30;
        const avatar_width = width * avatar_part;
        const avatar_height = width * avatar_part * 0.75;

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
            <TouchableOpacity activeOpacity={0.60} onPress={() => this._selectDoctor(doctor)}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        source={{uri: doctor.avatar}}
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
                        <View style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            paddingTop: 3,
                            paddingBottom: 5,
                            alignItems: 'center',
                        }}>
                            <Icon style={{color: '#6f6f6f'}} name={'calendar-alt'} size={12}/>
                            <Text style={{paddingLeft: 5, paddingRight: 15}} category={'c1'} appearance={'hint'}>
                                {date}
                            </Text>
                            <Icon style={{color: '#6f6f6f'}} name={'clock'} size={12}/>
                            <Text style={{paddingLeft: 5, paddingRight: 5}} category={'c2'} appearance={'hint'}>
                                {time}
                            </Text>
                        </View>
                        <Text category={'s1'}>{clinic.name}</Text>
                        <Text category={'c2'} appearance={'hint'}>{clinic.address}</Text>
                    </View>
                </View>
                <Divider style={{marginTop: 13, marginBottom: 10, backgroundColor: '#e7e7e7'}}/>
                <View>
                    <Text category={'s1'}>{patient.first_name} {patient.last_name}</Text>
                    <Text category={'c2'} appearance={'hint'}>
                        {Phone.format(patient.phone_number, false, true)}
                    </Text>
                </View>
                <View style={{paddingTop: 10}}>
                    {this.statusButtons(old, canceled, id, doctor)}
                </View>
            </TouchableOpacity>
        </Layout>);
    };

    /**
     * @param old
     * @param canceled
     * @param visit_id
     * @param doctor
     * @returns {*}
     */
    statusButtons(old, canceled, visit_id, doctor) {

        const statusText = canceled ? 'Отменён' : 'Подтверждено клиникой';
        const statusType = canceled ? 'danger' : 'success';
        let pressCb, pressBtnText;

        if (old) {
            pressCb = () => this._deleteVisit(visit_id);
            pressBtnText = 'Удалить';
        } else {
            pressCb = canceled ? () => this._deleteVisit(visit_id) : () => this._cancelVisit(visit_id);
            pressBtnText = canceled ? 'Удалить' : 'Отменить';
        }

        return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button size={'small'}
                    onPress={pressCb}
                    style={{width: '37%'}}
                    appearance='outline'
                    status={'danger'}>{pressBtnText}</Button>
            {old ? <Button size={'small'}
                           style={{width: '61%'}}
                           onPress={() => this._selectDoctor(doctor)}
                           appearance='outline'
                           status={'info'}>Повторная запись</Button>
                :
                <Layout style={{padding: 7, borderRadius: 5, width: '61%'}} level={'3'}>
                    <Text status={statusType} style={{textAlign: 'center'}}>{statusText}</Text>
                </Layout>
            }
        </View>;
    }

    /**
     *
     */
    handleRefresh = () => {
        const {fetchVisits} = this.props;
        this.setState({refreshing: true});
        fetchVisits(() => this.setState({refreshing: false}));
    };

    /**
     *
     * @returns {*}
     */
    renderDivider = () => {
        return <View style={{height: 15, backgroundColor: 'transparent'}}/>;
    };

    /**
     * @returns {*}
     */
    render() {
        const {visits} = this.props;
        return (
            <FlatList
                ListEmptyComponent={<Text appearance={'hint'} category={'p1'} style={{padding: 15}}>
                    Нет записей</Text>}
                style={{backgroundColor: '#f5f5f5'}}
                // refreshing={this.state.refreshing}
                // onRefresh={this.handleRefresh}
                data={visits}
                initialNumToRender={5}
                ItemSeparatorComponent={this.renderDivider}
                ListFooterComponent={this.renderDivider}
                ListHeaderComponent={this.renderDivider}

                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderItem}/>
        );
    }
}

const mapStateToProps = ({}) => {
    return {};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService, visitsStoreService}) => {
    return bindActionCreators({
        fetchDoctorInfo: fetchDoctorInfo(doctorsStoreService),
        fetchVisits: fetchVisits(visitsStoreService),
        deleteVisit: deleteVisit(visitsStoreService),
        cancelVisit: cancelVisit(visitsStoreService),
    }, dispatch);
};

const VisitList = compose(
    withDoctorStoreService(),
    withVisitsStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(VisitListContainer);

export {VisitList};

