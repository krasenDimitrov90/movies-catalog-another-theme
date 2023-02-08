import React from "react";

const useInput = (validateValue) => {
    const [value, setValue] = React.useState('');
    const [valueIsValid, setValueIsValid] = React.useState(false);
    const [valueInputIsTouched, setValueInputIsTouched] = React.useState(false);

    const hasError = valueInputIsTouched && !valueIsValid;

    const autoCompleteValueHandler = React.useCallback((newValue) => {
        setValue(newValue);
        setValueInputIsTouched(true);
        setValueIsValid(true);
    }, []);

    const onChangeHandler = (e) => {
        setValue(e.target.value);
        if (!validateValue(e.target.value)) {
            setValueIsValid(false);
            return;
        }
        setValueIsValid(true);
    };

    const onBlurHandler = () => setValueInputIsTouched(true);

    const resetInput = React.useCallback(() => {
        setValue('');
        setValueIsValid(false);
        setValueInputIsTouched(false);
    }, []);

    return {
        value,
        valueIsValid,
        hasError,
        onChangeHandler,
        onBlurHandler,
        resetInput,
        autoCompleteValueHandler,
    };
};

export default useInput;