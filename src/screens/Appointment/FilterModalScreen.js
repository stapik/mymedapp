import React from 'react';
import {Button, Text, View} from 'react-native';

class FilterModalScreen extends React.Component {

    apply_filter() {
        this.props.navigation.goBack();
    }

    reset_filter() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>Параметры поиска</Text>
                <Button
                    onPress={() => this.apply_filter()}
                    title="Применить"
                />
                <Button
                    onPress={() => this.reset_filter()}
                    title="Очистить"
                />
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Отмена"
                />
            </View>
        );
    }
}

export {FilterModalScreen};
