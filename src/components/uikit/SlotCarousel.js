import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

export class SlotCarousel extends Component {

    /**
     * @returns {*}
     */
    render() {
        const {navigation, slots, style} = this.props;

        if (!slots.length) {
            return <Text appearance={'hint'} style={style} category={'p1'}>Нет свободного времени</Text>;
        }

        return (
            <ScrollView style={style} horizontal={true}>
                {slots.map((item, idx) =>
                    <Button
                        style={{marginRight: 15}}
                        size={'small'}
                        key={idx}
                        status={'info'}
                        onPress={() => {
                            navigation.navigate('AppointmentForm');
                        }}>
                        {item.title}
                    </Button>,
                )}
            </ScrollView>
        );
    }
}
