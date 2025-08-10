import { useEffect, useState } from "react";

export default function useForm(initValues, submitCallback) {
    const [values, setValues] = useState(initValues);


    //Reinitialize
    useEffect(() => {
        setValues(initValues);
    }, [initValues]);

    const submitHandler = (e) => {
        e.preventDefault();

        submitCallback(values)

        setValues(initValues);
    }

    const changeHandler = (e) => {

        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return {
        values,
        changeHandler,
        submitHandler
    }
}