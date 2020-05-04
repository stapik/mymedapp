import React from 'react';
import ProfileForm from '../../components/uikit/ProfileForm';

class AppointmentFormScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Запись на приём',
        };
    });

    submitHandler = (form_state) => {
        const {navigation} = this.props;
        /**
         * TODO: create appointment
         */
        navigation.popToTop();
        navigation.navigate('VisitCreated');
    };

    render() {
        return (
            <ProfileForm submitHandler={this.submitHandler} submitText={'Записаться'}/>
        );
    }
}

export {AppointmentFormScreen};
