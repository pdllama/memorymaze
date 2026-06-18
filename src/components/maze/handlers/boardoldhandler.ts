//  if (hasntMoved) {
//             if (playerPosition !== "goal") {
//                 if (!getVisibilityPosition(playerPosition, direction)) {
//                     setMoving(true);

//                     let setBorderVisibility = false;

//                     let currNodeDiv = null;
//                     let nextNodeDiv = null;
//                     let currNodeDivMoveClass = '';
//                     let nextNodeDivMoveClass = ""
//                     const supposedNextNode = getAdjacentNode(maze.board, playerPosition, direction, maze.numRows, maze.numCols)

//                     if (supposedNextNode) {
//                         currNodeDiv = document.getElementById(`node-${playerPosition.row}-${playerPosition.col}`) as HTMLDivElement
//                         nextNodeDiv = document.getElementById(`node-${supposedNextNode.row}-${supposedNextNode.col}`) as HTMLDivElement
//                         currNodeDivMoveClass = `make-border-${direction}-visible`
//                         nextNodeDivMoveClass = `make-border-${getOppositeDirection(direction)}-visible`
//                         currNodeDiv.classList.add(currNodeDivMoveClass);
//                         nextNodeDiv.classList.add(nextNodeDivMoveClass);
//                         setBorderVisibility = true;
//                     }
//                     const player = playerRef.current as HTMLDivElement;
//                     player.classList.remove("hit-wall-left", "hit-wall-right", "hit-wall-up", "hit-wall-down")
//                     player.classList.add(`hit-wall-${direction}`)

//                     setTimeout(() => {
//                         let lost_life = false;
//                         let newBoard = null;
      
//                         if (setBorderVisibility) {
//                             if (tries !== "inf") {
//                                 decrementTries()
//                                 if (tries === 1) {
//                                     lost_life = true;
//                                 }
//                             }
                            
//                             newBoard = setMazeVisibility(maze.board, playerPosition, supposedNextNode as Node, direction)
//                             setMazeState({
//                                 playerPosition: newBoard[playerPosition.row][playerPosition.col],
//                                 maze: {...maze, board: newBoard}
//                             })
                            
//                         } else {
//                             setMazeState({...mazeState, playerPosition: nextNode})
//                         }
//                         if (lost_life) {
//                             player.classList.add("lost-life")
//                             setTimeout(()=> {
//                                 player.classList.remove("hit-wall-left", "hit-wall-right", "hit-wall-up", "hit-wall-down")
//                                 decrementLife()
//                                 setMazeState({
//                                     maze: {...maze, board: newBoard as MazeBoard},
//                                     playerPosition: 'entrance',
//                                 })
//                             }, 1750)
//                         } else {
//                             setMoving(false);
//                         }
//                         if (setBorderVisibility) {currNodeDiv?.classList.remove(currNodeDivMoveClass); nextNodeDiv?.classList.remove(nextNodeDivMoveClass);}
//                     }, 100)
//                 }
//                 // do nothing
//             } 
//         } else {
//             setMoving(true);
//             const player = playerRef.current as HTMLDivElement;
//             player.classList.remove("hit-wall-left", "hit-wall-right", "hit-wall-up", "hit-wall-down")
//             player.classList.add(`move-to-new-node-${direction}`)
//             setTimeout(() => {
//                 setMazeState({...mazeState, playerPosition:nextNode})
//                 setMoving(false);
//             }, 100)
//         }







// Keypress handler
// setMoving(true);
//                 const nextNode = movePlayerKeyPress(playerPosition, maze, direction);
//                 const hasntMoved = nextNode === playerPosition;
//                 // setLastMovement(direction)
//                 if (hasntMoved) {
//                     if (playerPosition !== "goal" && playerPosition !== "entrance") {
//                         if (!getVisibilityPosition(playerPosition, direction)) {
//                             // setMoving(true);
//                             // const player = playerRef.current as HTMLDivElement;
//                             // player.classList.remove("hit-wall-left", "hit-wall-right", "hit-wall-up", "hit-wall-down")
//                             // player.classList.add(`hit-wall-${direction}`)
//                             // setTimeout(() => {
//                             //     setMazeState({...mazeState, playerPosition:nextNode})
//                             //     setMoving(false);
//                             // }, 100)
                             

//                             let setBorderVisibility = false;

//                             let currNodeDiv = null;
//                             let nextNodeDiv = null;
//                             let currNodeDivMoveClass = '';
//                             let nextNodeDivMoveClass = ""
//                             const supposedNextNode = getAdjacentNode(maze.board, playerPosition, direction, maze.numRows, maze.numCols)

//                             if (supposedNextNode) {
//                                 currNodeDiv = document.getElementById(`node-${playerPosition.row}-${playerPosition.col}`) as HTMLDivElement
//                                 nextNodeDiv = document.getElementById(`node-${supposedNextNode.row}-${supposedNextNode.col}`) as HTMLDivElement
//                                 currNodeDivMoveClass = `make-border-${direction}-visible`
//                                 nextNodeDivMoveClass = `make-border-${getOppositeDirection(direction)}-visible`
//                                 currNodeDiv.classList.add(currNodeDivMoveClass);
//                                 nextNodeDiv.classList.add(nextNodeDivMoveClass);
//                                 setBorderVisibility = true;
//                             }
//                             const player = playerRef.current as HTMLDivElement;
//                             player.classList.remove("hit-wall-left", "hit-wall-right", "hit-wall-up", "hit-wall-down")
//                             player.classList.add(`hit-wall-${direction}`)

//                             setTimeout(() => {
//                                 //() => {
//                                 //     direction === "up" ? playerPosition.visibleUp = true : direction === "down" ? playerPosition.visibleDown = true : direction === "left" ? playerPosition.visibleLeft = true : playerPosition.visibleRight = true
//                                 //     direction === "up" ? supposedNextNode.visibleDown = true : direction === "down" ? supposedNextNode.visibleUp = true : direction === "left" ? supposedNextNode.visibleRight = true : supposedNextNode.visibleLeft = true
//                                 // }
//                                 if (setBorderVisibility) {
//                                     const newBoard = setMazeVisibility(maze.board, playerPosition, supposedNextNode as Node, direction)
//                                     setMazeState({
//                                         playerPosition: newBoard[playerPosition.row][playerPosition.col],
//                                         maze: !setBorderVisibility ? maze : 
//                                             {...maze, board: newBoard}
//                                     })
//                                     if (tries !== "inf") {
//                                         decrementTries()
//                                     }
//                                 } else {
//                                     setMazeState({...mazeState, playerPosition: nextNode})
//                                 }
                                
//                                 setMoving(false);
//                                 if (setBorderVisibility) {currNodeDiv?.classList.remove(currNodeDivMoveClass); nextNodeDiv?.classList.remove(nextNodeDivMoveClass);}
//                             }, 100)
//                         }
//                         // do nothing
//                     } 
//                 } else {
//                     const player = playerRef.current as HTMLDivElement;
//                     player.classList.remove("hit-wall-left", "hit-wall-right", "hit-wall-up", "hit-wall-down")
//                     player.classList.add(`move-to-new-node-${direction}`)
                    
//                     setTimeout(() => {
//                         setMazeState({...mazeState, playerPosition:nextNode})
//                         setMoving(false);
//                     }, 100)
//                 }