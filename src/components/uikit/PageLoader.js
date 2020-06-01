import React, {Component} from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    View,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import compose from '../../utils/compose';

class LoaderComponent extends Component {
    render() {
        const {internet_status, page_loader} = this.props;
        const modalVisible = internet_status ? page_loader : false;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.controlContainer}>
                            <ActivityIndicator size={28} color={'red'}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    controlContainer: {
        borderRadius: 100,
        padding: 10,
        backgroundColor: '#fff',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3,
    },
});

const mapStateToProps = ({page_loader, internet_status}) => {
    return {page_loader, internet_status};
};

const mapDispatchToProps = (dispatch, {}) => {
    return bindActionCreators({}, dispatch);
};

const PageLoader = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(LoaderComponent);

export {PageLoader};

