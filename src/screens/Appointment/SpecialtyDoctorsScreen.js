import React from 'react';
import {View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, Card, Divider, Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchDoctorInfo} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withDoctorStoreService} from '../../components/hoc';

class ContainerScreen extends React.Component {

    /**
     *
     * @param navigation
     * @returns {{headerRight: *, title: *}}
     */
    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam('title');
        return {
            title: title,
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('FilterModal')}>
                    <Ionicons name='ios-options' style={{color: 'blue', paddingRight: 10}} size={25}/>
                </TouchableOpacity>
            ),
        };
    };

    /**
     *
     * @param doctor
     * @private
     */
    _selectDoctorHandler = (doctor) => {
        console.log(doctor);
        const {fetchDoctorInfo, navigation} = this.props;
        fetchDoctorInfo(doctor.id, () => navigation.navigate('DoctorInfo', {title: doctor.name}));
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {doctors} = this.props;
        return (
            <ScrollView style={{flex: 1}}>
                {doctors.map((doctor, idx) =>
                    <Card title={doctor.name} key={idx}>
                        <View key={idx}>
                            <Image
                                PlaceholderContent={<ActivityIndicator/>}
                                resizeMode="cover"
                                style={{height: 200, width: '100%'}}
                                source={{uri: doctor.avatar}}
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

const mapStateToProps = ({doctors, page_loader}) => {
    return {doctors, page_loader};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService}) => {
    return bindActionCreators({
        fetchDoctorInfo: fetchDoctorInfo(doctorsStoreService),
    }, dispatch);
};

const SpecialtyDoctorsScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {SpecialtyDoctorsScreen};
