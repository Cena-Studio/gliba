/**
 * 
 * @author Jidong Luo
 * @copyright Cena Studio 2023
 * @license MIT
 * @version 1.0.0
 * 
 */


/**
 * @class
 */
class GlibaConfig{

    /**
     * @constructor
     * @memberof GlibaConfig
     * @param {array} arrResource
     * @param {string|HTMLElement|HTMLCollection} containers The id of the element that applies the dynamic background.
     * @param {string} strDirection "both", "horizontal", "vertical", or "default". The allowed direction of movement.
     * @param {string} strSpeed  e.g. "1.8s", or "default". The speed of movement.
     * @param {string|number} amplitude 1-9, or "default". The movement range of the background.
     * @param {string|number} depth 1-9, or "default". The depth of the background field that also effects the movement range.
     * @param {string|boolean} reverse true, false, or "default". It determines whether to move in the same or the opposite direction as the cursor.
     * @param {string|boolean} rebound true, false, or "default". It determines whether the background bounces back to its original position when the mouse cursor leaves.
     * @param {string|boolean} preload true, false, or "default". It determines whether to wait for the image resources to load before showing the background.
     */
    constructor(arrResource, containers, strDirection, strSpeed, amplitude, depth, reverse, rebound, preload){

        /**
         * @type {GlibaConfig[][]}
         */
        this.arrResource = GlibaConfig.#standardizeResource(arrResource);

        if(containers === "default"){
            containers = document.body;
        }
        /**
         * @type {HTMLElement[]}
         */
        this.arrContainers = GlibaConfig.#standardizeContainers(containers);

        if(strDirection === "default"){
            strDirection = "both";
        }
        /**
         * @type {string}
         */
        this.strDirection = strDirection;

        if(strSpeed === "default"){
            strSpeed = "1.8s";
        }
        /**
         * @type {string}
         */
        this.strSpeed = strSpeed;

        if(amplitude === "default"){
            amplitude = 5;
        }else{

            let strAmplitudeType = Object.prototype.toString.call(amplitude);

            if(strAmplitudeType === "[object Number]"){

                if(amplitude < 1){

                    amplitude = 1;

                }else if(amplitude > 9){

                    amplitude = 9;

                }
            
            }

        }
        /**
         * @type {number}
         */
        this.numAmplitude = amplitude;

        if(depth === "default"){
            depth = 5;
        }else{

            let strDepthType = Object.prototype.toString.call(depth);

            if(strDepthType === "[object Number]"){

                if(depth < 1){

                    depth = 1;

                }else if(depth > 9){

                    depth = 9;

                }
            
            }

        }
        /**
         * @type {number}
         */
        this.numDepth = depth;
        
        if(reverse === "default"){
            reverse = true;
        }
        /**
         * @type {boolean}
         */
        this.booReverse = reverse;

        if(rebound === "default"){
            rebound = true;
        }
        /**
         * @type {boolean}
         */
        this.booRebound = rebound;

        if(preload === "default"){
            preload = true;
        }
        /**
         * @type {boolean}
         */
        this.booPreload = preload;

    }

    /**
     * Convert user parameters to a standard configuration object.
     * @memberof GlibaConfig
     * @param {array|object} arg Either an array that contains the image resources or a configuration object.
     * @param {array} arg.resource When the arg is an configuration object, this property is required to hold the array that contains the image resources.
     * @param {HTMLElement|HTMLCollection=} arg.container Optional. The HTML element or the HTML collection of elements that applies the dynamic background, or "default".
     * @param {string=} arg.direction Optional. "both", "horizontal", "vertical", or "default". The allowed direction of movement.
     * @param {string=} arg.speed Optional. E.g. "1.8s", or "default". The speed of movement.
     * @param {string|number=} arg.amplitude Optional. 1-9, or "default". The movement range of the background.
     * @param {string|number=} arg.depth Optional. 1-9, or "default". The depth of the background field that also effects the movement range.
     * @param {string|boolean=} arg.reverse Optional. true, false, or "default". It determines whether to move in the same or the opposite direction as the cursor.
     * @param {string|boolean=} arg.rebound Optional. true, false, or "default". It determines whether the background bounces back to its original position when the mouse cursor leaves.
     * @param {string|boolean=} arg.preload Optional. true, false, or "default". It determines whether to wait for the image resources to load before showing the background.
     * @return {GlibaConfig}
     */
    static standardize(arg){

        let argType = Object.prototype.toString.call(arg);

        if(argType === "[object Array]"){
            
            return new GlibaConfig(arg, "default", "default", "default", "default", "default", "default", "default", "default");

        }else if(argType === "[object Object]"){

            let containers = "default";
            let strDirection = "default";
            let strSpeed = "default";
            let amplitude = "default";
            let depth = "default";
            let reverse = "default";
            let rebound = "default";
            let preload = "default";

            if(arg.hasOwnProperty("container")){
                containers = arg.container;
            }

            if(arg.hasOwnProperty("direction")){
                strDirection = arg.direction;
            }

            if(arg.hasOwnProperty("speed")){
                strSpeed = arg.speed;
            }

            if(arg.hasOwnProperty("amplitude")){
                amplitude = arg.amplitude;
            }

            if(arg.hasOwnProperty("depth")){
                depth = arg.depth;
            }

            if(arg.hasOwnProperty("reverse")){
                reverse = arg.reverse;
            }

            if(arg.hasOwnProperty("rebound")){
                rebound = arg.rebound;
            }

            if(arg.hasOwnProperty("preload")){
                preload = arg.preload;
            }

            return new GlibaConfig(arg.resource, containers, strDirection, strSpeed, amplitude, depth, reverse, rebound, preload);

        }

    }

