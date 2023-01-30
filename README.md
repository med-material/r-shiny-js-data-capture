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
The "Frequency" function is already in the "script.js" file, it allows the capture of continuous measurements every 16ms.

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

