import React from "react";

const LoaderContext = React.createContext({
    startLoader: () => { },
    stopLoader: () => { },
});


export const LoaderProvider = (props) => {

    const [isLoading, setIsLoading] = React.useState(false);

    const startLoader = () => setIsLoading(true);

    const stopLoader = () => setIsLoading(false);

    const value =  {
        isLoading,
        startLoader,
        stopLoader,
    }

    return (
        <LoaderContext.Provider value={value} >
              {props.children}
        </LoaderContext.Provider>
    );
};

export default LoaderContext;