    /**
     * Convert the resource parameter to a standard resource array.
     * @private
     * @memberof GlibaConfig
     * @param {array} arrResource
     * @return {GlibaImage[][]} The standardized resource array.
     */
    static #standardizeResource(arrResource){

        let intLayerSize = arrResource.length;

        for(let i = 0; i < intLayerSize; i++){

            let resourceElement = arrResource[i];
            let resourceElementType = Object.prototype.toString.call(resourceElement);

            if(resourceElementType === "[object String]" || resourceElementType === "[object Object]"){

                let standardizedImage = this.#standardizeImage(resourceElement);
                arrResource[i] = [standardizedImage];

            }else if(resourceElementType === "[object Array]"){

                let intImageSize = resourceElement.length;

                for(let j = 0; j < intImageSize; j++){

                    resourceElement[j] = this.#standardizeImage(resourceElement[j]);

                }

                arrResource[i] = resourceElement;

            }

        }

        return arrResource;
        
    }

    /**
     * Convert the image data to a standard image object.
     * @private
     * @memberof GlibaConfig
     * @param {string|object} imageArg
     * @return {GlibaImage} The standardized image object.
     */
    static #standardizeImage(imageArg){

        let strImageArgType = Object.prototype.toString.call(imageArg);

        if(strImageArgType === "[object String]"){

            return new GlibaImage(imageArg, "screen");

        }else if(strImageArgType === "[object Object]"){

            if(imageArg.hasOwnProperty("blendMode")){

                return new GlibaImage(imageArg.url, imageArg.blendMode);

            }else{

                return new GlibaImage(imageArg.url, "screen");

            }

        }

    }

    /**
     * @private
     * @memberof GlibaConfig
     * @param {HTMLElement|HTMLCollection} containersArg
     * @return {HTMLElement[]} The standardized array of container elements.
     */
    static #standardizeContainers(containersArg){

        let arrContainers = [];
        let strImageArgType = Object.prototype.toString.call(containersArg);

        if(strImageArgType === "[object HTMLCollection]"){

            let intContainerSize = containersArg.length;
            
            for(let i = 0; i < intContainerSize; i++){

                arrContainers.push(containersArg[i]);

            }

        }else if(strImageArgType.includes("HTML") && strImageArgType.includes("Element")){

            arrContainers.push(containersArg);

        }

        return arrContainers;

    }

}

/**
 * @class
 */
class GlibaImage{

    /**
     * @constructor
     * @memberof GlibaImage
     * @param {string} strUrl Either a relative path or an absolute path. The location of the image resource.
     * @param {string} strBlendMode
     */
    constructor(strUrl, strBlendMode){

        /**
         * @type {string}
         */
        this.url = strUrl;

        if(strBlendMode === "default"){
            strBlendMode = "screen";
        }
        /**
         * @type {string}
         */
        this.blendMode = strBlendMode;

    }

}

/**
 * @class
 */
class GlibaEvent{

    /**
     * 
     * @param {number} numMouseClientPosition 
     * @param {number} numContainerClientPosition 
     * @param {number} numContainerClientWidth 
     * @returns {number}
     */
    static calcAttractionRatio(numMouseClientPosition, numContainerClientPosition, numContainerClientWidth){
        return (2 * (numMouseClientPosition - numContainerClientPosition) - numContainerClientWidth) / 200;
    }

