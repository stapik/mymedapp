import React from 'react';
import {Button, Divider, Text} from '@ui-kitten/components';
import {Content, Container, Footer} from 'native-base';

class VisitCreatedModalScreen extends React.Component {
    render() {
        return (
            <Container style={{padding: 15}}>
                <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15}}>
                    <Text category={'h3'} style={{textAlign: 'center'}}>Запись принята</Text>
                    <Divider style={{margin: 10}}/>
                    <Text category={'p1'}>
                        Запись отправлена в клинику. Администратор клиники свяжется с Вами для подтверждения.
                    </Text>
                </Content>
                <Footer>
                    <Button style={{width: '100%'}} size={'large'} onPress={() => this.props.navigation.popToTop()}>
                        Готово
                    </Button>
                </Footer>
            </Container>
        );
    }
}

export {VisitCreatedModalScreen};
