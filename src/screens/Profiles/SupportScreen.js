import React from 'react';
import {Linking, TouchableHighlight, View} from 'react-native';
import {Divider, Text, ListItem} from 'react-native-elements';
import Str from '../../utils/Str';
import {Layout} from '@ui-kitten/components';

class SupportScreen extends React.Component {

    /**
     *
     */
    openMailer = () => {
        const supportMail = 'support@mymedapp.ru';
        const data = {
            subject: 'Ошибки в приложении',
            body: 'Мои действия:',
        };
        const querystring = Str.encodeQueryData(data);
        Linking.openURL(`mailto:${supportMail}?${querystring}`).catch((err) => {
            alert(`Ошибка открытия почтовой программы. Почта для обратной связи: ${supportMail}`);
        });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <Layout style={{flex: 1, padding: 20}}>
                <Text>Если вы нашли опечатку или ошибку в приложении, пожалуйста, сообщите нам об этом через электронную
                    почту.
                </Text>
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <Text>
                    В сообщении обязательно укажите действия приводящие к ошибке и её описание.
                </Text>
                <Divider style={{height: 20, backgroundColor: '#fff'}}/>
                <TouchableHighlight onPress={this.openMailer}>
                    <ListItem
                        style={{backgroundColor: '#fff'}}
                        title={'Написать письмо'}
                        leftIcon={{name: 'mail', color: '#2848dd'}}
                        bottomDivider
                    />
                </TouchableHighlight>
            </Layout>
        );
    }
}

export {SupportScreen};
