import React, {useEffect} from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Divider, Image, Text, Button} from 'react-native-elements';
import {TextSmall} from '../../components/base';
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
                    <Text h4>{doctor_info.name}</Text>
                    <Divider style={{height: 5, backgroundColor: '#fff'}}/>
                    <TextSmall>
                        {specialties}
                    </TextSmall>
                </View>

                <View style={{paddingTop: 5}}>
                    <View style={{borderColor: '#ddd', borderTopWidth: 2, borderBottomWidth: 2, padding: 10}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>Расписание</Text>
                    </View>
                    <View style={{
                        justifyContent: 'space-between',
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        paddingBottom: 0,
                    }}>
                        <Text style={{fontSize: 19, paddingTop: 8}}>Сегодня</Text>
                        <Button type={'clear'} title={'Изменить дату'} onPress={this._showCalendar}/>
                    </View>

                    {doctor_info.clinics.map((clinic) => {

                        let clinic_slots = doctor_info.slots.filter(slot => slot.clinic_id === clinic.id);

                        return (
                            <View style={{flex: 1}} key={clinic.id}>
                                <Card title={clinic.name}>
                                    <View style={{flex: 1}}>
                                        <SlotCarousel
                                            slots={clinic_slots}
                                            doctor_id={doctor_info.id}
                                            clinic_id={clinic.id}
                                            navigation={navigation}/>
                                    </View>
                                </Card>
                            </View>
                        );
                    })}


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

