import {ListItem} from 'react-native-elements';
import React, {Component} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {TextSmall} from '../base';

export class SlotCarousel extends Component {

    /**
     * @returns {*}
     */
    render() {
        const {navigation, slots} = this.props;

        if(!slots.length){
            return <TextSmall>Нет свободного времени</TextSmall>;
        }

        return (
            <ScrollView style={{flex: 1}} horizontal={true}>
                {slots.map((item, idx) =>
                    <TouchableOpacity onPress={()=>{navigation.navigate('AppointmentForm')}} key={item.time_start}>
                        <ListItem
                            contentContainerStyle={{backgroundColor: '#009989', padding: 10, borderRadius: 5}}
                            titleStyle={{color: '#fff'}}
                            title={item.title}
                        />
                    </TouchableOpacity>,
                )}
            </ScrollView>
        );
    }
}
