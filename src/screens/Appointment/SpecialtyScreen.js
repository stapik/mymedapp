import React from 'react';
import {View, Text, Button, TextInput, ScrollView, ActivityIndicator} from 'react-native';

class SpecialtyScreen extends React.Component {

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
            </View>
        );
    }
}

export {SpecialtyScreen};
