import React from 'react';
import ProfileForm from '../../components/uikit/ProfileForm';

class EditProfileScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Редактирование профиля',
        };
    });

    submitHandler = (form_state) => {
        const {navigation} = this.props;
        /**
         * TODO: save profile
         */
        navigation.goBack();
    };

    render() {
        return (
            <ProfileForm submitHandler={this.submitHandler} submitText={'Сохранить'}/>
        );
    }
}

export {EditProfileScreen};
