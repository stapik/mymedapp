import React from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Divider, Image, Text, Button} from 'react-native-elements';
import {TextSmall} from '../../components/base';
import {SlotCarousel} from '../../components/uikit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {toggleFavoriteDoctor} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {withDoctorStoreService} from '../../components/hoc';

class ContainerScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam('title');

        return {
            title: title,
        };
    };

    _showCalendar = () => {
        this.props.navigation.navigate('Calendar');
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {navigation, doctor_info, toggleFavorite, is_favorite} = this.props;
        const specialties = (doctor_info.specialties.map((item) => item.name)).join(', ');

        return (
            <ScrollView style={{flex: 1}}>
                <Image
                    source={{uri: doctor_info.avatar ?? ''}}
                    style={{width: '100%', height: 250}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <TouchableOpacity onPress={toggleFavorite}>
                    <View style={{
                        backgroundColor: '#ddd',
                        width: 40,
                        height: 40,
                        top: -55,
                        right: 15,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        alignSelf: 'flex-end',
                    }}>
                        <Icon name={'star'} style={{
                            fontSize: 20,
                            color: is_favorite ? '#F04155' : '#fff',
                            marginTop: 1,
                            marginLeft: 2,
                        }}/>
                    </View>
                </TouchableOpacity>

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

                        return (<View style={{flex: 1}}>
                            <Card title={clinic.name}>
                                <View style={{flex: 1}}>
                                    <SlotCarousel
                                        slots={clinic_slots}
                                        doctor_id={doctor_info.id}
                                        clinic_id={clinic.id}
                                        navigation={navigation}/>
                                </View>
                            </Card>
                        </View>);
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

