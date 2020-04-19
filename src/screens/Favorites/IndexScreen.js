import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Button, Card, Divider, Image} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {fetchDoctorInfo, fetchFavoriteDoctors} from '../../actions';
import compose from '../../utils/compose';
import {withDoctorStoreService} from '../../components/hoc';
import {connect} from 'react-redux';
import {DoctorList} from '../../components/uikit';

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
    selectHandler = (doctor) => {
        const {fetchDoctorInfo, navigation} = this.props;
        fetchDoctorInfo(doctor.id, () => navigation.navigate('DoctorInfo', {doctor}));
    };

    /**
     * @returns {*}
     */
    render() {
        const {favorite_doctors} = this.props;
        return <DoctorList doctors={favorite_doctors} selectHandler={this.selectHandler}/>;
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
