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
import {bindActionCreators} from 'redux';

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
        const {items, selectHandler, placeholder} = this.props;
        const {search} = this.state;

        return (
            <View style={{flex: 1}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#dadada',
                }}>
                    <SearchBar
                        placeholder={placeholder}
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
                    {items.map((item) => {

                        if (item.name.indexOf(search) === -1) {
                            return;
                        }

                        return (
                            <TouchableHighlight
                                onPress={() => selectHandler(item)} key={item.id}>
                                <ListItem
                                    style={{backgroundColor: '#fff'}}
                                    title={item.name}
                                    bottomDivider
                                />
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
            </View>
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


