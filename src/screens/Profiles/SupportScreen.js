import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import {Divider, Text, ListItem} from 'react-native-elements';

class SupportScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <Text>Если вы нашли опечатку или ошибку в приложении, пожалуйста, сообщите нам об этом через электронную
                    почту.
                </Text>
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <Text>
                    В сообщении обязательно укажите действия приводящие к ошибке и её описание.
                </Text>
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <TouchableHighlight onPress={() => alert('В разработке')}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Написать письмо'}
                        leftIcon={{name: 'mail', color: '#2848dd'}}
                        bottomDivider
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

export {SupportScreen};
