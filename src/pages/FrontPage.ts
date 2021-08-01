import * as $ from "jquery";
import * as img from "../data/ImageData";
import * as ts from "../data/TextStyles";
import { applyTextStyle } from "../utils/TextStyleUtils";
import { AssetManager } from "../managers/AssetManager";
import { HorizontalDivide } from "../containers/HorizontalDivide";
import { Margin } from "../utils/Margin";
import "createjs";
import { BucketContainer } from "../containers/BucketContainer";
import { LoremIpsum } from "lorem-ipsum";
import { StarContainer } from "../containers/StarContainer";

/*****************************************************************************/
export class FrontPage extends createjs.Container {


    //===== VARIABLES ======================================//
    private logo: createjs.Bitmap;
    private headline: createjs.Text;
    private body: createjs.Text;
    private div: HorizontalDivide;
    private bucketConsulting: BucketContainer;
    private bucketProduction: BucketContainer;
    private bucketSupport: BucketContainer;
    //private stars: createjs.Shape;
    private numberOfStars: number;
    private star: StarContainer;

    private _width: number;
    private _height: number;


    //===== CONSTRUCTOR ====================================//
    constructor() {
        super();

        this._width = -1;
        this._height = -1;
        this.numberOfStars = 4;

        $("[name=stars]").on("change", (e: Event) => this.onNumStarsChange(e));

        this.addElements();
        this.putDefaultContent();
    }

    //===== FUNCTIONS ======================================//
    /**
     * Instantiate elements and add them to the container.
     */
    addElements(): void {

        // Logo
        this.logo = new createjs.Bitmap(this.am.getAsset(img.LOGO.id));
        this.addChild(this.logo);

        // Headline
        this.headline = new createjs.Text();
        applyTextStyle(this.headline, ts.HEADLINE);
        this.addChild(this.headline);

        // Body
        this.body = new createjs.Text();
        applyTextStyle(this.body, ts.BODY);
        this.addChild(this.body);

        // Divide
        this.div = new HorizontalDivide();
        this.addChild(this.div);

        // BucketConsulting
        const lorem = new LoremIpsum();
       
        this.bucketConsulting = new BucketContainer("CONSULTING", lorem.generateWords(50), this.am.getAsset(img.IMAGE_0.id));
        this.addChild(this.bucketConsulting);

        this.bucketProduction = new BucketContainer("PRODUCTION", lorem.generateWords(50), this.am.getAsset(img.IMAGE_1.id));
        this.addChild(this.bucketProduction);

        this.bucketSupport = new BucketContainer("Support", lorem.generateWords(50), this.am.getAsset(img.IMAGE_2.id));
        this.addChild(this.bucketSupport);



    }

    /**
     * Set default content for elements.
     */
    putDefaultContent(): void {

        // Headline
        this.headline.text = "Creating Lasting Partnerships";

        // Body
        this.body.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere est sodales est lobortis interdum. Cras a turpis ullamcorper elit dignissim mattis. Mauris dignissim aliquet est, vel vestibulum nisi fermentum vel. Fusce sit amet dolor eu tellus tincidunt pellentesque et vitae mauris. Praesent convallis magna sem. Sed vel mi nunc. In porta justo urna, ac tristique mauris lobortis et. Nam imperdiet lacinia augue eu vehicula. Duis nec consequat libero. Aenean et sapien volutpat, ultricies ante sit amet, ornare leo. Proin orci felis, lacinia ac commodo vitae, suscipit eget ipsum. Sed egestas justo non dolor molestie, eu iaculis enim lobortis. Suspendisse id ipsum vel lectus luctus viverra. Donec quam neque, fringilla quis justo sagittis, malesuada vestibulum leo. Nam eget lorem at elit vestibulum molestie nec quis est.";

    }

    /**
     * Size and position elements and update the CreateJS stage.
     * This should be called whenever the layout changes.
     */
    updateSizeProperties(): void {

        // Margin
        const m: Margin = new Margin(48, 36, 60, 36);

        // Logo
        const logoWidth: number = 116;
        const logoScale: number = logoWidth / img.LOGO.width;

        this.logo.x = this.width - logoWidth - 36;
        this.logo.y = 48;
        this.logo.scaleX = logoScale;
        this.logo.scaleY = logoScale;

        // Headline
        this.headline.x = m.left;
        this.headline.y = 113;
        this.headline.lineWidth = this.width - m.horizontal;

        // Body
        this.body.x = m.left;
        this.body.y = 162;
        this.body.lineWidth = this.width - m.horizontal;

        // Divide
        this.div.x = m.left;
        this.div.y = 40;

        // Buckets

        const bucketTop: number = 432;
        const bucketWidth: number = 190;
        const spacing: number = 18;

        // BucketConsulting
        this.bucketConsulting.x = m.left;
        this.bucketConsulting.y = bucketTop;

        // BucketProduction
        this.bucketProduction.x = m.left + bucketWidth + spacing;
        this.bucketProduction.y = bucketTop;

        // BucketSupport
        this.bucketSupport.x = m.left + bucketWidth*2 + spacing*2;
        this.bucketSupport.y = bucketTop;

        // Stars
        
        //this.stars.graphics.clear();
        //this.stars.graphics.setStrokeStyle(1);
        //this.stars.graphics.beginStroke("black");
        //this.stars.graphics.beginFill("yellow");
        
        for (let i=0; i < this.numberOfStars; i++) {
            this.star = new StarContainer(this.am.getAsset(img.STAR.id));
            this.addChild(this.star);
            console.log(this.star)
            
          //this.stars.graphics.drawPolyStar(i*-50,0,20, 5, 2, 55);
        }

        /*the stars spawn on each other, how can I add -50 with each new star? */
        this.star.x = -50; 
        this.star.y = 0;

        // Update Stage
        if (this.stage)
            this.stage.update();
    }


    //===== EVENT LISTENERS ================================//
    private onNumStarsChange(e: Event = null) {
        const target = e.target as HTMLTextAreaElement;
        this.numberOfStars = parseInt(target.value);
        // Update stage display
        this.updateSizeProperties();
    }


    //===== GETTERS / SETTERS ==============================//
    get width(): number {
        return this._width;
    }
    set width(value: number) {
        this._width = value;
        this.updateSizeProperties();
    }

    get height(): number {
        return this._height;
    }
    set height(value: number) {
        this._height = value;
        this.updateSizeProperties();
    }


    //===== CONVENIENCE ====================================//
    private get am(): AssetManager {
        return AssetManager.instance;
    }
}

