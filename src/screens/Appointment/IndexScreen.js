import React from 'react';
import {connect} from 'react-redux';
import compose from '../../utils/compose';
import {fetchDoctorInfo, searchDoctors} from '../../actions';
import {withDoctorStoreService} from '../../components/hoc';
import {bindActionCreators} from 'redux';
import {DoctorList} from '../../components/uikit';
import {View, Platform, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from '@ui-kitten/components';
import moment from 'moment';

class ContainerScreen extends React.Component {

    state = {
        search: '',
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Поиск врача',
            headerRight: (
                <TouchableOpacity
                    style={{marginRight: 10}}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('DoctorsFilter')}>
                    <Icon name={'ios-options'} color={'blue'} size={26}/>
                </TouchableOpacity>
            ),
        };
    };

    /**
     *
     * @param search
     */
    updateSearch = search => {
        this.setState({search});
    };

    /**
     *
     */
    componentDidMount(): void {
        const {navigation, searchDoctors} = this.props;
        let listLoaded = false;
        this.focusListener = navigation.addListener('didFocus', () => {
            if (!listLoaded) {
                searchDoctors();
                listLoaded = true;
            }
            setTimeout(() => listLoaded = false, 12000);
        });
    }

    /**
     *
     */
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }


    /**
     * @param doctor
     * @private
     */
    selectHandler = (doctor) => {
        const {fetchDoctorInfo, navigation} = this.props;
        fetchDoctorInfo(doctor.id, () => navigation.navigate('DoctorInfo', {doctor}));
    };

    /**
     * @returns {*}
     */
    renderHeader = () => {
        const {doctors_filter: {date}} = this.props;

        let date_str = date ? moment(date).format('DD.MM.YYYY') : 'все дни';
        date_str = date_str === moment().format('DD.MM.YYYY') ? 'сегодня' : date_str;
        date_str = date_str === moment().add(1, 'day').format('DD.MM.YYYY') ? 'завтра' : date_str;

        return <Text
            style={{paddingTop: 10, paddingBottom: 10, textAlign: 'center'}}
            category={'s1'}
            appearance={'hint'}>Расписание врачей на {date_str}</Text>;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {doctors} = this.props;
        const {search} = this.state;

        const filtered_doctors = doctors.filter(item => item.name.indexOf(search) > -1);

        return (<View style={{flex: 1}}>
            <View style={{
                borderWidth: 1,
                borderColor: '#dadada',
            }}>
                <SearchBar
                    placeholder={'ФИО врача'}
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme={true}
                    showCancel={true}
                    cancelButtonTitle={'Отменить'}
                    platform={Platform.OS}
                    style={{
                        fontSize: 22,
                        padding: 10,
                        paddingLeft: 20,
                    }}
                />
            </View>
            <DoctorList
                renderHeader={this.renderHeader} doctors={filtered_doctors} selectHandler={this.selectHandler}/>
        </View>);
    }
}

const mapStateToProps = ({doctors, doctors_filter}) => {
    return {doctors, doctors_filter};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService}) => {
    return bindActionCreators({
        searchDoctors: searchDoctors(doctorsStoreService),
        fetchDoctorInfo: fetchDoctorInfo(doctorsStoreService),
    }, dispatch);
};

const IndexScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {IndexScreen};


