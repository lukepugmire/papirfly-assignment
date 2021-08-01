import * as img from "../data/ImageData";
import "createjs";

type Image = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export class StarContainer extends createjs.Container{

    //===== VARIABLES ======================================//
    private stars: createjs.Bitmap;
    private _image: Image;
    private _width: number = 40;

    constructor(starimg: Image) {
        super()

        this._image = starimg;

        this.addElements();
        this.positionElements();
    }

    addElements(): void {

        // Star Image
        this.stars = new createjs.Bitmap(this._image);
        this.addChild(this.stars);


    }

    positionElements(): void {
        // Image
        const imageData: img.IImageData | null = img.getImageDataById(img.STAR.id);
        const imageScale: number = (imageData) ? this._width / imageData.width : 1;
        //this.stars.y = 0;
        this.stars.scaleX = imageScale;
        this.stars.scaleY = imageScale;
        this.stars.x = 220; 
        this.stars.y = 200;
    }
}