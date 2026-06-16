

export function getRandIdx(num:number) {
    return Math.floor(Math.random()*num);
}

const directions = ["up", "down", "left", "right"]
export function getRandDirection(odds:number[]) {
    //[up, down, left, right]

    let iterodds = 0;
    const randnum = Math.random();
    for (let i = 0; i < odds.length ; i++) {
        const o = odds[i]
        if (randnum > iterodds && randnum <= iterodds+o) {
            return directions[i];
        }
        iterodds+=o
    }
}


