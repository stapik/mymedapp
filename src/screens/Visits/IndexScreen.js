import React from 'react';
import {Container, Content, Tabs, Tab} from 'native-base';
import {bindActionCreators} from 'redux';
import {fetchVisits} from '../../actions';
import compose from '../../utils/compose';
import {withVisitsStoreService} from '../../components/hoc';
import {connect} from 'react-redux';
import {VisitList} from '../../components/uikit';
import moment from 'moment';

class ContainerScreen extends React.Component {

    /**
     *
     */
    componentDidMount(): void {
        const {navigation, fetchVisits} = this.props;

        let visitsListLoaded = false;
        this.visitsFocusListener = navigation.addListener('didFocus', () => {
            if (!visitsListLoaded) {
                fetchVisits();
                visitsListLoaded = true;
            }
            setTimeout(() => visitsListLoaded = false, 20000);
        });
    }

    /**
     *
     */
    componentWillUnmount() {
        // Remove the event listener
        this.visitsFocusListener.remove();
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const {visits, navigation} = this.props;
        const currentVisits = visits.filter((item) => moment(item.time_start).isAfter());
        const pastVisits = visits.filter((item) => moment(item.time_start).isBefore());
        return (
            <Container>
                <Tabs>
                    <Tab heading="Текущие">
                        <VisitList navigation={navigation}
                                   visits={currentVisits}
                                   old={false}/>
                    </Tab>
                    <Tab heading="Прошедшие">
                        <VisitList navigation={navigation}
                                   visits={pastVisits}
                                   old={true}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const mapStateToProps = ({visits}) => {
    return {visits};
};

const mapDispatchToProps = (dispatch, {visitsStoreService}) => {
    return bindActionCreators({
        fetchVisits: fetchVisits(visitsStoreService),
    }, dispatch);
};

const IndexScreen = compose(
    withVisitsStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ContainerScreen);

export {IndexScreen};
