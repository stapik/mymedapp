import React, {Component} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {bindActionCreators} from 'redux';
import compose from '../../utils/compose';
import {connect} from 'react-redux';

class InternetStatusBarContainer extends Component {
    /**
     *
     * @returns {*}
     */
    render() {
        const {internet_status} = this.props;
        return (<Modal
                animationType="fade"
                transparent={true}
                visible={internet_status !== true}>
                <View style={styles.centeredView}>
                    <View style={styles.controlContainer}>
                        <Text style={styles.text} category={'s1'}>
                            Нет доступа к интернету
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    controlContainer: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3,
    },
    centeredView: {
        backgroundColor: 'rgba(1,1,1,0.40)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = ({internet_status}) => {
    return {internet_status};
};

const mapDispatchToProps = (dispatch, {}) => {
    return bindActionCreators({}, dispatch);
};

const InternetStatusBar = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(InternetStatusBarContainer);

export {InternetStatusBar};
