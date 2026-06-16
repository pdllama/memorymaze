import type { Node } from "@Types/maze"



type NodeProps = {
    node: Node

    isLeftEdge: boolean,
    isRightEdge: boolean,
    isUpEdge:boolean,
    isDownEdge:boolean
}

export default function Node({node, isLeftEdge, isRightEdge, isUpEdge, isDownEdge}:NodeProps) {

    const borderL = node.left ? isLeftEdge ? "border-l-[3px]" : "border-l-[1.5px]" : ""
    const borderR = node.right ? isRightEdge ? "border-r-[3px]" : "border-r-[1.5px]" : ""
    const borderT = node.up ? isUpEdge ? "border-t-[3px]" : "border-t-[1.5px]" : ""
    const borderB = node.down ? isDownEdge ? "border-b-[3px]" : "border-b-[1.5px]" : ""

    // if (isStartNode || isEndNode) {

    //     const border_style = isStartNode ? "border-l-[3px] border-blue" : 'border-r-[3px] border-blue'

    //     return <div className={`h-[40px] w-[40px] ${borderL} ${borderR} ${borderT} ${borderB} border-black p-0 relative`}>
    //         <div className={`size-full absolute inset-0 ${border_style}`}>

    //         </div>
    //     </div>
    // }

    return (
        <div className={`h-[40px] w-[40px] relative`}>
            <div className={`size-full absolute inset-0 ${borderL} ${borderR} ${borderT} ${borderB} border-white p-0`}>

            </div>
        </div>
    )
}