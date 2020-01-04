import React from 'react';
import {View, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Card, Image, ListItem, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
];

class SpecialtyDoctorsScreen extends React.Component {

    static navigationOptions = (({navigation}) => {
        return {
            title: navigation.getParam('title'),
        };
    });

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#dadada',
                    margin: 20,
                }}>
                    <TextInput
                        autoFocus={true}
                        maxLength={25}
                        placeholder='ФИО врача'
                        onChangeText={(value) => this._typeSpecialtyHandler(value)}
                        style={{
                            fontSize: 22,
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    />
                </View>
                <ScrollView style={{borderTopWidth: 1, borderColor: '#dadada', paddingTop: 15, flex: 1}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>Доктора</Text>
                        <Text>{JSON.stringify(navigation.getParam('id'))}</Text>
                    </View>
                </ScrollView>

                {/*<Card title="CARD WITH DIVIDER">*/}
                    {/*{*/}
                        {/*users.map((u, ii) => {*/}
                            {/*return (*/}
                                {/*<View key={ii}>*/}
                                    {/*<Image*/}
                                        {/*resizeMode="cover"*/}
                                        {/*style={{height: 100}}*/}
                                        {/*source={{ uri: u.avatar }}*/}
                                    {/*/>*/}
                                    {/*<Text>{u.name}</Text>*/}
                                {/*</View>*/}
                            {/*);*/}
                        {/*})*/}
                    {/*}*/}
                {/*</Card>*/}

                <Card containerStyle={{padding: 0}} >
                    {
                        users.map((u, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    roundAvatar
                                    title={u.name}
                                    leftAvatar={{uri:u.avatar}}
                                    bottomDivider
                                    chevron
                                />
                            );
                        })
                    }
                </Card>
            </View>
        );
    }
}

export {SpecialtyDoctorsScreen};
