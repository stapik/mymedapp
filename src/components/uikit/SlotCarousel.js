import Carousel from 'react-native-snap-carousel';
import {Button, ListItem, Text, Overlay} from 'react-native-elements';
import React, {Component} from 'react';
import {View, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import _ from 'lodash';

export class SlotCarousel extends Component {

    state = {
        slots: [
            {
                id: 1,
                title: '15:00',
            },
            {
                id: 2,
                title: '16:00',
            },
            {
                id: 3,
                title: '17:00',
            },
            {
                id: 4,
                title: '18:00',
            },
            {
                id: 5,
                title: '19:00',
            },
            {
                id: 6,
                title: '20:00',
            },
            {
                id: 7,
                title: '21:00',
            },
        ],
        isFormVisible: false,
    };

    render() {

        const {navigation} = this.props;

        return (
            <ScrollView style={{flex: 1}} horizontal={true}>
                {this.state.slots.map((item) =>
                    <TouchableOpacity onPress={()=>{navigation.navigate('AppointmentForm')}} key={item.id}>
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
