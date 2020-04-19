import React from 'react';
import {ListItem, SearchBar} from 'react-native-elements';
import {
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import {searchInStr} from '../../utils';
import {Platform} from '../../constants';
import {Layout, Text} from '@ui-kitten/components';

class SearchList extends React.Component {

    state = {
        search: '',
    };

    /**
     *
     * @param search
     */
    updateSearch = search => {
        this.setState({search});
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {
            items, placeholder, selectHandler,
            key_name, value_name, bottomDivider,
            chevron, selected, default_item,
        } = this.props;
        const {search} = this.state;
        const filtered_items = items.filter((item) => !(search && !searchInStr(search, item[value_name])));

        if (default_item) {
            filtered_items.unshift(default_item);
        }

        let content = <Layout style={{padding: 25}}>
            <Text appearance={'hint'} category={'s1'}>По вашему запросу ничего не найдено</Text>
        </Layout>;

        if (filtered_items.length) {
            content = <ScrollView style={{flex: 1}}>
                {filtered_items.map((item) => {
                    return (
                        <TouchableHighlight
                            onPress={() => selectHandler(item)} key={item[key_name]}>
                            <ListItem
                                style={{backgroundColor: '#fff'}}
                                title={item[value_name]}
                                bottomDivider={bottomDivider}
                                chevron={chevron}
                                checkmark={item[key_name] === selected}
                            />
                        </TouchableHighlight>
                    );
                })}
            </ScrollView>;
        }

        return (
            <View style={{flex: 1}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#dadada',
                }}>
                    <SearchBar
                        placeholder={placeholder}
                        onChangeText={this.updateSearch}
                        value={search}
                        lightTheme={true}
                        showCancel={true}
                        cancelButtonTitle={'Отменить'}
                        platform={Platform}
                        style={{
                            fontSize: 22,
                            padding: 10,
                            paddingLeft: 20,
                        }}
                    />
                </View>
                {content}
            </View>
        );
    }
}

export {SearchList};


