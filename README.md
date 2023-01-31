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
![image](https://user-images.githubusercontent.com/73820951/215494126-db4da265-54a7-4c75-aa6a-8aaaf36198d1.png)

-Then to capture continuous measurements, include these 2 lines:![image](https://user-images.githubusercontent.com/73820951/215494458-13ba8811-e980-48ef-bd60-f9b8bcf904d5.png)
The "continuousMeasurement" function is already in the "script.js" file, it allows the capture of continuous measurements.
The "Frequence" function is already in the "script.js" file, it allows the capture of continuous measurements every 16ms.

- Regarding the capture of events:
You just have to call "addEventListener" with the name of the desired event like this:![image](https://user-images.githubusercontent.com/73820951/215495276-d59e6800-2dbb-44a5-b8d4-c7637d17d499.png)
The "mouselog" function is already in the "script.js" file, it allows the capture of events.

Here is an example covering all the previous points : 
![image](https://user-images.githubusercontent.com/73820951/215496394-633b807f-3fd9-4d1d-bf81-a627f44056b2.png)

The last thing to do in the UI part is to create two buttons like this :![image](https://user-images.githubusercontent.com/73820951/215496714-e44d996e-2276-41fa-803f-84ca23701761.png)
- The "btn_download" button allows you to download the 3 CSV files.
- The "btn_clear" button, allows you to reset the cached data capture made so far.

In the Server part of your dashboard:

- paste these two lines:
![image](https://user-images.githubusercontent.com/73820951/215500011-74ec43a3-247c-4d22-b9d6-738a2a4b938f.png)
onclick("btn_download", runjs("stock_event+= logging_ended+','; Meta();Btn(stock_event,link_event,head_fields1);Btn(stock_frequence,link_continuous_measurment,head_fields2);Btn(stock_meta,link_meta,head_fields3)"))
onclick("btn_clear", runjs("stock_event='';stock_continuous_measurement='';stock_frequence='';stock_meta=''"))

It just corresponds to the different actions when clicking the buttons.
For meta data, they are captured when pressing the download button with the meta() function call.

### If you use a website 

- The first step is to include the "script.js" file in your project, which contains all the functions allowing us to capture the data.
<script src="script.js"></script>

- To call the events, call them directly in your html
- Here is an example for the body:![image](https://user-images.githubusercontent.com/73820951/215759936-73dbf0d6-4db8-434e-b696-f266811f4455.png)

-Do the same for continuous measurements by calling the "pointermove" event with the "continuous measurement" function.
Like this :
![image](https://user-images.githubusercontent.com/73820951/215760436-7620164b-932e-40ac-8a67-8c949f6c821e.png)

-Then you just have to create the 2 buttons as for the dashboard:
- ![image](https://user-images.githubusercontent.com/73820951/215761431-7f6f81bb-2a0b-480e-9460-eca5b369c628.png)

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
