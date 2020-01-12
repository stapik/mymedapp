import React from 'react';
import {View} from 'react-native';
import {Button, Text, Divider, Input,} from 'react-native-elements';
import Helper from '../../components/Helper';

class CheckSmsScreen extends React.Component {

    state = {
        code: '',
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('phone_number', 'Нет номера телефона'),
            headerRight: (
                <Button type={'clear'} title="Далее" onPress={navigation.getParam('checkCode')}/>
            ),
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    componentDidMount(): void {
        this.props.navigation.setParams({confirmPhoneNumber: this.checkCode});
    }

    checkCode = () => {
        /**
         * TODO: check code
         */
        //api.post();
        if (this.state.code.toString().length !== 5) {
            return;
        }

        this.props.navigation.navigate('TabsNav');
    };

    /**
     *
     * @param code
     * @private
     */
    _typeCodeHandler(code) {
        code = Helper.clearNumber(code);
        this.setState({code}, () => {
            this.checkCode();
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
