import hoistNonReactStatics from 'hoist-non-react-statics';

const compose = (...funcs) => (comp) => {
    const result = funcs.reduceRight((wrapped, f) => f(wrapped), comp);
    hoistNonReactStatics(result, comp);
    return result;
};

export default compose;
