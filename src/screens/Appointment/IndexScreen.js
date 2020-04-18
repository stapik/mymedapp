import React from 'react';
import {connect} from 'react-redux';
import compose from '../../utils/compose';
import {fetchSpecialties, fetchSpecialtyDoctors} from '../../actions';
import {withDoctorStoreService, withSpecialtiesStoreService} from '../../components/hoc';
import {bindActionCreators} from 'redux';
import {SearchList} from '../../components/uikit';

class ContainerScreen extends React.Component {

    static navigationOptions = (({}) => {
        return {
            title: 'Поиск специальности',
        };
    });

    /**
     *
     */
    componentDidMount(): void {
        const {navigation, fetchSpecialties} = this.props;
        let listLoaded = false;
        this.focusListener = navigation.addListener('didFocus', () => {
            if (!listLoaded) {
                fetchSpecialties();
                listLoaded = true;
            }
            setTimeout(() => listLoaded = false, 30000);
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    /***
     *
     * @param specialty
     * @private
     */
    selectHandler = (specialty) => {
        const {fetchSpecialtyDoctors, navigation} = this.props;
        fetchSpecialtyDoctors(specialty.id, () =>
            navigation.navigate('SpecialtyDoctors', {specialty_name: specialty.name}));
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {specialties, navigation} = this.props;

        return (
            <SearchList
                navigation={navigation}
                items={specialties}
                placeholder={'Специальности'}
                selectHandler={this.selectHandler}
                key_name={'id'}
                value_name={'name'}
                bottomDivider={true}
                chevron={true}/>
        );
    }
}

const mapStateToProps = ({specialties}) => {
    return {specialties};
};

const mapDispatchToProps = (dispatch, {specialtiesStoreService, doctorsStoreService}) => {
    return bindActionCreators({
        fetchSpecialties: fetchSpecialties(specialtiesStoreService),
        fetchSpecialtyDoctors: fetchSpecialtyDoctors(doctorsStoreService),
    }, dispatch);
};

const IndexScreen = compose(
    withSpecialtiesStoreService(),
    withDoctorStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {IndexScreen};


