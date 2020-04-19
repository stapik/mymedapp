import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {fetchDoctorInfo} from '../../actions';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withDoctorStoreService} from '../../components/hoc';
import {DoctorList} from '../../components/uikit';

class ContainerScreen extends React.Component {

    /**
     *
     * @param navigation
     * @returns {{headerRight: *, title: *}}
     */
    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam('specialty_name');
        return {
            title: title,
            headerRight: (
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('DoctorFilter')}>
                    <Icon name='sliders-h' style={{paddingRight: 15}} size={20}/>
                </TouchableOpacity>
            ),
        };
    };

    /**
     *
     * @param doctor
     * @private
     */
    selectHandler = (doctor) => {
        const {fetchDoctorInfo, navigation} = this.props;
        fetchDoctorInfo(doctor.id, () => navigation.navigate('DoctorInfo', {doctor}));
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {doctors} = this.props;
        return <DoctorList doctors={doctors} selectHandler={this.selectHandler}/>;
    }
}

const mapStateToProps = ({doctors}) => {
    return {doctors};
};

const mapDispatchToProps = (dispatch, {doctorsStoreService}) => {
    return bindActionCreators({
        fetchDoctorInfo: fetchDoctorInfo(doctorsStoreService),
    }, dispatch);
};

const SpecialtyDoctorsScreen = compose(
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {SpecialtyDoctorsScreen};

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        margin: 4,
    },
});
