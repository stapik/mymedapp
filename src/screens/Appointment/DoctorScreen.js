import React from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Divider, Image, Text, Button, Tile} from 'react-native-elements';
import {TextSmall} from '../../components/base';
import {SlotCarousel} from '../../components/uikit';
import Icon from 'react-native-vector-icons/FontAwesome';

const user = {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
};

class DoctorScreen extends React.Component {

    state = {
        favorites: true,
    };

    static navigationOptions = {
        title: 'Иванов',
    };

    _showCalendar = () => {
        this.props.navigation.navigate('CalendarModal');
    };

    _favoriteToggle = () => {
        this.setState({favorites: !this.state.favorites})
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
                <TouchableOpacity onPress={this._favoriteToggle}>
                    <View style={{
                        backgroundColor: '#ddd',
                        width: 40,
                        height: 40,
                        top: -55,
                        right: 15,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        alignSelf: 'flex-end',
                    }}>
                        <Icon name={'star'} style={{
                            fontSize: 20,
                            color: this.state.favorites ? '#F04155' : '#fff',
                            marginTop: 1,
                            marginLeft: 2,
                        }}/>
                    </View>
                </TouchableOpacity>

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
                                <SlotCarousel navigation={navigation}/>
                            </View>
                        </Card>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Вторая клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation}/>
                            </View>
                        </Card>
                    </View>
                    <View style={{flex: 1}}>
                        <Card title="Третья клиника">
                            <View style={{flex: 1}}>
                                <SlotCarousel navigation={navigation}/>
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
