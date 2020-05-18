import React from 'react';
import ProfileForm from '../../components/uikit/ProfileForm';

class EditProfileScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Редактирование профиля',
        };
    });

    render() {
        return (
            <ProfileForm submitHandler={() => this.props.navigation.goBack()} submitText={'Сохранить'}/>
        );
    }
}

export {EditProfileScreen};
