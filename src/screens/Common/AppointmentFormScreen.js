import React from 'react';
import ProfileForm from '../../components/uikit/ProfileForm';
import {bindActionCreators} from 'redux';
import {createVisit} from '../../actions';
import compose from '../../utils/compose';
import {withVisitsStoreService} from '../../components/hoc';
import {connect} from 'react-redux';
import {Divider, Layout, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import moment from 'moment';

class ContainerScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Запись на приём',
        };
    });

    /**
     *
     * @param form_state
     */
    submitHandler = (form_state) => {
        const {navigation, createVisit} = this.props;
        const {visit_data, doctor, clinic} = navigation.state.params;
        const data = Object.assign(visit_data, form_state);
        createVisit(data, (r) => {
            navigation.navigate('VisitCreated');
        });
    };

    headerComponent = () => {
        const {navigation} = this.props;
        const {doctor, clinic, slot} = navigation.state.params;

        const date = moment(slot.time_start).format('DD.MM.YYYY');

        return (<Layout level={'2'} style={{
                borderRadius: 5,
                padding: 10,
                shadowOpacity: 0.07,
                shadowRadius: 3,
                marginBottom: 15,
                borderColor: '#3ac251',
                borderWidth: 1,
            }}>
                <View>
                    <Text>{clinic.name}</Text>
                    <Text appearance={'hint'}>{clinic.address}</Text>
                    <Text>{doctor.name}</Text>
                </View>

                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingTop: 3,
                    alignItems: 'center',
                }}>
                    <Icon style={{color: '#6f6f6f'}} name={'calendar-alt'} size={12}/>
                    <Text style={{paddingLeft: 5, paddingRight: 15}} category={'c2'} appearance={'hint'}>
                        {date}
                    </Text>
                    <Icon style={{color: '#6f6f6f'}} name={'clock'} size={12}/>
                    <Text style={{paddingLeft: 5, paddingRight: 5}} category={'c2'} appearance={'hint'}>
                        {slot.title}
                    </Text>
                    <Divider style={{marginTop: 10}}/>
                </View>
            </Layout>
        );
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <ProfileForm headerComponent={this.headerComponent} submitHandler={this.submitHandler}
                         submitText={'Записаться'}/>
        );
    }
}


const mapStateToProps = ({profile}) => {
    return {profile};
};

const mapDispatchToProps = (dispatch, {visitsStoreService}) => {
    return bindActionCreators({
        createVisit: createVisit(visitsStoreService),
    }, dispatch);
};

const AppointmentFormScreen = compose(
    withVisitsStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {AppointmentFormScreen};
