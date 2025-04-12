import React from "react";

export default function Button({text, active, onClick}: {text: string, active: boolean, onClick: () => void}) {
    return <>
        <button onClick={onClick} className={`w-20 h-20  rounded-full text-white bg-secondary-${active ? "400" : "600"}`}>
            {text}
        </button>
    </>;
}