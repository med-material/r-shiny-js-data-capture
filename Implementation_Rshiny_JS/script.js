var SessionID= Math.floor(Math.random() * 100);
let stock_event = new String();
let stock_continuous_measurement= new String();
let event_value = new String();
let link_event= new String();
let link_continuous_measurment = new String();
let d = new Date();
link_event = "log"+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.'+d.getMilliseconds()+"Event.csv";
link_continuous_measurment="log"+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.'+d.getMilliseconds()+"ContinuousMeasurement.csv";

head_fileds=["Timestamp","SessionID","DeviceID","Event","Element","Screen-x","Screen-y","SectionID","SessionDuration","Email","Framecount"];
head_fields2=["Timestamp","SessionID","ScreenX","ScreenY","Email","Framecount"];


function mouselog(event) 
  {
      let d = new Date();
      var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"'+event.type+'","Element":"'+event.target.id+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","SectionID":"'+window.location.href+'","SessionDuration":"'+d.getTime()+'","Email":"anonymous","Framecount":"NA"}'; 
      stock_event += data+",";
      console.log(data);
  }
  
function JSON2CSV(objArray, head_field) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';

     var csvStr = head_field.join(";") + "\n";

    if(head_field==head_fileds){
      
      objArray.forEach(element => {
        Timestamp = element.Timestamp;
        SessionID = element.SessionID;
        DeviceID = element.DeviceID;
        Event= element.Event;
        Element=element.Element;
        ScreenX=element.ScreenX;
        ScreenY=element.ScreenY;
        SectionID=element.SectionID;
        SessionDuration=element.SessionDuration;
        Email=element.Email;
        Framecount=element.Framecount;
    
            csvStr +=Timestamp + ';' + SessionID + ';' + DeviceID + ';' + Event + ';' + Element + ';' + ScreenX + ';' + ScreenY + ';' + SectionID + ';' + SessionDuration + ';' + Email +';' + Framecount +"\n";
    })}
    else
    {
      objArray.forEach(element => {
        Timestamp = element.Timestamp;
        SessionID = element.SessionID;
        ScreenX=element.ScreenX;
        ScreenY=element.ScreenY;
        Email=element.Email;
        Framecount=element.Framecount;
    
            csvStr +=Timestamp + ';' + SessionID + ';' + ScreenX + ';' + ScreenY + ';' + Email +';' + Framecount +"\n";
    })}
    return csvStr;

}

function Btn(val,link, fields)
{
    var a= val.slice(0, -1);
    var b= "["+a+"]";
    var d= new Date();
        var json=$.parseJSON(b);
        var csv = JSON2CSV(json,fields);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
  
        downloadLink.href = url;
        downloadLink.download = link ;
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
}

function getMachineId() 
{
    
    let machineId = localStorage.getItem('MachineId');
    
    if (!machineId) {
        machineId = crypto.randomUUID();
        localStorage.setItem('MachineId', machineId);
    }

    return machineId;
}
 
function ContinuousMeasurement(event)
{
  let d = new Date();
    var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","Email":"anonymous","Framecount":"NA"}'; 
    stock_continuous_measurement += data+",";
  
}