import React from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Api from '../../components/Api';
import Helper from '../../components/Helper';

class CheckSmsScreen extends React.Component {

    state = {
        code: '',
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('phone_number', 'Нет номера телефона'),
            headerRight: (
                <Button title="Далее" onPress={navigation.getParam('checkCode')}/>
            ),
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
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: '40%'}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>В течении двух минут на ваш телефон</Text>
                <Text style={{fontSize: 18, textAlign: 'center'}}>придет код подтверждения</Text>
                <View style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    borderColor: '#dadada',
                    marginBottom: 20,
                    marginTop: 20,
                }}>
                    <TextInput
                        autoFocus={true}
                        keyboardType={'numeric'}
                        maxLength={5}
                        placeholder='Код из смс'
                        onChangeText={(code) => this._typeCodeHandler(code)}
                        style={{
                            flex: 0.3,
                            fontSize: 22,
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    />
                </View>
            </View>
        );
    }
}

export {CheckSmsScreen};
