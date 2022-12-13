import React, { useState, useEffect, useRef } from "react";
import Card from "../../common/Card";

const withFunctions = (Component) => (props) => {
    const isAuth = localStorage.getItem("auth");

    const [isOn, setIsOn] = useState(isAuth);
    const prev = useRef(isOn);

    useEffect(() => {
        prev.current = isOn;
    }, [isOn]);

    const onLogin = () => {
        localStorage.setItem("auth", "token");
        setIsOn((prevState) => !prevState);
    };

    const onLogOut = () => {
        localStorage.removeItem("auth");
        setIsOn((prevState) => !prevState);
    };
    return (
          <Card>
              {<Component {...props} isAuth={prev.current} onLogin={onLogin} onLogOut={onLogOut}/>}
          </Card>
    );
};

export default withFunctions;
