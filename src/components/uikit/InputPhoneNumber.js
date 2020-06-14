import React from 'react';
import {Input, Text} from '@ui-kitten/components';
import {View} from 'react-native';
import {Phone} from '../../utils';

export class InputPhoneNumber extends React.Component {

    /**
     *
     * @param value
     */
    onChangeNumber(value) {
        const {handlerPhoneNumber} = this.props;
        handlerPhoneNumber(value);
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    renderCountryCallingCode = (props) => (
        <Text>{Phone.countryCallingCode(true)}</Text>
    );

    /**
     *
     * @returns {*}
     */
    render(): React.ReactNode {
        return (<View>
                <Input
                    label={'Номер телефона'}
                    textStyle={{paddingLeft: 0}}
                    accessoryLeft={this.renderCountryCallingCode}
                    {...this.props}
                    onChangeText={(value) => this.onChangeNumber(value)}
                    keyboardType={'numeric'}/>
            </View>
        );
    }
}
