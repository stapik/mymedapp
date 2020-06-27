import React from 'react';
import {Button, Divider, Text} from '@ui-kitten/components';
import {Content, Container, Footer} from 'native-base';
import {apple_app_id, package_name} from '../../../settings.json';
import moment from 'moment';
import {AndroidMarket} from 'react-native-rate';
import {updateAppRateDate} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';

class VisitCreated extends React.Component {

    /**
     *
     */
    handlePressButton() {
        const {navigation} = this.props;
        navigation.popToTop();

        Promise.all([
            navigation.navigate('Visits')
        ]).catch(() => {
            navigation.navigate('Index');
        });

        setTimeout(() => {
            this.rateApp();
        }, 3000);
    }

    /**
     *
     */
    rateApp() {
        const {app_rate_date, updateAppRateDate} = this.props;
        const rateDateFormat = 'YYYY-MM-DD';
        const currentDate = moment();
        const lastRateDate = app_rate_date ? moment(app_rate_date, rateDateFormat) : currentDate;

        if (lastRateDate.diff(currentDate, 'days') > 90) {
            const options = {
                AppleAppID: apple_app_id,
                GooglePackageName: package_name,
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: true,
                openAppStoreIfInAppFails: true,
            };
            Rate.rate(options, success => {
                if (success) {
                    updateAppRateDate(currentDate.format(rateDateFormat));
                }
            });
        }
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <Container style={{padding: 15}}>
                <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15}}>
                    <Text category={'h3'} style={{textAlign: 'center'}}>Запись принята</Text>
                    <Divider style={{margin: 10}}/>
                    <Text category={'p1'}>
                        Запись отправлена в клинику. Администратор клиники свяжется с Вами для подтверждения.
                    </Text>
                </Content>
                <Footer>
                    <Button style={{width: '100%'}} size={'large'} onPress={() => this.handlePressButton()}>
                        Готово
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({app_rate_date}) => {
    return {app_rate_date};
};

const mapDispatchToProps = {
    updateAppRateDate,
};

const VisitCreatedModalScreen = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(VisitCreated);

export {VisitCreatedModalScreen};
