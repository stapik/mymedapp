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
     * @returns {*}
     */
    render(): React.ReactNode {
        return (<View>
                <Text style={{position: 'absolute', top: 29.5, left: 17, zIndex: 5}}>{Phone.countryCallingCode(true)}</Text>
                <Input
                    label={'Номер телефона'}
                    textStyle={{paddingLeft: 22}}
                    autoFocus={true}
                    {...this.props}
                    onChangeText={(value) => this.onChangeNumber(value)}
                    keyboardType={'numeric'}/>
            </View>
        );
    }
}
