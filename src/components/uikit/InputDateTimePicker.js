import React from 'react';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export class InputDateTimePicker extends React.Component {

    state = {
        date: '',
        show_date_picker: false,
    };

    /**
     *
     * @private
     */
    _onChange(date) {
        const {onChange, value_format} = this.props;
        this.setState({show_date_picker: false, date: date});
        const result_date = moment(this.state.date).format(value_format);
        console.log(result_date, 'result_date');
        onChange(result_date);
    }

    /**
     *
     * @private
     */
    _onClose() {
        this.setState({show_date_picker: false});
    }

    /**
     *
     * @returns {*}
     */
    render(): React.ReactNode {
        const {label, error, value, input_format, value_format} = this.props;
        const {date, show_date_picker} = this.state;
        let date_value = new Date();

        let date_text = '';
        if (value) {
            date_text = moment(value, value_format).format(input_format);
            date_value =  moment(value, value_format).toDate();
        }
        if (date) {
            date_text = moment(date).format(input_format);
            date_value =  moment(date).toDate();
        }

        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.setState({show_date_picker: true})}>
                    <Text appearance={'hint'} category={'label'} style={{paddingBottom: 5, paddingTop: 1}}>
                        {label}
                    </Text>
                    <Layout level={'2'}
                            style={{
                                borderRadius: 5,
                                borderColor: error ? '#ff0000' : '#e5e5e5',
                                borderWidth: 1,
                                paddingLeft: 5,
                            }}>
                        <Text style={{padding: 10}}>{date_text} </Text>
                    </Layout>
                </TouchableOpacity>

                <Modal
                    visible={show_date_picker}
                    backdropStyle={styles.backdrop}
                    style={{width: '100%'}}
                    onBackdropPress={() => this.setState({show_date_picker: false})}>
                    <Layout style={{width: '100%'}}>

                        <RNDateTimePicker
                            mode={'date'}
                            display={'spinner'}
                            locale={'ru-RU'}
                            onChange={(event, date) => this._onChange(date)}
                            value={date_value}/>

                        <Layout style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 5,
                            display: Platform.OS !== 'ios' ? 'none' : 'flex',
                        }}>
                            <Button
                                style={{paddingTop: 10, width: '49%'}}
                                status={'basic'}
                                appearance={'outline'}
                                onPress={() => this._onClose()}>
                                Отмена
                            </Button>
                            <Layout style={{width: '2%'}}/>
                            <Button
                                style={{paddingTop: 10, width: '49%'}}
                                status={'success'}
                                onPress={() => this._onClose()}>
                                Выбрать
                            </Button>
                        </Layout>
                    </Layout>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
