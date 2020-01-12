import React from 'react';
import {View, ScrollView, TouchableOpacity, ActivityIndicator, TouchableHighlight} from 'react-native';
import {Button, Card, Image, ListItem, SearchBar, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Platform} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
];

class SpecialtyDoctorsScreen extends React.Component {

    static navigationOptions = (({navigation}) => {
        return {
            title: navigation.getParam('title'),
            // headerRight: (
            //     <TouchableOpacity onPress={() => navigation.navigate('FilterModal')}>
            //         <Ionicons name='ios-options' style={{color: '#fff', paddingRight: 10}} size={25}/>
            //     </TouchableOpacity>
            //
            // ),
        };
    });

    _selectDoctor = () => {
        const {navigation} = this.props;
        navigation.navigate('Doctor');
    };

    render() {
        const {navigation} = this.props;

        return (
            <ScrollView style={{flex: 1}}>
                {users.map((u, ii) =>
                    <Card title="Иванов Иван Иванович" key={ii}>
                        <View key={ii}>
                            <Image
                                PlaceholderContent={<ActivityIndicator/>}
                                resizeMode="cover"
                                style={{height: 200, width: '100%'}}
                                source={{uri: u.avatar}}
                            />
                            <Button onPress={this._selectDoctor} style={{marginTop: 15}} title={'Записаться на приём'}/>
                        </View>
                    </Card>,
                )}
            </ScrollView>
        );
    }
}

export {SpecialtyDoctorsScreen};
