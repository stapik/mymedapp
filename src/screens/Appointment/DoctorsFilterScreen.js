import React from 'react';
import {Text, Layout, Radio, RadioGroup, Button, Divider} from '@ui-kitten/components';
import {ScrollView, TouchableHighlight} from 'react-native';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {searchDoctors, updateDoctorsFilter} from '../../actions';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {withDoctorStoreService} from '../../components/hoc';

class DoctorsFilterContainer extends React.Component {

    state = {
        date: null,
        specialty: null,
        clinic: null,
        gender: null,

        date_text: 'Все дни',
        specialty_text: 'Все специальности',
        clinic_text: 'Все клиники',
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Фильтр',
        };
    };

    componentDidMount(): void {
        this.setState(this.props.doctors_filter);
    }

    handleSearch = () => {
        const {navigation, updateDoctorsFilter, searchDoctors} = this.props;
        updateDoctorsFilter(this.state);
        searchDoctors(()=>{
            navigation.goBack();
        });
    };

    handleSelectClinic = (clinic) => {
        if (clinic) {
            this.setState({
                clinic: clinic.id,
                clinic_text: clinic.name,
            });
        } else {
            this.setState({
                clinic: null,
                clinic_text: 'Все клиники',
            });
        }
        this.props.navigation.navigate('DoctorsFilter');
    };

    handleSelectSpecialty = (specialty) => {
        if (specialty) {
            this.setState({
                specialty: specialty.id,
                specialty_text: specialty.name,
            });
        } else {
            this.setState({
                specialty: null,
                specialty_text: 'Все специальности',
            });
        }
        this.props.navigation.navigate('DoctorsFilter');
    };

    handleSelectDate = (date) => {
        if (date) {
            let date_text;
            const selected_date_text = moment(date).format('DD.MM.YYYY');
            const current_date_text = moment().format('DD.MM.YYYY');
            date_text = selected_date_text === current_date_text ? 'Сегодня' : selected_date_text;
            const next_date_text = moment().add(1, 'day').format('DD.MM.YYYY');
            date_text = selected_date_text === next_date_text ? 'Завтра' : date_text;
            this.setState({date, date_text});
        } else {
            this.setState({
                date: null,
                date_text: 'Все дни',
            });
        }
        this.props.navigation.navigate('DoctorsFilter');
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView>
                <TouchableHighlight onPress={() => {
                    navigation.navigate('SelectClinic', {
                        handleSelectClinic: this.handleSelectClinic,
                        selected: this.state.clinic,
                    });
                }}>
                    <Layout style={{padding: 15}}>
                        <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Клиника</Text>
                        <Text category={'s1'}>{this.state.clinic_text}</Text>
                    </Layout>
                </TouchableHighlight>

                <Divider/>

                <TouchableHighlight onPress={() => {
                    navigation.navigate('SelectSpecialty', {
                        handleSelectSpecialty: this.handleSelectSpecialty,
                        selected: this.state.specialty,
                    });
                }}>
                    <Layout style={{padding: 15}}>
                        <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Специальность</Text>
                        <Text category={'s1'}>{this.state.specialty_text}</Text>
                    </Layout>
                </TouchableHighlight>

                <Divider/>

                <TouchableHighlight onPress={() => {
                    navigation.navigate('SelectDate', {
                        handleSelectDate: this.handleSelectDate,
                        selected: this.state.date,
                    });
                }}>
                    <Layout style={{padding: 15}}>
                        <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Дата приёма</Text>
                        <Text category={'s1'}>{this.state.date_text}</Text>
                    </Layout>
                </TouchableHighlight>

                <Divider/>

                <Layout style={{padding: 15}}>
                    <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Пол врача</Text>
                    <RadioGroup
                        selectedIndex={this.state.gender ?? 0}
                        onChange={index => this.setState({gender: index})}>
                        <Radio>Не важен</Radio>
                        <Radio>Мужской</Radio>
                        <Radio>Женский</Radio>
                    </RadioGroup>
                </Layout>

                <Divider/>

                <Layout style={{padding: 15}}>
                    <Button onPress={this.handleSearch}>
                        Показать врачей
                    </Button>
                </Layout>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({doctors_filter}) => {
    return {doctors_filter};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService}) => {
    return bindActionCreators({
        searchDoctors: searchDoctors(doctorsStoreService),
        updateDoctorsFilter: updateDoctorsFilter,
    }, dispatch);
};

const DoctorsFilterScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(DoctorsFilterContainer);

export {DoctorsFilterScreen};
