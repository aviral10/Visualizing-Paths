function maze_ini(){
    MAZE = true;
    DONE = false;
    brr = [];
    Spoint = [];
    Epoint = [];
    objs = []
    for(let i=0;i<size;i++){
        let temp = []
        for(let j=0;j<size;j++){
            let n = new Shape(i,j);
            // n.blocked = true;
            temp.push(n);
        }
        objs.push(temp);
    }
    loop();
    mazGen(0,0,size,size);
}
let blocks = [];
function mazGen(stX, stY, edX, edY){
    if(edX - stX < 3 || edY - stY < 3){
        return;
    }
    let midX = floor((edX+stX)/2);
    let midY = floor((edY+stY)/2);
    if(midX%2!=0) midX++;
    if(midY%2!=0) midY++;

    let nextmidX = floor((midX+stX)/2);
    let nextmidY = floor((midY+stY)/2);
    if(nextmidX%2!=0) nextmidX++;
    if(nextmidY%2!=0) nextmidY++;
    // console.log("nmx: ", nextmidX, "nmy: ", nextmidY);
    blocks = []
    let temp = []
    for(let i=stX;i<midX;i++){
        if(i != stX+nextmidX)
            temp.push(objs[i][midY]);
        else{
            objs[i][midY].blocked = true;
            let xpos = i*(wide/size);
            let ypos = midY*(wide/size);
            let n = new anoShape(xpos, ypos);
            n.xid = i;
            n.yid = midY;
            brr.push(n)
        }
    }
    blocks.push(temp);
    temp = []
    for(let i=stY;i<midY;i++){
        if(i != stY+nextmidY)
            temp.push(objs[midX][i]);
        else{
            objs[midX][i].blocked = true;
            let xpos = midX*(wide/size);
            let ypos = i*(wide/size);
            let n = new anoShape(xpos, ypos);
            n.xid = midX;
            n.yid = i;
            brr.push(n)
        }
    }
    blocks.push(temp);
    temp = []
    for(let i=midX;i<edX;i++){
        if(i != midX+nextmidX){
            if(i==midX){
                objs[i][midY].blocked = true;
                let xpos = i*(wide/size);
                let ypos = midY*(wide/size);
                let n = new anoShape(xpos, ypos);
                n.xid = i;
                n.yid = midY;
                brr.push(n)
                continue;
            }
            temp.push(objs[i][midY]);
        }
        else{
            
            objs[i][midY].blocked = true;
            let xpos = i*(wide/size);
            let ypos = midY*(wide/size);
            let n = new anoShape(xpos, ypos);
            n.xid = i;
            n.yid = midY;
            brr.push(n)
        }
    }
    blocks.push(temp);
    temp = []
    for(let i=midY+1;i<edY;i++){
        if(i != midY+nextmidY)
            temp.push(objs[midX][i]);
        else{
            objs[midX][i].blocked = true;
            let xpos = midX*(wide/size);
            let ypos = i*(wide/size);
            let n = new anoShape(xpos, ypos);
            n.xid = midX;
            n.yid = i;
            brr.push(n)
        }
    }
    blocks.push(temp);
    // console.log("midX: " ,midX,"midY: ", midY);
    
    // for(let i=stY;i<edY;i++){
    //     objs[midX][i].blocked = true;
    //     let xpos = midX*(wide/size);
    //     let ypos = i*(wide/size);
    //     let n = new anoShape(xpos, ypos);
    //     n.xid = midX;
    //     n.yid = i;
    //     brr.push(n)
    // }
    // for(let i=stX;i<edX;i++){
    //     objs[i][midY].blocked = true;
    //     let xpos = i*(wide/size);
    //     let ypos = midY*(wide/size);
    //     let n = new anoShape(xpos, ypos);
    //     n.xid = i;
    //     n.yid = midY;
    //     brr.push(n)
    // }

    let selects = [0,1,2,3]
    for(let i=0;i<3;i++){
        let rval = random(selects);
        // console.log("rval: ", rval);
        let rem = floor(random(blocks[rval].length));
        // console.log("Rval: ", blocks[rval][rem]);
        // try{
        //     if(blocks[rval][rem].x %2 == 0 && blocks[rval][rem].y %2 == 0){
        //         // if(rem == 0) rem = 0;
        //         // else rem--;
        //         blocks[rval].splice(rem,1);
        //         // console.log("exists");
        //     }
        //     else {
        //         blocks[rval].splice(rem,1);
        //     }
        // }catch (err){
        //     console.log(err.message);
        // }
        blocks[rval].splice(rem,1);
        selects.splice(rval,1);
    }


    let blocks_l = blocks.length;
    for(let i=0;i<blocks_l;i++){
        let b_l = blocks[i].length;
        for(let j=0;j<b_l;j++){
            objs[blocks[i][j].x][blocks[i][j].y].blocked = true;
            let xpos = blocks[i][j].x*(wide/size);
            let ypos = blocks[i][j].y*(wide/size);
            let n = new anoShape(xpos, ypos);
            n.xid = blocks[i][j].x;
            n.yid = blocks[i][j].y;
            brr.push(n);
        }
    }
    mazGen(stX, stY, midX, midY);
    mazGen(midX+1, stY, edX, midY);
    
    mazGen(stX, midY+1, midX, edY);
    mazGen(midX+1, midY+1, edX, edY);
    
}