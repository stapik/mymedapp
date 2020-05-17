import React from 'react';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import moment from 'moment';

export class DateTimePicker extends React.Component {

    state = {
        date: '',
        show_date_picker: false,
    };

    /**
     *
     */
    constructor() {
        super();
        this.setState({date: this.props.date});
    }

    _onChange() {
        const {onChange} = this.props;
    }

    _onClose() {
        const {onClose} = this.props;
    }

    /**
     *
     * @returns {*}
     */
    render(): React.ReactNode {
        const {label, error, input_format = 'DD.MM.YYYY'} = this.props;
        const {date, show_date_picker} = this.state;
        const date_text = moment(date).format(input_format);

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
                            onChange={(e, birth_date) => this._onChange(birth_date)}
                            value={date}/>

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
