import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {Header} from 'react-navigation-stack';
import {bindActionCreators} from 'redux';
import compose from '../../utils/compose';
import {connect} from 'react-redux';
import {withApi} from '../hoc';
import Icon from 'react-native-vector-icons/FontAwesome5';

class InternetStatusBarContainer extends Component {
    render() {
        const {internet_status} = this.props;
        return (<View style={{...styles.view, display: internet_status ? 'none' : 'flex', verticalAlign: 'middle'}}>
                <View stle={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingTop: 3,
                    paddingBottom: 5,
                    alignItems: 'center',
                }}>
                    <Icon size={18} name={'exclamation-triangle'} style={{...styles.text, marginBottom: 8}}/>
                    <Text style={styles.text} category={'s1'}>
                        Вы не подключены к интернету
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        zIndex: 1000,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(101,101,101, 0.95)',
        top: Header.HEIGHT,
    },
    text: {
        textAlign: 'center',
        color: '#fff',
    },
});

const mapStateToProps = ({internet_status}) => {
    return {internet_status};
};

const mapDispatchToProps = (dispatch, {}) => {
    return bindActionCreators({}, dispatch);
};

const InternetStatusBar = compose(
    withApi(),
    connect(mapStateToProps, mapDispatchToProps),
)(InternetStatusBarContainer);

export {InternetStatusBar};
