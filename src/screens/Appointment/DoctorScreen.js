import React from 'react';
import {View, ActivityIndicator, ScrollView} from 'react-native';
import {Card, Divider, Image, Text, Button, Tile} from 'react-native-elements';
import {TextSmall} from '../../components/base';
import {SlotCarousel} from '../../components/uikit';

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


                <Image
                    source={{uri: user.avatar}}
                    style={{width: '100%', height: 250}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <View style={{padding: 15}}>
                    <Text h4>Иванов Иван Иванович</Text>
                    <Divider style={{height: 5, backgroundColor: '#fff'}}/>
                    <TextSmall>Дерматолог, Венеролог, Лазерный хирург</TextSmall>
                </View>
                <View style={{paddingTop: 5}}>
                    <View style={{borderColor: '#ddd', borderTopWidth: 2, borderBottomWidth: 2, padding: 10}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>Расписание</Text>
                    </View>
                    <View style={{
                        justifyContent: 'space-between',
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        paddingBottom: 0,
                    }}>
                        <Text style={{fontSize: 19, paddingTop: 8}}>Сегодня</Text>
                        <Button type={'clear'} title={'Изменить дату'} onPress={this._showCalendar}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Первая клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation} />
                            </View>
                        </Card>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Вторая клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation} />
                            </View>
                        </Card>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Третья клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation} />
                            </View>
                        </Card>
                    </View>
                    <Divider style={{height: 15, backgroundColor: '#fff'}}/>
                </View>
            </ScrollView>
        );
    }
}

export {DoctorScreen};
