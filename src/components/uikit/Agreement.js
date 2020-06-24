import React from 'react';
import {Linking} from 'react-native';
import {Text} from '@ui-kitten/components';

const Agreement = () => {
    return (
        <Text style={{paddingTop: 5}}
              onPress={() => Linking.openURL('https://mymedapp.ru/docs/agreement.pdf')}
              category={'c1'}
              appearance={'hint'}>Нажимая кнопку, вы даете согласие на обработку своих
            <Text category={'c1'} status={'info'}> персональных данных</Text>
        </Text>
    );
};

export {Agreement};
