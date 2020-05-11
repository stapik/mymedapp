import {createAppContainer} from 'react-navigation';
import React from 'react';
import {AuthNav, TabsNav} from '../navigator';
import compose from '../utils/compose';
import {connect} from 'react-redux';

class AppContainerComponent extends React.Component {
    render() {
        const AppContainer = createAppContainer(this.props.token_info ? TabsNav : AuthNav);
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