    /**
     * 
     * @param {number} numMouseClientPosition 
     * @param {number} numContainerClientPosition 
     * @param {number} numContainerClientWidth 
     * @returns {number}
     */
    static calcRepulsionRatio(numMouseClientPosition, numContainerClientPosition, numContainerClientWidth){
        return (numContainerClientWidth - 2 * (numMouseClientPosition - numContainerClientPosition)) / 200;
    }

}

class Gliba{

    /**
     * Launch the dynamic background. For more details of acceptable format of the argument, please visit https://lab.cena.cool/gliba.
     * @constructor
     * @memberof Gliba
     * @param {array|object} arg Either an array that contains the image resources or a configuration object.
     * @param {array} arg.resource When the arg is an configuration object, this property is required to hold the array that contains the image resources.
     * @param {HTMLElement|HTMLCollection=} arg.container Optional. The HTML element or the HTML collection of elements that applies the dynamic background, or "default".
     * @param {string=} arg.direction Optional. "both", "horizontal", "vertical", or "default". The allowed direction of movement.
     * @param {string=} arg.speed Optional. E.g. "1.8s", or "default". The speed of movement.
     * @param {string|number=} arg.amplitude Optional. 1-9, or "default". The movement range of the background.
     * @param {string|number=} arg.depth Optional. 1-9, or "default". The depth of the background field that also effects the movement range.
     * @param {string|boolean=} arg.reverse Optional. true, false, or "default". It determines whether to move in the same or the opposite direction as the cursor.
     * @param {string|boolean=} arg.rebound Optional. true, false, or "default". It determines whether the background bounces back to its original position when the mouse cursor leaves.
     * @param {string|boolean=} arg.preload Optional. true, false, or "default". It determines whether to wait for the image resources to load before showing the background.
     */
    constructor(arg, isOriginalArg){

        if(isOriginalArg){

            /**
             * @type {GlibaConfig}
             */
            this.objConfig = GlibaConfig.standardize(arg);

        }else{

            this.objConfig = arg;

        }
        /**
         * @type {number[]}
         */
        this.arrImageStretchAmounts = this.#calculateLayerStretchAmount();
        /**
         * @type {HTMLDivElement[]}
         */
        this.arrFrames = [];

        this.#renderDomNodes();
        this.#bindEvents();
        this.#showFrame();

    }

    /**
     * Launch the dynamic background. For more details of acceptable format of the argument, please visit https://lab.cena.cool/gliba.
     * @memberof Gliba
     * @param {array|object} arg Either an array that contains the image resources or a configuration object.
     * @param {array} arg.resource When the arg is an configuration object, this property is required to hold the array that contains the image resources.
     * @param {HTMLElement|HTMLCollection=} arg.container Optional. The HTML element or the HTML collection of elements that applies the dynamic background, or "default".
     * @param {string=} arg.direction Optional. "both", "horizontal", "vertical", or "default". The allowed direction of movement.
     * @param {string=} arg.speed Optional. E.g. "1.8s", or "default". The speed of movement.
     * @param {string|number=} arg.amplitude Optional. 1-9, or "default". The movement range of the background.
     * @param {string|number=} arg.depth Optional. 1-9, or "default". The depth of the background field that also effects the movement range.
     * @param {string|boolean=} arg.reverse Optional. true, false, or "default". It determines whether to move in the same or the opposite direction as the cursor.
     * @param {string|boolean=} arg.rebound Optional. true, false, or "default". It determines whether the background bounces back to its original position when the mouse cursor leaves.
     * @param {string|boolean=} arg.preload Optional. true, false, or "default". It determines whether to wait for the image resources to load before showing the background.
     */
    static initialize(arg){

        return new Gliba(arg, true);

    }

    /**
     * 
     * @private
     * @memberof Gliba
     * @return {number[]} The array that contains the stretch amounts of layers.
     * 
     */
    #calculateLayerStretchAmount(){
        
        let arrImageStretchAmounts = [];
        let objConfig = this.objConfig;
        let numAmplitude = objConfig.numAmplitude;
        let numDepth = objConfig.numDepth;
        let arrResource = objConfig.arrResource;
        let intBackgroundLayerSize = arrResource.length;

