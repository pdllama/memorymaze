


type ButtonProps = {
    children: React.ReactNode,
    onClick: () => void,
    type: "outlined" | "filled"
    color: "main" | "secondary"
    isToggle: boolean
    toggleActive: boolean
    classes: string
}

export default function Button({children=<></>, onClick=() => {}, type="filled", color="main", isToggle=false, toggleActive=false, classes=''}: Partial<ButtonProps>) {

    const doToggleStyles = isToggle && toggleActive ? true : false

    return (
        <button 
            className={`
                ${type === "outlined" ? `border border-${color}${doToggleStyles ? "-darker" : ""} text-${color}${doToggleStyles ? "-darker" : ""}` : `bg-${color}${doToggleStyles ? "-darker" : ""} text-white`} 
                is-button size-fit py-[18px] px-[24px] rounded-sm ${type === "outlined" && doToggleStyles ? "toggle-active" : ""}
                ${classes}
            `}
            onClick={onClick}
        >
            {children}
        </button>
    )
}