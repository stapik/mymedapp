import React from 'react';
import {View} from 'react-native';
import {Button, Text, Divider, Input} from 'react-native-elements';
import Helper from '../../components/Helper';
import Api from '../../Api';

class CheckSmsScreen extends React.Component {

    state = {
        code: '',
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('phone_number', 'Нет номера телефона'),
            headerRight: (
                <Button type={'clear'} title="Далее" onPress={navigation.getParam('verifyPhoneNumber')}/>
            ),
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    componentDidMount(): void {
        this.props.navigation.setParams({verifyPhoneNumber: this.verifyPhoneNumber});
    }

    /**
     *
     */
    verifyPhoneNumber = () => {
        if (this.state.code.toString().length !== 5) {
            return;
        }

        let api = Api.make();
        api.verifyPhoneNumber(this.state.code).then(() => {
            this.props.navigation.navigate('TabsNav');
        }).catch(() => {
            Api._showError('Неверный код подтверждения');
        });
    };

    /**
     *
     * @param code
     * @private
     */
    _typeCodeHandler(code) {
        code = Helper.clearNumber(code);
        this.setState({code}, () => {
            this.verifyPhoneNumber();
        });
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{
                flex: 1,
                padding: 20,
                paddingTop: '15%',
            }}>
                <Text h3>СМС отправлено</Text>
                <Divider style={{height: 15, backgroundColor: 'transparent'}}/>
                <Text>В течении двух минут на ваш телефон придет код подтверждения</Text>
                <Divider style={{height: 30, backgroundColor: 'transparent'}}/>
                <Input
                    style={{width: 20}}
                    autoFocus={true}
                    keyboardType={'numeric'}
                    maxLength={5}
                    placeholder=''
                    label={'Код из смс'}
                    onChangeText={(code) => this._typeCodeHandler(code)}
                />
            </View>
        );
    }
}

export {CheckSmsScreen};
