import * as ts from "../data/TextStyles";
import * as img from "../data/ImageData";
import { applyTextStyle } from "../utils/TextStyleUtils";
import "createjs";

type Image = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export class BucketContainer extends createjs.Container {

    //===== VARIABLES ======================================//
    private bucketImage: createjs.Bitmap;
    private bucketHeading: createjs.Text;
    private bucketBody: createjs.Text;
    private _width: number = 190;

    private _heading: string;
    private _body: string;
    private _image: Image;

    //===== CONSTRUCTOR ====================================//

   constructor(heading: string, body: string, image: Image) {
       super()

       this._heading = heading;
       this._body = body;
       this._image = image;

       this.addElements();
       this.addContent();
       this.positionElements();
   }

    //===== FUNCTIONS ======================================//

    addElements(): void {

        // Bucket Image
        this.bucketImage = new createjs.Bitmap(this._image);
        this.addChild(this.bucketImage);
 
        // Bucket Header
        this.bucketHeading = new createjs.Text();
        applyTextStyle(this.bucketHeading, ts.BUCKET_HEADLINE);
        this.addChild(this.bucketHeading);

        this.bucketBody = new createjs.Text();
        applyTextStyle(this.bucketBody, ts.BUCKET_BODY);
        this.addChild(this.bucketBody);

    }

    addContent(): void {
        this.bucketHeading.text = this._heading;
        this.bucketBody.text = this._body;
    }

    positionElements(): void {
        // Image
        const imageData: img.IImageData | null = img.getImageDataById(img.IMAGE_0.id);
        const imageScale: number = (imageData) ? this._width / imageData.width : 1;
        this.bucketImage.y = 0;
        this.bucketImage.scaleX = imageScale;
        this.bucketImage.scaleY = imageScale;

        // Header
        this.bucketHeading.y = 146;
        this.bucketHeading.lineWidth = this._width;

        // Body
        this.bucketBody.y = 175;
        this.bucketBody.lineWidth = this._width;
    }


}