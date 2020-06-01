import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchDoctorInfo, fetchFavoriteDoctors} from '../../actions';
import compose from '../../utils/compose';
import {withDoctorStoreService} from '../../components/hoc';
import {connect} from 'react-redux';
import {DoctorList} from '../../components/uikit';

class ContainerScreen extends React.Component {
    /**
     *
     */
    componentDidMount(): void {

        const {navigation, fetchFavoriteDoctors} = this.props;

        let favoritesListLoaded = false;
        this.favoritesFocusListener = navigation.addListener('didFocus', () => {
            if (!favoritesListLoaded) {
                fetchFavoriteDoctors();
                favoritesListLoaded = true;
            }
            setTimeout(() => favoritesListLoaded = false, 10000);
        });
    }

    /**
     *
     */
    componentWillUnmount() {
        // Remove the event listener
        this.favoritesFocusListener.remove();
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
