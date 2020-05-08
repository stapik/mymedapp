import React from 'react';
import {View, TouchableHighlight, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Text} from '@ui-kitten/components';
import {updateProfile} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import moment from 'moment';

class ContainerScreen extends React.Component {

    /**
     * @returns {*}
     */
    render() {
        const {profile} = this.props;

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.2, flexDirection: 'row', padding: 20, alignItems: 'center', paddingTop: 40}}>
                    <Image
                        source={require('../../images/profile.png')}
                        style={{height: 100, width: 100, marginTop: 0}}/>
                    <View style={{paddingLeft: 20}}>
                        <Text>
                            {profile.last_name} {profile.first_name}
                        </Text>
                        <Text>
                            {profile.phone_number}
                        </Text>
                        <Text>
                            {moment(profile.birth_date).format('DD.MM.YYYY')}
                        </Text>
                    </View>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('EditProfile')}>
                        <ListItem
                            style={{backgroundColor: '#fff'}}
                            title={'Редактировать профиль'}
                            bottomDivider
                            chevron
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Support')}>
                        <ListItem
                            style={{backgroundColor: '#fff'}}
                            title={'Поддержка'}
                            bottomDivider
                            chevron
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('SignOut')}>
                        <ListItem
                            style={{backgroundColor: '#fff'}}
                            title={'Выход'}
                            bottomDivider
                        />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


const mapStateToProps = ({profile}) => {
    return {profile};
};

const mapDispatchToProps = {
    updateProfile,
};

const IndexScreen = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {IndexScreen};

