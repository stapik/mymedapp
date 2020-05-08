import React from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {Button, Layout, Text} from '@ui-kitten/components';
import {SlotCarousel} from '../../components/uikit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {bindActionCreators} from 'redux';
import {toggleFavoriteDoctor} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {withDoctorStoreService} from '../../components/hoc';

class ContainerScreen extends React.Component {

    static navigationOptions = ({navigation, navigation: {state: {params}}}) => {
        const last_name = params.doctor.name.split(' ')[0];
        const is_favorite = params.is_favorite;
        return {
            title: last_name,
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
     * @private
     */
    _showCalendar = () => {
        this.props.navigation.navigate('Calendar');
    };

    /**
     *
     */
    componentDidMount(): void {
        const {toggleFavorite} = this.props;
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
     * @returns {*}
     */
    render() {
        const {navigation, doctor_info} = this.props;
        const specialties = (doctor_info.specialties.map((item) => item.name)).join(', ');

        return (
            <ScrollView style={{flex: 1}}>
                <Image
                    source={{uri: doctor_info.avatar}}
                    style={{width: '100%', height: 250}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <View style={{padding: 15}}>
                    <Text category={'h6'}>{doctor_info.name}</Text>
                    <Divider style={{height: 5, backgroundColor: '#fff'}}/>
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
                        <Text category={'s1'}>Сегодня</Text>
                        <Button appearance={'outline'} status={'info'} size={'small'} onPress={this._showCalendar}>
                            Изменить дату
                        </Button>
                    </View>

                    <Layout style={{padding: 15, paddingBottom: 0, marginBottom: -15}}>
                        {doctor_info.clinics.map((clinic) => {

                            let clinic_slots = doctor_info.slots.filter(slot => slot.clinic_id === clinic.id);

                            return (
                                <Layout key={clinic.id} style={{marginBottom: 15}}>
                                    <Layout style={{paddingTop: 15, borderRadius: 5}} level={'3'}>
                                        <Text category={'p1'} style={{textAlign: 'center'}}>{clinic.name}</Text>
                                        {clinic.address ? <Text style={{paddingLeft: 15, paddingRight: 15}}
                                                                appearance={'hint'}>{clinic.address}</Text> : null}
                                        <Divider style={{margin: 10}}/>
                                        <SlotCarousel
                                            style={{marginLeft: 15, paddingBottom: 15, marginRight: 15}}
                                            slots={clinic_slots}
                                            doctor_id={doctor_info.id}
                                            clinic_id={clinic.id}
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

const mapStateToProps = ({doctor_info, page_loader, doctor_info: {is_favorite}}) => {
    return {doctor_info, page_loader, is_favorite};
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

