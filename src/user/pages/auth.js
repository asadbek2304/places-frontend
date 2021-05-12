import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import {AuthContext} from '../../shared/context/auth-context'
import { useForm } from "../../shared/hooks/form-hook";
import "./auth.css";

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    auth.login()
  };

  const switchModeHandler = () => {
      if(!isLogin) {
          setFormData({
              ...formState.inputs,
              name: undefined
          }, formState.inputs.email.isValid && formState.inputs.password.isValid)
      } else{
          setFormData({
              ...formState.inputs,
              name: {
                  value: '',
                  isValid: false
              }
          }, false)
      }
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLogin && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Iltimos ismingizni kiriting"
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Iltimos mavjud email manzil kiriting"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Iltimos 6 belgidan ko'p parol kiriting"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLogin ? "Sign up" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
