import React from 'react';
import {Text, Divider, Input, Button} from '@ui-kitten/components';
import Helper from '../../components/Helper';
import Api from '../../Api';
import {Container, Content} from 'native-base';
import moment from 'moment';

class CheckSmsScreen extends React.Component {

    state = {
        code: '',
        sms_interval: 0,
        default_sms_interval: 120,
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('phone_number', 'Нет номера телефона'),
        };
    };

    /**
     *
     */
    componentDidMount(): void {
        this.props.navigation.setParams({verifyPhoneNumber: this.verifyPhoneNumber});
        this.getSms();
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
            clearInterval(this.smsInterval);
            this.props.navigation.navigate('TabsNav');
        }).catch(() => {
            Api._showError('Неверный код подтверждения');
        });
    };

    /**
     *
     */
    getSms = () => {
        const {seconds} = this.state;
        if (seconds) {
            return;
        }
        const phone_number = this.props.navigation.getParam('phone_number', '0');
        const api = Api.make();
        api.getSms(Helper.clearNumber(phone_number))
            .then(() => {
                this.setState(({default_sms_interval}) => ({sms_interval: default_sms_interval}));
                this.smsInterval = setInterval(() => {
                    const {sms_interval} = this.state;
                    if (sms_interval > 0) {
                        this.setState({
                            sms_interval: sms_interval - 1,
                        });
                    }
                    if (sms_interval === 0) {
                        clearInterval(this.smsInterval);
                    }
                }, 1000);
            }).catch((error) => Api.errorHandler(error))
        ;
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
        const {sms_interval} = this.state;
        const moment_text = moment.unix(sms_interval).format('mm:ss');
        const sms_interval_text = sms_interval ? `[${moment_text}]` : ``;
        return (
            <Container style={{padding: 15}}>
                <Text category={'h4'}>СМС отправлено</Text>
                <Divider style={{height: 15, backgroundColor: 'transparent'}}/>
                <Text>В течении двух минут на ваш номер придёт код подтверждения</Text>
                <Divider style={{height: 30, backgroundColor: 'transparent'}}/>
                <Input
                    autoFocus={true}
                    keyboardType={'numeric'}
                    maxLength={5}
                    placeholder=''
                    label={'Код из смс'}
                    onChangeText={(code) => this._typeCodeHandler(code)}
                />
                <Button disabled={Boolean(sms_interval)}
                        onPress={this.getSms}
                        style={{width: '100%', borderRadius: 5}} size={'small'} status={'primary'}
                        appearance='ghost'>
                    Отправить смс повторно {sms_interval_text}
                </Button>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    style={{width: '100%', borderRadius: 5, marginTop: 5}} size={'small'} status={'primary'}
                    appearance='ghost'>
                    Изменить номер
                </Button>
            </Container>
        );
    }
}

export {CheckSmsScreen};
