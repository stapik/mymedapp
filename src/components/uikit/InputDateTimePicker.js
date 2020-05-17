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
        const {onChange, output_format = 'YYYY-MM-DD'} = this.props;
        this.setState({show_date_picker: false, date: date});
        onChange(moment(this.state.date).format(output_format));
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
        const {label, error, input_format = 'DD.MM.YYYY'} = this.props;
        const {date, show_date_picker} = this.state;
        let date_value = date ? date : new Date();
        const date_text = date ? moment(date_value).format(input_format) : '';

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
