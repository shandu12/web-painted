import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    background?: string;
    rounded?: string;
    padding?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    link?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    link = '',
    rounded = 'rounded-4xl',
    background = 'bg-gradient-to-r from-primary to-secondary',
    padding = 'py-2 px-4',
}) => {
    const className = ' whitespace-nowrap py-2 px-4 text-contrast-text hover:text-text uppercase font-bold cursor-pointer active:bg-primary active:text-tertiary' +
        ` ${background} ${rounded} ${padding}`;
    return (
        <>
            {link && <a href={link} className={`${className}`}>
                {children}
            </a>}

            {!link && <button
                type={type}
                className={`${className}`}
                onClick={onClick}
            >
                {children}
            </button>}
        </>
    );
};

export default Button;