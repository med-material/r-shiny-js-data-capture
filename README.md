# r-shiny-js-data-capture
Data Capture System in Javascript, integrated into R Shiny


##  Working principle

This data capture module allows us to capture the events of our choice on any type of dashboard or website.
So with this module we capture 3 types of data:
- events (pointermove, pointerup/down, click, scroll...).
- continuous measurements, indeed every 16ms we capture the position of the pointer.
- meta data, here the goal is to record information at a "meta" level on the data being recorded.

These 3 types of data correspond to the 3 csv files that we will recover after each session.

## How to use it

- The first step is to include the "script.js" file in your project, which contains all the functions allowing us to capture the data.

### If you use an R dashboard

In the UI part of your dashboard:

- Include these 2 lines obligatorily:
```
useShinyjs(),
    includeScript(path = "script.js"),
```

-Then to capture continuous measurements, include these 2 lines:
```
tags$script("document.addEventListener('pointermove',function(event){ContinuousMeasurement(event)});"),
    tags$script("setInterval(frequence,16)"),
 ```
The "continuousMeasurement" function is already in the "script.js" file, it allows the capture of continuous measurements.
The "Frequence" function is already in the "script.js" file, it allows the capture of continuous measurements every 16ms.

- Regarding the capture of events:
You just have to call "addEventListener" with the name of the desired event like this:
```
tags$script("document.addEventListener('click',function(event){mouselog(event)});"),
```

The "mouselog" function is already in the "script.js" file, it allows the capture of events.

Here is an example covering all the previous points : 
```
shinyUI(fluidPage(
    includeCSS("custom.css"),
    useShinyjs(),
    includeScript(path = "script.js"),
    tags$script("document.addEventListener('pointermove',function(event){ContinuousMeasurement(event)});"),
    tags$script("setInterval(frequence,16)"),
    tags$script("document.addEventListener('pointerdown',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('pointerup',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('pointerover',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('pointerout',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('click',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('keypress',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('scroll',function(event){mouselog(event)});"),
    tags$script("document.addEventListener('gesturechange',function(event){mouselog(event)});"),
```

The last thing to do in the UI part is to create two buttons like this :
```
actionButton("btn_download", "Download CSV"),
    actionButton("btn_clear", "Clear"),
```

- The "btn_download" button allows you to download the 3 CSV files.
- The "btn_clear" button, allows you to reset the cached data capture made so far.

In the Server part of your dashboard:

- paste these two lines:
```
onclick("btn_download", runjs("stock_event+= logging_ended+','; Meta();Btn(stock_event,link_event,head_fields1);Btn(stock_frequence,link_continuous_measurment,head_fields2);Btn(stock_meta,link_meta,head_fields3)"))
  onclick("btn_clear", runjs("stock_event='';stock_continuous_measurement='';stock_frequence='';stock_meta=''"))
```

It just corresponds to the different actions when clicking the buttons.
For meta data, they are captured when pressing the download button with the meta() function call.

### If you use a website 

- The first step is to include the "script.js" file in your project, which contains all the functions allowing us to capture the data.
```
<script src="script.js"></script>
```
- To call the events, call them directly in your html
- Here is an example for the body:
```
<body id="example" onmouseover="mouselog(event)" onmouseout="mouselog(event)" onclick="mouselog(event)" onpointermove="ContinuousMeasurement(event)">
```
-Do the same for continuous measurements by calling the "pointermove" event with the "continuous measurement" function.
Like this :
```
onpointermove="ContinuousMeasurement(event)"
```
-Then you just have to create the 2 buttons as for the dashboard:
```
<input type="button" onclick="stock_event='';stock_continuous_measurement='';stock_frequence='';stock_meta=''" value="Clear">
  <input type="button" id="btn" onclick="stock_event+= logging_ended+','; Meta();Btn(stock_event,link_event,head_fields1);Btn(stock_frequence,link_continuous_measurment,head_fields2);Btn(stock_meta,link_meta,head_fields3)" value="download csv">
  ```

For meta data, they are captured when pressing the download button with the meta() function call.


## Composition of CSV files

### The events file

- Timestamp (in the format yyyy-mm-dd hh:mm:ss.mmm )
- SessionID (a unique ID for the session)
- DeviceID: a unique ID for the device.
- Event: Human-readable label of what the user is doing
- PointerID : ID of the pointer 
- PointerType : if it's a mouse, a touch etc...
- PointerHeight: The height of the pointer, it's useful for the touch screen.
- PointerWidth : The width of the pointer, it's usefil for the touch screen.
- PointerPressure: 3 levels, 0/0.5/1
- IsPrimary:  indicates whether or not the pointer device that created the event is the primary pointer
- Key : The keyboard key that is pressed during the keypress event
- Element:  the element where the event took place.
- Elementsfrompointname : The names of all the elements from the point 
- ElementsfrompointID : The IDs of all the elements from the point 
- Lastelementwithname : The name of the last element 
- LastelementwithID : The id of the last element
- ScreenX/Y: The position of the event on the screen
- SectionID: indication of on which page we are 
- sessionDuration: how much time has elapsed so far in the session.
- Email : default value anonymous
- Framecount : default value NA

### The continuous measurement file

- Timestamp (in the format yyyy-mm-dd hh:mm:ss.mmm )
- SessionID (a unique ID for the session)
- ScreenX/Y: The position on the screen of the pointer
- Elementsfrompointname : The names of all the elements from the point 
- ElementsfrompointID : The IDs of all the elements from the point 
- Lastelementwithname : The name of the last element 
- LastelementwithID : The id of the last element
- Email : default value anonymous
- Framecount : default value NA

### The meta file

- Timestamp (in the format yyyy-mm-dd hh:mm:ss.mmm )
- SessionID (a unique ID for the session)
- TargetSamplingRate: This column shows our goal of how often data should be logged per second by ContinuousMeasurement.
- MeasuredSamplingRate: This column shows how often data was actually recorded per second by ContinuousMeasurement.
- Duration: The duration of the session
- Email : default value anonymous
- Framecount : default value NA
