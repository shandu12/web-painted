'use client';
import { useForm } from "react-hook-form"
import { server } from "@/utils/server";
import { postData } from "@/utils/services";
import Button from "@/components/button";
import React, { useEffect } from "react";
import { RootState, checkIsLogged } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogged } from "@/store/reducers/user";

type LoginMail = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginMail>()

  const dispatch = useDispatch();

  const onSubmit = async (data: LoginMail) => {
    const value = (await postData(`${server}/login`, {
      email: data.email,
      password: data.password,
    })).json();

    const { error, name } = await value
    if (error) {
      setLoginError(true);
    } else {
      dispatch(setUserLogged({ name: name, favouriteProducts: [] }));
      window.location.href = "/profile/login/successful";
    }
  };

  const warning = "The login is fake as there is no database with users,  the form is nonetheless checked and a POST sent and the only accepted email is johndoe@mail.com, the password is required, but not used to login."
  const shortWarning = "how to login..."
  const [expandedWarning, setExpandedWarning] = React.useState<Boolean>(true);
  const [loginError, setLoginError] = React.useState<Boolean>(false);
  const isLogged = checkIsLogged(useSelector((state: RootState) => state.user));

  useEffect(() => {
    if (isLogged) {
      window.location.href = "/profile";
    }
  }, []);

  return (
    <section className="container flex justify-center">
      <p className="fixed bottom-5 cursor-pointer right-5 rounded-xl w-60 bg-primary text-contrast-text p-4" onClick={() => setExpandedWarning(!expandedWarning)}>
        {expandedWarning ? warning :
          shortWarning
        }
      </p>
      <div className="bg-primary rounded-lg p-5 w-72 mt-3 flex flex-col items-center">
        <h1 className="main-title">Login</h1>
        <form className="flex flex-col w-fit bg-primary rounded-lg " onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <input
              className="form-input"
              placeholder="email"
              type="text"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />

            {errors.email && errors.email.type === "required" && (
              <p className="text-tertiary">
                This field is required
              </p>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <p className="text-tertiary">
                Please write a valid email
              </p>
            )}
          </div>

          <div className="mb-2">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="text-tertiary">
                This field is required
              </p>
            )}
          </div>
          <Button background="bg-tertiary" rounded="rounded-xl" type="submit"
          >
            Sign in
          </Button>

          {loginError && (<p className="w-min font-bold text-tertiary my-1">
            Invalid credentials, use email johndoe@mail.com
          </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
