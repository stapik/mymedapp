import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class SlotCarousel extends Component {

    state = {
        slot_width: 80,
        slot_height: 35,
        slot_margin_top: 15,
        content_width: 0,
        content_height: 0,
        wrapper_height: 0,
        wrapper_height_animated: 0,
        show_all: false,
    };

    componentDidMount() {
        this.updateWrapperHeight();
    }

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
        return Math.floor(this.state.content_width / this.state.slot_width);
    }

    /**
     *
     * @returns {number}
     */
    updateWrapperHeight() {
        const {slot_height, slot_margin_top, show_all, content_height, wrapper_height: old_wrapper_height} = this.state;
        const wrapper_height = show_all ? content_height : slot_height + slot_margin_top;
        this.setState({
                wrapper_height,
                wrapper_height_animated: new Animated.Value(old_wrapper_height),
            },
            () => {
                Animated.timing(
                    this.state.wrapper_height_animated,
                    {
                        toValue: wrapper_height,
                        duration: 500,
                        useNativeDriver: false,
                    },
                ).start(() => {
                    show_all && this.props.scroll.scrollToEnd({animated: true, duration: 500});
                });
            });
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
        const {show_all} = this.state;
        this.setState({
            show_all: !show_all,
        }, () => {
            this.updateWrapperHeight();
        });
    }

    /**
     * @returns {*}
     */
    render() {
        const {navigation, slots, style, doctor, clinic} = this.props;

        if (!slots.length) {
            return <Text appearance={'hint'} style={style} category={'p1'}>Нет свободного времени</Text>;
        }

        const slotsPerRowCount = this.getSlotsCountPerRow();
        const slotsCount = slots.length;
        const showAllButton = slotsPerRowCount < slotsCount;
        const showAllButtonIdx = showAllButton ? slotsPerRowCount - 1 : slotsCount;
        const slotsBefore = slots.slice(0, showAllButtonIdx);
        const slotsAfter = slots.slice(showAllButtonIdx);

        return (
            <Animated.View
                style={{
                    height: this.state.wrapper_height_animated,
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

                    {slotsBefore.map((slot, idx) =>
                        this.renderSlotButton(() => {
                            navigation.navigate('AppointmentForm', {doctor, clinic, slot});
                        }, slot.title, idx + 3000),
                    )}

                    {showAllButton && this.renderSlotButton(() => this.toggleView(), <Icon name={'ellipsis-h'}
                                                                                           size={21}/>, 0)}
                    {slotsAfter.map((slot, idx) =>
                        this.renderSlotButton(() => {
                            navigation.navigate('AppointmentForm', {
                                doctor,
                                clinic,
                                slot
                            });
                        }, slot.title, idx + 9000),
                    )}
                </View>

            </Animated.View>
        );
    }
}
