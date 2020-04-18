import React from 'react';
import {CheckBox, Text, Layout, Radio, RadioGroup, Button, Divider} from '@ui-kitten/components';
import {ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';;

const CheckboxSimpleUsageShowcase = () => {

    const [checked, setChecked] = React.useState(false);

    return (
        <CheckBox
            checked={checked}
            onChange={nextChecked => setChecked(nextChecked)}>
            {'Детский врач'}
        </CheckBox>
    );
};

const RadioStatesShowcase = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <Layout style={styles.container} level='1'>

            <RadioGroup
                selectedIndex={selectedIndex}
                onChange={index => setSelectedIndex(index)}>
                <Radio>Не важен</Radio>
                <Radio>Мужской</Radio>
                <Radio>Женский</Radio>
            </RadioGroup>

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    radio: {
        margin: 2,
    },
});

class DoctorFilterScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Фильтр',
        };
    };

    goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView>
                <TouchableHighlight onPress={() => {navigation.navigate('SelectClinic')}}>
                    <Layout style={{padding: 15}}>
                        <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Клиника</Text>
                        <Text category={'с1'} appearance={'hint'}>Все клиники</Text>
                    </Layout>
                </TouchableHighlight>

                <Divider/>

                <TouchableHighlight onPress={() => {navigation.navigate('SelectSpecialty')}}>
                    <Layout style={{padding: 15}}>
                        <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Специальность</Text>
                        <Text category={'с1'}>Терапевт</Text>
                    </Layout>
                </TouchableHighlight>

                <Divider/>

                <TouchableHighlight onPress={() => {navigation.navigate('SelectDate')}}>
                    <Layout style={{padding: 15}}>
                        <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Дата приёма</Text>
                        <Text category={'с1'}>Все дни</Text>
                    </Layout>
                </TouchableHighlight>

                <Divider/>

                <Layout style={{padding: 15}}>
                    <Text appearance={'hint'} category={'s1'} style={{paddingBottom: 5}}>Пол врача</Text>
                    <RadioStatesShowcase/>
                </Layout>

                <Divider/>

                <Layout style={{padding: 15}}>
                    {/*<Text appearance='hint' category={'s1'} style={{paddingBottom: 15}}>Дополнительно</Text>*/}
                    {/*<CheckboxSimpleUsageShowcase/>*/}

                    <Button onPress={this.goBack}>
                        Показать врачей
                    </Button>
                </Layout>
            </ScrollView>
        );
    }
}

export {DoctorFilterScreen};
