import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

import { useRegister } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useForm from "../../hooks/useForm";

const initValues = {
    username: '',
    email: '',
    password: '',
    rePass: '',
}

export default function Register() {
    const [error, setError] = useState();

    const navigate = useNavigate();
    const register = useRegister();

    const registerHandler = async ({ email, password, rePass }) => {
        if (password !== rePass) {
            return setError("Password missmatch")
        }

        try {
            const result = await register(email, password);
            navigate('/');

        } catch (err) {
            console.error(err.message);
            setError(err.message)
        }
    }

    const { values, changeHandler, submitHandler } = useForm(initValues, registerHandler)

    return (
        <section className="h-screen items-center p-8">
            <div className="p-20 flex items-center gap-x-4 text-xs">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 justify-center">

                    <Card color="transparent" shadow={false}>
                        <Typography variant="h4" color="blue-gray">
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Nice to meet you! Enter your details to register.
                        </Typography>
                        <form onSubmit={submitHandler} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Email
                                </Typography>
                                <Input
                                    name="email"
                                    value={values.email}
                                    onChange={changeHandler}
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{ className: "before:content-none after:content-none", }}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Password
                                </Typography>
                                <Input
                                    name="password"
                                    value={values.password}
                                    onChange={changeHandler}
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{ className: "before:content-none after:content-none", }}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Confirm Password
                                </Typography>
                                <Input
                                    name="rePass"
                                    value={values.rePass}
                                    onChange={changeHandler}
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>

                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                {error
                                    && (<h1>
                                        <span style={{ color: 'red' }}>{error}</span>
                                    </h1>)
                                }
                            </Typography>

                            <Button type="submit" className="mt-6" fullWidth>
                                sign up
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-gray-900">
                                    Sign In
                                </Link>
                            </Typography>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    );
}
