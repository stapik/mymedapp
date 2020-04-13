import React from 'react';
import {Platform} from '../../constants';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import compose from '../../utils/compose';
import {fetchSpecialties, fetchSpecialtyDoctors} from '../../actions';
import {withDoctorStoreService, withSpecialtiesStoreService} from '../../components/hoc';
import Loader from '../../components/Loader';
import {bindActionCreators} from 'redux';
import {searchInStr} from '../../utils';

class ContainerScreen extends React.Component {

    state = {
        count: 0,
        backgroundColor: '#fff',
        active: false,
        loading: true,
    };

    static navigationOptions = (({navigation}) => {
        return {};
    });

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     *
     */
    componentDidMount(): void {
        this.props.fetchSpecialties();
    }

    /***
     *
     * @param specialty
     * @private
     */
    _selectSpecialtyHandler(specialty) {
        const {fetchSpecialtyDoctors, navigation} = this.props;
        fetchSpecialtyDoctors(specialty.id, () =>
            navigation.navigate('SpecialtyDoctors', {specialty_name: specialty.name}));
    }

    /**
     *
     * @param search
     */
    updateSearch = search => {
        this.setState({search});
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {specialties, page_loader} = this.props;
        const {search} = this.state;

        return (
            <View style={{flex: 1}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#dadada',
                }}>
                    <SearchBar
                        placeholder='Специальность'
                        onChangeText={this.updateSearch}
                        value={search}
                        lightTheme={true}
                        showCancel={true}
                        cancelButtonTitle={'Отменить'}
                        platform={Platform}
                        style={{
                            fontSize: 22,
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    />
                </View>
                <ScrollView style={{flex: 1}}>
                    {specialties.map((specialty) => {

                        if (search && !searchInStr(search, specialty.name)) {
                            return;
                        }

                        return (
                            <TouchableHighlight
                                onPress={() => this._selectSpecialtyHandler(specialty)} key={specialty.id}>
                                <ListItem
                                    style={{backgroundColor: '#fff'}}
                                    title={specialty.name}
                                    bottomDivider
                                    chevron
                                />
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
                <Loader loading={page_loader}/>
            </View>
        );
    }
}


const mapStateToProps = ({specialties, page_loader}) => {
    return {specialties, page_loader};
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


