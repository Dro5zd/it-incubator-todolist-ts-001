import React from 'react';

type ButtonProps = () => {
    name: string
    callback: ()=> void
}

export const Button = (props: ButtonProps) => {

    const callBack = () => {

    }


    return (
        <button onClick={callBack}>{props.name}</button>
    );
};
