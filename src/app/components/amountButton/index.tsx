import React, { useState } from "react";

interface AmountButtonProps {
    min?: number;
    max?: number;
    initial?: number;
    onChange?: (value: number) => void;
}

const AmountButton: React.FC<AmountButtonProps> = ({
    min = 1,
    max = 99,
    initial = 1,
    onChange,
}) => {
    const [amount, setAmount] = useState(initial);
    const handleDecrease = () => {
        if (amount > min) {
            const newAmount = amount - 1;
            setAmount(newAmount);
            onChange?.(newAmount);
        }
    };

    const handleIncrease = () => {
        if (amount < max) {
            const newAmount = amount + 1;
            setAmount(newAmount);
            onChange?.(newAmount);
        }
    };
    return (
        <div className="flex align-middle rounded-4xl px-3 py-1 w-fit bg-transparent border font-bold" style={{ display: "flex", alignItems: "center" }}>
            <button
                type="button"
                onClick={handleDecrease}
                disabled={amount <= min}
                className="px-2 cursor-pointer text-xl hover:text-contrast-text active:text-tertiary "
                aria-label="Decrease amount"
            >
                <span>-</span>
            </button>
            <span className="text-xl min-w-[2rem] text-center text-tertiary">
                {amount}
            </span>
            <button
                type="button"
                onClick={handleIncrease}
                disabled={amount >= max}
                className="px-2 cursor-pointer text-xl hover:text-contrast-text active:text-tertiary"
                aria-label="Decrease amount"
            >
                <span>+</span>
            </button>
        </div>
    );
};

export default AmountButton;