        for(let i = 0; i < intBackgroundLayerSize; i++){
            let numLayerStretchAmount = Math.pow(((6 + numDepth) * i + (5 + numAmplitude) * Math.pow(2, 0.5)) / 10, 2) * 2;

            // get the number of the images in the layer
            let intBackgroundImageSize = arrResource[i].length;
            for(let j = 0; j < intBackgroundImageSize; j++){

                arrImageStretchAmounts.push(numLayerStretchAmount);

            }
        }

        return arrImageStretchAmounts;

    }

    /**
     * Render the dom nodes.
     * @private
     * @memberof Gliba
     */
    #renderDomNodes(){

        let objConfig = this.objConfig;

        let arrContainers = objConfig.arrContainers;
        let intContainerSize = arrContainers.length;

        let arrResource = objConfig.arrResource;
        let intBackgroundLayerSize = arrResource.length;
        let strDirection = objConfig.strDirection;
        let strSpeed = objConfig.strSpeed;
        
        for(let i = 0; i < intContainerSize; i++){

            //render the frame dom node
            let eleGlibaFrame = document.createElement("div");
            eleGlibaFrame.classList.add("gliba_frame");
            arrContainers[i].insertBefore(eleGlibaFrame, arrContainers[i].firstChild);
            this.arrFrames.push(eleGlibaFrame);

            // set the css style of the frame
            eleGlibaFrame.style.cssText = "position: absolute; left: 0; right: 0; top: 0; bottom: 0; width: 100%; height: 100%; opacity: 0; overflow: hidden; z-index: -999; transition: opacity 1.5s;";   

            let intStretchIndex = 0;

            for(let j = 0; j < intBackgroundLayerSize; j++){

                // get the number of the images in the layer
                let intBackgroundImageSize = arrResource[j].length;
    
                for(let k = 0; k < intBackgroundImageSize; k++){
    
                    // render the image dom node
                    let eleGlibaImage = document.createElement("div");
                    eleGlibaImage.classList.add("gliba_image");
                    eleGlibaFrame.append(eleGlibaImage);
    
                    // set the css style of the image
                    eleGlibaImage.style.cssText = "position: absolute; background-size: cover; background-position: center center;";
                    eleGlibaImage.style.backgroundImage = "url(" + arrResource[j][k].url + ")";
                    eleGlibaImage.style.mixBlendMode = arrResource[j][k].blendMode;
                    eleGlibaImage.style.transition = "transform " + strSpeed + " ease-out";

                    if(strDirection === "both" ){
    
                        eleGlibaImage.style.top = -this.arrImageStretchAmounts[intStretchIndex] / 2 + "%";
                        eleGlibaImage.style.height = this.arrImageStretchAmounts[intStretchIndex] + 100 + "%";
                        eleGlibaImage.style.left = -this.arrImageStretchAmounts[intStretchIndex] / 2 + "%";
                        eleGlibaImage.style.width = this.arrImageStretchAmounts[intStretchIndex] + 100 + "%";
        
                    }else if(strDirection === "horizontal"){
        
                        eleGlibaImage.style.top = "0";
                        eleGlibaImage.style.height = "100%";
                        eleGlibaImage.style.left = -this.arrImageStretchAmounts[intStretchIndex] / 2 + "%";
                        eleGlibaImage.style.width = this.arrImageStretchAmounts[intStretchIndex] + 100 + "%";
        
                    }else if(strDirection === "vertical"){
        
                        eleGlibaImage.style.top = -this.arrImageStretchAmounts[intStretchIndex] / 2 + "%";
                        eleGlibaImage.style.height = this.arrImageStretchAmounts[intStretchIndex] + 100 + "%";
                        eleGlibaImage.style.left = "0";
                        eleGlibaImage.style.width = "100%";
        
                    }

                    intStretchIndex++;
    
                }
    
            }

        }

    }

    /**
     * Bind mouse events.
     * @private
     * @memberof Gliba
     */
    #bindEvents(){
    
        let objConfig = this.objConfig;

        let arrContainers = objConfig.arrContainers;
        let intContainerSize = arrContainers.length;
        
        let strDirection = objConfig.strDirection;
        let reboundable = objConfig.booRebound;
        let arrLayerStretchAmounts = this.arrImageStretchAmounts;
        let intBackgroundImageSize = arrLayerStretchAmounts.length;
        let reversed = objConfig.booReverse;
        let calcRatio;

        if(reversed){

            calcRatio = GlibaEvent.calcRepulsionRatio;

        }else{

            calcRatio = GlibaEvent.calcAttractionRatio;

        }

        for(let i = 0; i < intContainerSize; i++){

            let eleContainer = arrContainers[i];
            let arrGlibaImage = this.arrFrames[i].children;

            if(strDirection === "both"){

                eleContainer.addEventListener("mousemove", function(e){
    
                    let numHorizontalMovementRatio = calcRatio(e.clientX, eleContainer.getBoundingClientRect().left, eleContainer.clientWidth);
                    let numVerticalMovementRatio = calcRatio(e.clientY, eleContainer.getBoundingClientRect().top, eleContainer.clientHeight);
    
                    for(let j = 0; j < intBackgroundImageSize; j++){
                        
                        arrGlibaImage[j].style.transform = "translateX(" + arrLayerStretchAmounts[j] * numHorizontalMovementRatio + "px) translateY(" + arrLayerStretchAmounts[j] * numVerticalMovementRatio + "px)";
    
                    }
    
                });
    
                if(reboundable){
    
                    eleContainer.addEventListener("mouseleave",  function(){
    
                        for(let j = 0; j < intBackgroundImageSize; j++){
        
                            arrGlibaImage[j].style.transform = "translateX(0%) translateY(0%)";
        
                        }
        
                    });
    
                }
    
            }else if(strDirection === "horizontal"){
    
                eleContainer.addEventListener("mousemove", function(e){
    
                    let numMovementRatio = calcRatio(e.clientX, eleContainer.getBoundingClientRect().left, eleContainer.clientWidth);
    
                    for(let j = 0; j < intBackgroundImageSize; j++){
                        
                        arrGlibaImage[j].style.transform = "translateX(" + arrLayerStretchAmounts[j] * numMovementRatio + "px)";
    
                    }
    
                });
    
                if(reboundable){
    
                    eleContainer.addEventListener("mouseleave", function(){
    
                        for(let j = 0; j < intBackgroundImageSize; j++){

                            arrGlibaImage[j].style.transform = "translateX(0%)";
        
                        }
        
                    });
    
                }
    
            }else if(strDirection === "vertical"){
    
                eleContainer.addEventListener("mousemove", function(e){
                    
                    let numMovementRatio = calcRatio(e.clientY, eleContainer.getBoundingClientRect().top, eleContainer.clientHeight);
    
                    for(let j = 0; j < intBackgroundImageSize; j++){
                        
                        arrGlibaImage[j].style.transform = "translateY(" + arrLayerStretchAmounts[j] * numMovementRatio + "px)";
    
                    }
    
                });
    
                if(reboundable){
    
                    eleContainer.addEventListener("mouseleave", function(){
    
                        for(let j = 0; j < intBackgroundImageSize; j++){
    
                            arrGlibaImage[j].style.transform = "translateY(0%)";
    
                        }
    
                    });
    
                }

            }

        }
    
    }

    /**
     * Display the initialized background.
     * @private
     * @memberof Gliba
     */
    #showFrame(){

        let preloadable = this.objConfig.booPreload;
        let arrFrames = this.arrFrames;
        let intContainerSize = arrFrames.length;

        if(preloadable){
            
            let img_count = 0;
            let img_load = [];
            let img_src = [];
            let arrResource = this.objConfig.arrResource;
            let intBackgroundLayerSize = arrResource.length;

            for(let i = 0; i < intBackgroundLayerSize; i++){

                // get the number of the images in the layer
                let intBackgroundImageSize = arrResource[i].length;

                for(let j = 0; j < intBackgroundImageSize; j++){
                    
                    img_src.push(arrResource[i][j].url);

                }

            }

            for(let index in img_src){
                img_load[index] = new Image();
                img_load[index].onload = function(){
                    img_count += 1;
                    if(img_count == img_src.length){

                        for(let i = 0; i < intContainerSize; i++){
                            
                            arrFrames[i].style.opacity = "1";

                        }

                    }
                }
                img_load[index].src = img_src[index];
            }

        }else{

            for(let i = 0; i < intContainerSize; i++){
                            
                arrFrames[i].style.opacity = "1";

            }

        }

    }
}


// jQuery syntax support
if(typeof jQuery === "function"){

    $.fn.extend({
        "gliba": function(arg){

            let objStandardizedConfig = GlibaConfig.standardize(arg);
            objStandardizedConfig.arrContainers = this.get();
            new Gliba(objStandardizedConfig, false);

        }
    })

}