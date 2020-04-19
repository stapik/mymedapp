import React from 'react';
import {Button, Divider, List, Text} from '@ui-kitten/components';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Left} from 'native-base';

class DoctorList extends React.Component {

    /**
     * @param doctor
     * @returns {*}
     */
    renderItem = ({item: doctor}) => (
        <Card>
            <TouchableOpacity onPress={() => this.props.selectHandler(doctor)} activeOpacity={0.9}>
                <CardItem cardBody>
                    <Image source={{uri: doctor.avatar}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
            </TouchableOpacity>

            <CardItem>
                <Text category='s1'>
                    {doctor.name}
                </Text>
            </CardItem>
            <Divider/>
            <CardItem>
                <Left>
                    <Button status={'basic'} size={'small'} onPress={() => this.props.selectHandler(doctor)}>
                        Расписание
                    </Button>
                </Left>
            </CardItem>
        </Card>
    );

    /**
     *
     * @returns {*}
     */
    render() {
        const {doctors} = this.props;
        return (<List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={doctors}
            renderItem={this.renderItem}/>);
    }
}

export {DoctorList};


const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        margin: 4,
    },
});
