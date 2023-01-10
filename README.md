# Gliba.js Quick Tutorial
***
## 1 Description
Gliba.js is a front-end beautification library that creates dynamic background effects for webpage elements. Supporting both plain JavaScript syntax and jQuery syntax, it is incredibly easy to use. To apply it, all you need to know is only one function: `Gliba.initialize()`. Or, for jQuery, `$(Selector).gliba()`. The free combination of multiple optional parameters provides rich possibilities for customizing unique effects. In this quick tutorial, you will learn everything about this library.
***
## 2 Official Website
[Gliba.js | Cena Lab https://lab.cena.cool/gliba/](https://lab.cena.cool/gliba/)
***
## 3 Basic Usage
Like other libraries of this type, the very first step is to insert the script tag of Gliba.js into the head of your HTML document.
``` HTML
<html>
	<head>
        <!-- some other head tags -->
        <!-- for jQuery syntax, it is a good practice to import Gliba.js after jQuery -->
		<script type="text/javascript" src="Your path to access Gliba.js"></script>
	</head>
    <!-- body -->
</html>
```
The library is now imported. You can call Gliba.initialize() method to apply its effect. This JavaScript fragment could generally be inserted at the end of the body. As shown below, the simpliest way to use this method is to pass an array of strings containing paths to background images into it.
``` JavaScript
Gliba.initialize(
    ["image url 1", "image url 2", ..., "image url n"]
);
```
You might have noticed that the HTML element is not specified in the above statement. In this case, the effect will be applied to body. Therefore, for jQuery lovers, it is easy to understand that the following statement can achieve the same result.
``` JavaScript
$("body").gliba(
    ["image url 1", "image url 2", ..., "image url n"]
);
```
***
## 4 Advanced Usage
Instead of passing an array into the method, you can also pass a config object. The example of an complete configuration is shown below. Note that the properties inside, except "resource", are optional so that you can choose which ones to include, and the rest will be automatically set to "default".
``` JavaScript
Gliba.initialize(
    {
        "resource": [],
        "container": document.body,
        "direction": "both",
        "speed": "1.8s",
        "amplitude": 5,
        "depth": 5,
        "reverse": false,
        "rebound": true,
        "preload": true
    }
);
```
For jQuery, there is no "container" property in the config object since it is specified through the jQuery selector.
``` JavaScript
$(selector).gliba(
    {
        "resource": [],
        "direction": "both",
        "speed": "1.8s",
        "amplitude": 5,
        "depth": 5,
        "reverse": false,
        "rebound": true,
        "preload": true
    }
);
```
In the following subsections, the properties will be explained in detail.
### 4.1 Property: resource
"resource" is the only required property for the config object. It could be the most complicated property as well. Despite the value is always an array, the elements of the resource array could be arrays, strings, image objects, or a even more complex combination of them. All this will be clear by understanding the following examples.

The first example looks almost the same as what we did in section 3. The background will have 4 layers. Each layer has 1 image, specified by the path provided as a string.
``` JavaScript
// a resource array with a simple and practical structure
Gliba.initialize(
    {
        "resource": [
                        "image url 1",
                        "image url 2",
                        "image url 3",
                        "image url 4"
                    ]
    }
)
```
In some scenarios, we may want to customize the blend mode of these images. The image object is thus introduced. Based on the above example, the following code specified the blend mode of the 1st and the 4th image. The former is set to "normal" while the latter is set to "color-dodge".
``` JavaScript
// a resource array with the blend mode of the 1st and 4th images customized
Gliba.initialize(
    {
        "resource": [
                        {
                            "url": "image url 1",
                            "blendMode": "normal"
                        },
                        "image url 2",
                        "image url 3",
                        {
                            "url": "image url 4",
                            "blendMode": "color-dodge"
                        }
                    ]
    }
)
```
In other scenarios, we may want to create even more gorgeous background so that we hope to use multiple images to composite a single layer. This can be easily achived by including image resources of the same layer into an array. As shown below, the 1st and 2nd images together form the first layer.
``` JavaScript
// a resource array with a complex structure
Gliba.initialize(
    {
        "resource": [
                        [
                            {
                                "url": "image url 1",
                                "blendMode": "normal"
                            },
                            "image url 2"
                        ],
                        "image url 3",
                        {
                            "url": "image url 4",
                            "blendMode": "color-dodge"
                        }
                    ]
    }
)
```
Now it is already a very complex resource. Looking back at section 3, if other properties are not specified, the above config object can be simplified as the following format.
``` JavaScript
// the config object can be omitted if only resources are provided
Gliba.initialize(
    [
        [
            {
                "url": "image url 1",
                "blendMode": "normal"
            },
            "image url 2"
        ],
        "image url 3",
        {
            "url": "image url 4",
            "blendMode": "color-dodge"
        }
    ]
)
```
### 4.2 Property: container
This property specifies which element the background applies to. It takes either an HTMLElement or an HTMLElementCollection as the value.
``` JavaScript
// the background effect applies to a single element
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("myid")
    }
)
```
``` JavaScript
// the background effect applies to every "myclass" element.
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementsByClassName("myclass")
    }
)
```
As mentioned before, this property is redundant for jQuery. 
``` JavaScript
// jQuery syntax
$(selector).gliba(
    {
        "resource": []
    }
)
```
### 4.3 Property: direction
This property specifies on which axis the background is sensitive to mouse movement. The value it takes can be "horizontal", "vertical", or "both".
``` JavaScript
// the background is allowed to move horizontally
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("direction_horizontal"),
        "direction": "horizontal"
    }
);
```
``` JavaScript
// the background is allowed to move vertically
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("direction_vertical"),
        "direction": "vertical"
    }
);
```
``` JavaScript
// the background is allowed to move in both dimensions
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("direction_both"),
        "direction": "both"
    }
);
```
### 4.4 Property: speed
This property specifies the time it takes for the background to move to its new resting position. When using this property, please include the unit of time measurement in the value.
``` JavaScript
// specify the speed using seconds 
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("speed_3s"),
        "speed": "3s"
    }
);
```
``` JavaScript
// specify the speed using milliseconds 
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("speed_600ms"),
        "speed": "600ms"
    }
);
```
### 4.5 Property: amplitude
This property indicates the amount of movement of the background. It takes values of type number from 1 to 9. A larger number represents greater movement.
``` JavaScript
// a background with minimum amplitude
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("amplitude_min"),
        "amplitude": 1
    }
);
```
``` JavaScript
// a background with maximum amplitude
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("amplitude_max"),
        "amplitude": 9
    }
);
```
### 4.6 Property: depth
This property also affects the movement range. However, different from "amplitude", "depth" simulates the distance between background layers. It also takes values of type number from 1 to 9. A larger number represents greater movement.
``` JavaScript
// a background with minimum depth
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("depth_min"),
        "depth": 1
    }
);
```
``` JavaScript
// a background with maximum depth
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("depth_max"),
        "depth": 9
    }
);
```
### 4.7 Property: reverse
This property takes a boolean value to determine whether to move in the same or the opposite direction as the cursor. Contrary to conventional ideas, the examples below demonstrates some interesting effects that could be created with this property.
``` JavaScript
// a background that is not reversed
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("reverse_false"),
        "reverse": false
    }
);
```
``` JavaScript
// a background that is reversed
Gliba.initialize(
    {
        "resource": [],
        "container": document.getElementById("reverse_true"),
        "reverse": true
    }
);
```
### 4.8 Property: rebound
This property determines whether the background bounces back to its original position when the mouse cursor leaves the element. It takes a boolean value.
``` JavaScript
// a background that won't rebound
Gliba.initialize{
    {
        "resource": [],
        "container": document.getElementById("rebound_false"),
        "rebound": false
    }
}
```
``` JavaScript
// a background that can rebound
Gliba.initialize{
    {
        "resource": [],
        "container": document.getElementById("rebound_true"),
        "rebound": true
    }
}
```
### 4.9 Property: preload
This property accepts a boolean value to determines whether to show the background after all the resources has been loaded. Generally it is not recommended to change this property since it may cause unsafe background display process when resources are being loaded if the value is set to false.
``` JavaScript
// preloading disabled
Gliba.initialize{
    {
        "resource": [],
        "preload": false
    }
}
```