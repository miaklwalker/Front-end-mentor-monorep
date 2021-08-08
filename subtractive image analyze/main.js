const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

export default function loadImage(url){
    return new Promise(resolve=>{
        const image = new Image();
        image.addEventListener('load',()=>{
            resolve(image);
        });
        image.src=url;
    })
}

Promise.all([loadImage("./image-header-desktop.jpg"),loadImage("./desktop-preview.jpg")])
.then(([image,control])=>{
    let width = image.width;
    let height = image.height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image,0,0);
    let imageDataOne = context.getImageData(0,0,width,height);
    context.drawImage(control,1,2,488,401,0,0,canvas.width,canvas.height);
    let imageDataTwo = context.getImageData(0,0,width,height);
    let mapped = [imageDataOne.data,imageDataTwo.data].map(imageData=>{
        let mapped = [];
        let temp = [];
        let count = 0;
        console.log(imageData);
        imageData.forEach(element => {
            temp.push(element);
            count++
            if(count === 4){
                mapped.push(temp);
                temp = [];
                count = 0;
            }
        });
        return mapped;
    })
    /*
    [[]]
    [[]]
    */
   let desiredOutput = mapped[1].map((ele,index)=>{
       let [sr,sg,sb,sa]=mapped[0][index];
       let [dr,dg,db,da]=ele;
       return[sr-dr,sg-dg,sb-db,sa];
   })
    console.log(desiredOutput);
})
