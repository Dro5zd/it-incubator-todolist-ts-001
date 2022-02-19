import React from 'react';

type ButtonProps = {
    name: string
    callback: ()=> void
}

export const Button = (props: ButtonProps) => {
    const callBack = () => {
        props.callback()
    }

    return (
        <button onClick={callBack}>{props.name}</button>
    );
};
