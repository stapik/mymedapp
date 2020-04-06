import React from 'react';
import {ApiConsumer} from '../contexts';

const withApi = () => (Wrapped) => {
    return (props) => {
        return (
            <ApiConsumer>
                {
                    (api) => {
                        return (<Wrapped {...props} api={api}/>);
                    }
                }
            </ApiConsumer>
        );
    };
};

export {withApi};
