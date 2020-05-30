import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {floor} from 'react-native-reanimated';

export class SlotCarousel extends Component {

    state = {
        slot_width: 80,
        slot_height: 35,
        slot_margin_top: 15,
        content_width: 0,
        content_height: 0,
        show_all: false,
    };


    /**
     *
     * @param event
     */
    onLayoutContent = (event) => {
        const {width, height} = event.nativeEvent.layout;
        this.setState({
            content_width: width,
            content_height: height,
        });
    };

    /**
     *
     * @returns {AnimatedNode<number>}
     */
    getSlotsCountPerRow() {
        return Math.floor(this.state.wrapper_width / this.state.slot_width);
    }

    /**
     *
     * @returns {number}
     */
    getWrapperHeight() {
        const {slot_height, slot_margin_top, show_all, content_height} = this.state;
        return show_all ? content_height : slot_height + slot_margin_top;
    }

    /**
     *
     * @param onPress
     * @param title
     * @param idx
     * @returns {*}
     */
    renderSlotButton(onPress, title, idx) {
        const {slot_margin_top, slot_width, slot_height} = this.state;
        return (<Button
            key={idx}
            style={{marginTop: slot_margin_top, width: slot_width, height: slot_height}}
            size={'tiny'}
            status={'info'}
            onPress={onPress}>
            <Text category={'s1'} style={{color: '#fff'}}>{title}</Text>
        </Button>);
    }

    /**
     *
     */
    toggleView() {
        const newValue = !this.state.show_all;
        this.setState({show_all: newValue});
    }

    /**
     * @returns {*}
     */
    render() {
        const {navigation, slots, style, doctor_id, clinic_id} = this.props;
        const wrapperHeight = this.getWrapperHeight();

        if (!slots.length) {
            return <Text appearance={'hint'} style={style} category={'p1'}>Нет свободного времени</Text>;
        }

        const countPerRow = this.getSlotsCountPerRow() - 1;
        const slotsBefore = slots.slice(0, countPerRow);
        const slotsAfter = slots.slice(countPerRow);

        return (
            <View
                style={{
                    height: wrapperHeight,
                    overflow: 'hidden',
                }}>

                <View
                    onLayout={(event) => this.onLayoutContent(event)}
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                    {slotsBefore.map((item, idx) =>
                        this.renderSlotButton(() => {
                            navigation.navigate('AppointmentForm', {doctor_id, clinic_id, time_start: item.time_start});
                        }, item.title, idx + 3000),
                    )}

                    {this.renderSlotButton(() => this.toggleView(), <Icon name={'ellipsis-h'} size={21}/>, 0)}

                    {slotsAfter.map((item, idx) =>
                        this.renderSlotButton(() => {
                            navigation.navigate('AppointmentForm', {doctor_id, clinic_id, time_start: item.time_start});
                        }, item.title, idx + 9000),
                    )}
                </View>

            </View>
        );
    }
}
