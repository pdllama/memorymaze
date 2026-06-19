import { useState, useEffect } from "react"


type CountDownProps = {
    startTime: number
    countDown: boolean
    action1Second: () => void,
    action: () => void
}

export default function CountDown({startTime, countDown, action1Second, action}:CountDownProps) {

    const [time, setTime] = useState(startTime)


    useEffect(() => {
        if (countDown && time !== 0) {
            if (time === 1) {
                action1Second()
            }
            const tm = setTimeout(() => {
                setTime(time-1)
            }, 1000)
            return () => clearTimeout(tm)
        }
        if (countDown && time === 0) {
            action()
        }
    }, [time])

    return (
        <p className="text-[24px] text-white">{time}s</p>
    )
}