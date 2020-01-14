import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {Button, Card, Divider, Image} from 'react-native-elements';

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
];

class IndexScreen extends React.Component {

    _selectDoctor = () => {
        const {navigation} = this.props;
        navigation.navigate('Doctor');
    };

    render() {
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
                            <Button onPress={this._selectDoctor} style={{marginTop: 15}} title={'Расписание'}/>
                        </View>
                    </Card>,
                )}
                <Divider style={{height: 15, backgroundColor: '#fff'}}/>
            </ScrollView>
        );
    }
}

export {IndexScreen};
