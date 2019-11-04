const conditionally = config => props => {
    return config.if(props) ? config.then(props) : config.else(props);
};

function _pipe(f, g) {
    return (...args) => {
        return g(f(...args));
    }
}

function pipe(...fns) {
    return fns.reduce(_pipe);
}

const and = (x) => (...y) => y.reduce((acc, val) => acc && val, x);
const or = (x) => (...y) => y.reduce((acc, val) => acc || val, x);


export {
    conditionally,
    pipe,
    and,
    or
};