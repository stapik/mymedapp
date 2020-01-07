import React from 'react';
import {View, ActivityIndicator, ScrollView} from 'react-native';
import {Card, Divider, Image, Text, Button} from 'react-native-elements';
import {TextSmall} from '../../components/base';

const user = {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
};

class DoctorScreen extends React.Component {

    static navigationOptions = {
        title: 'Иванов',
    };

    _showCalendar = () => {
        this.props.navigation.navigate('CalendarModal');
    };

    render() {

        const {navigation} = this.props;
        return (
            <ScrollView style={{flex: 1}}>
                <Card title="Иванов Иван Иванович">
                    <Image
                        PlaceholderContent={<ActivityIndicator/>}
                        resizeMode="cover"
                        style={{height: 200, width: '100%'}}
                        source={{uri: user.avatar}}
                    />
                    <Divider style={{height: 10, backgroundColor: '#fff'}}/>
                    <TextSmall>Дерматолог, Венеролог, Лазерный хирург</TextSmall>
                </Card>
                <Card title="Расписание">
                    <View style={{justifyContent: 'space-between', flex: 1, flexDirection: 'row'}}>
                        <Text style={{fontSize: 19, paddingTop: 8}}>Сегодня</Text>
                        <Button type={'clear'} title={'Изменить дату'} onPress={this._showCalendar}/>
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export {DoctorScreen};
