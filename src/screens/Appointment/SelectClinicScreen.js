import React from 'react';
import {connect} from 'react-redux';
import compose from '../../utils/compose';
import {fetchClinics} from '../../actions';
import {bindActionCreators} from 'redux';
import {SearchList} from '../../components/uikit';
import {withClinicsStoreService} from '../../components/hoc';

class ContainerScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Поиск клиники',
        };
    });

    /**
     *
     */
    componentDidMount(): void {
        const {navigation, fetchClinics} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            fetchClinics();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    /***
     *
     * @param clinic
     * @private
     */
    selectHandler = (clinic) => {
        this.props.navigation.navigate('DoctorFilter', {clinic});
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {clinics, navigation} = this.props;
        const default_item = {
            id: null,
            name: 'Все клиники',
        };

        return (
            <SearchList
                navigation={navigation}
                items={clinics}
                placeholder={'Клиника'}
                selectHandler={this.selectHandler}
                key_name={'id'}
                value_name={'name'}
                bottomDivider={true}
                default_item={default_item}
                chevron={false}/>
        );
    }
}


const mapStateToProps = ({clinics}) => {
    return {clinics};
};

const mapDispatchToProps = (dispatch, {clinicsStoreService}) => {
    return bindActionCreators({
        fetchClinics: fetchClinics(clinicsStoreService),
    }, dispatch);
};

const SelectClinicScreen = compose(
    withClinicsStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {SelectClinicScreen};


