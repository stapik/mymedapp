import {createAppContainer} from 'react-navigation';
import React from 'react';
import {GuestNav, TabsNav} from '../navigator';
import compose from '../utils/compose';
import {connect} from 'react-redux';
import 'moment/locale/ru';
import * as moment from 'moment';

moment.locale('ru');

class AppContainerComponent extends React.Component {
    render() {
        const AppContainer = createAppContainer(this.props.token_info ? TabsNav : GuestNav);
        return <AppContainer/>;
    }
}

const mapStateToProps = ({token_info}) => {
    return {token_info};
};

const mapDispatchToProps = {};

const AppContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(AppContainerComponent);

export default AppContainer;
