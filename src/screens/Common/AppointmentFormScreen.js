import React from 'react';
import ProfileForm from '../../components/uikit/ProfileForm';
import {bindActionCreators} from 'redux';
import {createVisit} from '../../actions';
import compose from '../../utils/compose';
import {withVisitsStoreService} from '../../components/hoc';
import {connect} from 'react-redux';

class ContainerScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Запись на приём',
        };
    });

    submitHandler = (form_state) => {
        const {navigation, createVisit} = this.props;
        const data = Object.assign(navigation.state.params, form_state);
        createVisit(data, (r) => {
            navigation.navigate('VisitCreated');
        });
    };

    render() {
        return (
            <ProfileForm submitHandler={this.submitHandler} submitText={'Записаться'}/>
        );
    }
}


const mapStateToProps = ({profile}) => {
    return {profile};
};

const mapDispatchToProps = (dispatch, {visitsStoreService}) => {
    return bindActionCreators({
        createVisit: createVisit(visitsStoreService),
    }, dispatch);
};

const AppointmentFormScreen = compose(
    withVisitsStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {AppointmentFormScreen};
