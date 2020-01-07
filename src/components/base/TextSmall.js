import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const styles = StyleSheet.create({
    defaultStyle: {fontSize: 13, color: '#696969'},
});

class TextSmall extends Component {
    render() {
        return (
            <Text style={[styles.defaultStyle, this.props.style]}>{this.props.children}</Text>
        );
    }
}

export {TextSmall};
