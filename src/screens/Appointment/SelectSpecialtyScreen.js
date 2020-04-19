import React from 'react';
import {connect} from 'react-redux';
import compose from '../../utils/compose';
import {fetchClinics, fetchSpecialties} from '../../actions';
import {bindActionCreators} from 'redux';
import {SearchList} from '../../components/uikit';
import {withSpecialtiesStoreService} from '../../components/hoc';

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
        this.focusListener = navigation.addListener('didFocus', () => {
            fetchSpecialties();
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
        this.props.navigation.navigate('DoctorFilter', {specialty});
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {specialties, navigation} = this.props;
        const default_item = {
            id: null,
            name: 'Все специальности',
        };

        return (
            <SearchList
                navigation={navigation}
                items={specialties}
                placeholder={'Специальность'}
                selectHandler={this.selectHandler}
                key_name={'id'}
                value_name={'name'}
                bottomDivider={true}
                default_item={default_item}
                chevron={false}/>
        );
    }
}


const mapStateToProps = ({specialties}) => {
    return {specialties};
};

const mapDispatchToProps = (dispatch, {specialtiesStoreService}) => {
    return bindActionCreators({
        fetchSpecialties: fetchSpecialties(specialtiesStoreService),
    }, dispatch);
};

const SelectSpecialtyScreen = compose(
    withSpecialtiesStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {SelectSpecialtyScreen};


