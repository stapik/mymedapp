import React from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Divider, Image, Text, Button} from 'react-native-elements';
import {TextSmall} from '../../components/base';
import {SlotCarousel} from '../../components/uikit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {fetchFavoriteDoctors, toggleFavoriteDoctor} from '../../actions';
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

    componentDidMount(): void {
        const {doctor_info, navigation} = this.props;
        navigation.setParams({title: doctor_info.name});
    }

    _showCalendar = () => {
        this.props.navigation.navigate('CalendarModal');
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {navigation, doctor_info, toggleFavorite, is_favorite, fetchFavoriteDoctors} = this.props;
        const specialties = (doctor_info.specialties.map((item) => item.name)).join(', ');

        return (
            <ScrollView style={{flex: 1}}>
                <Image
                    source={{uri: doctor_info.avatar ?? ''}}
                    style={{width: '100%', height: 250}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <TouchableOpacity onPress={() => toggleFavorite(() => fetchFavoriteDoctors())}>
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
                    <View style={{flex: 1}}>
                        <Card title="Первая клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation}/>
                            </View>
                        </Card>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Вторая клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation}/>
                            </View>
                        </Card>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Третья клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation}/>
                            </View>
                        </Card>
                    </View>
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
        fetchFavoriteDoctors: fetchFavoriteDoctors(doctorsStoreService),
    }, dispatch);
};

const DoctorInfoScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {DoctorInfoScreen};

