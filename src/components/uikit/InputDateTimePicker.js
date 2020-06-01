import React from 'react';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export class InputDateTimePicker extends React.Component {

    state = {
        date: '',
        show_date_picker: false,
    };

    /**
     *
     * @returns {string}
     */
    getResultDate() {
        const {value_format, value} = this.props;
        const return_date = this.state.date ? this.state.date : value;
        return moment(return_date).format(value_format);
    }

    /**
     *
     * @private
     */
    _onChange(date) {
        const {onChange} = this.props;

        switch (Platform.OS) {
            case 'android':
                if (date) {
                    this.setState({show_date_picker: false, date: date});
                    onChange(this.getResultDate());
                } else{
                    this.setState({show_date_picker: false});
                }
                break;
            case 'ios':
                this.setState({date: date});
                break;
        }
    }

    /**
     *
     * @private
     */
    close() {
        this.setState({show_date_picker: false, date: ''});
    }

    /**
     *
     * @private
     */
    _onSubmit() {
        const {onChange} = this.props;
        onChange(this.getResultDate());
        this.close();
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
            date_value = moment(value, value_format).toDate();
        }
        if (date) {
            date_text = moment(date).format(input_format);
            date_value = moment(date).toDate();
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
                    onBackdropPress={() => this.close()}>
                    <Layout style={{width: '100%'}}>

                        <RNDateTimePicker
                            style={{width: '100%'}}
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
                                style={{paddingTop: 10, width: '100%'}}
                                status={'primary'}
                                appearance={'outline'}
                                onPress={() => this._onSubmit()}>
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
