import React from 'react';
import {connect} from 'react-redux';
import compose from '../../utils/compose';
import {fetchDoctorInfo, searchDoctors} from '../../actions';
import {withDoctorStoreService} from '../../components/hoc';
import {bindActionCreators} from 'redux';
import {DoctorList} from '../../components/uikit';
import {View, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from '@ui-kitten/components';
import moment from 'moment';
import {Constants} from '../../utils';

class ContainerScreen extends React.Component {

    state = {
        search: '',
        list_opacity: 0,
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Поиск врача',
            headerRight: (
                <TouchableOpacity
                    style={{marginRight: 10, paddingLeft: 25}}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('DoctorsFilter')}>
                    <Text status='primary'>
                        <Icon name={'ios-options'} size={26}/>
                    </Text>
                </TouchableOpacity>
            ),
        };
    };

    /**
     *
     */
    componentDidMount(): void {
        const {searchDoctors} = this.props;
        searchDoctors();
    }

    /**
     *
     * @param search
     */
    updateSearch = search => {
        this.setState({search});
    };

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
            style={{paddingTop: 15, paddingBottom: 15, textAlign: 'center'}}
            category={'s1'}
            appearance={'hint'}>Расписание врачей на {date_str}</Text>;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {doctors, doctors_filter} = this.props;
        const {search} = this.state;

        const filtered_doctors = doctors.length ? doctors.filter(item => item.name.indexOf(search) > -1) : [];

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
                    platform={Constants.os}
                    style={{
                        fontSize: 22,
                        padding: 10,
                        paddingLeft: 20,
                    }}
                />
            </View>
            <DoctorList
                selectedDate={doctors_filter.date}
                renderHeader={this.renderHeader}
                doctors={filtered_doctors}
                selectHandler={this.selectHandler}/>
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


