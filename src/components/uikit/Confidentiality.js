import React from 'react';
import {Linking} from 'react-native';
import {Text} from '@ui-kitten/components';

const Confidentiality = () => {
    return (
        <Text style={{paddingTop: 5}} category={'c1'} appearance={'hint'}>Заполняя форму, вы даете согласие на обработку своих
            <Text category={'c1'} onPress={() => Linking.openURL('https://mymedapp.ru/info/confidentiality')}
                  status={'info'}> персональных данных</Text>
        </Text>
    );
};

export {Confidentiality};
