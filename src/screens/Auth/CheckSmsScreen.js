import React from 'react';
import {Text, Divider, Input, Button} from '@ui-kitten/components';
import {Container} from 'native-base';
import moment from 'moment';
import {updateProfilePhoneNumber} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {withApi} from '../../components/hoc';
import {Phone, Str} from '../../utils';

class CheckSmsScreenContainer extends React.Component {

    state = {
        code: '',
        sms_interval: 0,
        default_sms_interval: 120,
    };

    static navigationOptions = ({navigation}) => {
        const phoneNumber = navigation.getParam('phone_number', 'Нет номера телефона');
        const title = Phone.format(phoneNumber, true, true);
        return {
            title,
            headerTitleStyle: {width: Dimensions.get('window').width * 0.7},
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
        const {navigation, api, updateProfilePhoneNumber} = this.props;
        const {code} = this.state;

        if (code.toString().length !== 5) {
            return;
        }
        const phone_number = this.props.navigation.getParam('phone_number', 0);

        api.verifyPhoneNumber(phone_number, code).then(() => {
            clearInterval(this.smsInterval);
            navigation.navigate('TabsNav');
            updateProfilePhoneNumber(phone_number);
        });
    };

    /**
     *
     */
    getSms = () => {
        const {seconds} = this.state;
        const {navigation, api} = this.props;
        if (seconds) {
            return;
        }
        const phone_number = navigation.getParam('phone_number', '0');
        api.sendVerificationCode(phone_number)
            .then(() => {
                this._runSmsTimer();
            }).catch(() => {
            this._runSmsTimer();
        });
    };

    /**
     *
     */
    _runSmsTimer = () => {
        const {internet_status} = this.props;
        if (!internet_status) {
            return;
        }
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
    };

    /**
     *
     * @param code
     * @private
     */
    _typeCodeHandler(code) {
        code = Str.onlyDigits(code);
        this.setState({code}, () => {
            this.verifyPhoneNumber();
        });
    }

    /**
     *
     * @returns {*}
     */
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

const mapStateToProps = ({internet_status}) => {
    return {internet_status};
};

const mapDispatchToProps = {
    updateProfilePhoneNumber,
};

const CheckSmsScreen = compose(
    withApi(),
    connect(mapStateToProps, mapDispatchToProps),
)(CheckSmsScreenContainer);

export {CheckSmsScreen};
