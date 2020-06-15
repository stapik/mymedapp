import React from 'react';
import {Input, Text} from '@ui-kitten/components';
import {View} from 'react-native';
import {Phone} from '../../utils';
import Str from '../../utils/Str';

export class InputPhoneNumber extends React.Component {

    /**
     *
     * @param value
     */
    onChangeNumber(value) {
        const {handlerPhoneNumber} = this.props;
        let numbers = Str.onlyDigits(value);
        if(numbers.toString().length > 10){
            numbers = numbers.substr(0, 10);
        }
        handlerPhoneNumber(numbers);
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
