import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Button, Card, Divider, Image} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {fetchDoctorInfo, fetchFavoriteDoctors} from '../../actions';
import compose from '../../utils/compose';
import {withDoctorStoreService} from '../../components/hoc';
import {connect} from 'react-redux';

class ContainerScreen extends React.Component {

    componentDidMount(): void {
        const {navigation, fetchFavoriteDoctors} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            fetchFavoriteDoctors();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    /**
     *
     * @param doctor
     * @private
     */
    _selectDoctorHandler = (doctor) => {
        const {fetchDoctorInfo, navigation} = this.props;
        fetchDoctorInfo(doctor.id, () => navigation.navigate('DoctorInfo', {title: doctor.name}));
    };

    /**
     * @returns {*}
     */
    render() {
        const {favorite_doctors} = this.props;
        return (
            <ScrollView style={{flex: 1}}>
                {favorite_doctors.map((doctor, idx) =>
                    <Card title={doctor.name} key={idx}>
                        <View key={idx}>
                            <Image
                                PlaceholderContent={<ActivityIndicator/>}
                                resizeMode="cover"
                                style={{height: 200, width: '100%'}}
                                source={{uri: doctor.avatar ?? ''}}
                            />
                            <Button onPress={() => this._selectDoctorHandler(doctor)} style={{marginTop: 15}}
                                    title={'Расписание'}/>
                        </View>
                    </Card>,
                )}
                <Divider style={{height: 15, backgroundColor: '#fff'}}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({favorite_doctors}) => {
    return {favorite_doctors};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService}) => {
    return bindActionCreators({
        fetchFavoriteDoctors: fetchFavoriteDoctors(doctorsStoreService),
        fetchDoctorInfo: fetchDoctorInfo(doctorsStoreService),
    }, dispatch);
};

const IndexScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {IndexScreen};
