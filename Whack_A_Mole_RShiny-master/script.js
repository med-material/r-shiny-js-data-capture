var SessionID= Math.floor(Math.random() * 100);
let stock_event = new String();
let stock_continuous_measurement= new String();
let stock_frequence= new String();
let stock_meta = new String();
let event_value = new String();
let link_event= new String();
let link_continuous_measurment = new String();
let link_meta = new String();
let start_time = new Date();
let end_time = new Date();
let end_time_event = new Date();
let d = new Date();
let continuous_rows = new String();
let logging_ended = new String();
link_event = "log"+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.'+d.getMilliseconds()+"Event.csv";
link_continuous_measurment="log"+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.'+d.getMilliseconds()+"ContinuousMeasurement.csv";
link_meta = "log"+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.'+d.getMilliseconds()+"Meta.csv";
head_fields1=["Timestamp","SessionID","DeviceID","Event","Key","Element","elementsFromPointName","elementsFromPointID","LastElementWithName","LastElementWithIdentity","Screen-x","Screen-y","SectionID","SessionDuration","Email","Framecount"];
head_fields2=["Timestamp","SessionID","ScreenX","ScreenY","elementsFromPointName","elementsFromPointID","LastElementWithName","LastElementWithIdentity","Email","Framecount"];
head_fields3=["Timestamp","SessionID","TargetSamplingRate","MeasuredSamplingRate","Duration","Email","Framecount"];



function mouselog(event) 
{
      let d = new Date();
      let a;
      let b;
      var innerElementName= "";
      var innerElementID = "";
      end_time_event=d.getFullYear()+"-"+ (d.getUTCMonth()+1) +"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+':'+d.getMilliseconds();
      date1 = new Date(start_time);
      date2 = new Date(end_time_event);
      tmp = ((date2 - date1)/1000);
      logging_ended ='{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"logging_ended","Key":"null","Element":"null","elementsFromPointName":"null","elementsFromPointID":"null","LastElementWithName":"null","LastElementWithIdentity":"null","ScreenX":"null","ScreenY":"null","SectionID":"'+window.location.href+'","SessionDuration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}';
      
if(stock_event=="")
{
  var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"logging_started","Key":"null","Element":"null","elementsFromPointName":"null","elementsFromPointID":"null","LastElementWithName":"null","LastElementWithIdentity":"null","ScreenX":"null","ScreenY":"null","SectionID":"'+window.location.href+'","SessionDuration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}'; 
  stock_event += data+",";
}
if(event.type=="keypress")
{
   var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"'+event.type+'","Key":"'+event.key+'","Element":"null","elementsFromPointName":"null","elementsFromPointID":"null","LastElementWithName":"null","LastElementWithIdentity":"null","ScreenX":"null","ScreenY":"null","SectionID":"'+window.location.href+'","SessionDuration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}'; 
     stock_event += data+",";
}
else if(event.type=="wheel")
{
     if (document.elementsFromPoint) {
  let elements = document.elementsFromPoint(event.pageX, event.pageY);
  elements.forEach((elt, i) => {
    a += elt.id;
    b += elt.localName;
    if (i < elements.length - 1) {
      a += " < ";
      b += " < ";
      if (innerElementID == "" & elt.id != "" & elt.id != "undefined") {
    innerElementID = elt.id}
    if (innerElementName == "" & elt.id != "" & elt.id != "undefined") {
    innerElementName = elt.localName}
    }
  });
}
  if(event.deltaY > 0)
  {
     var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"wheelDown","Key":"null","Element":"'+event.target.id+'","elementsFromPointName":"'+b+'","elementsFromPointID":"'+a+'","LastElementWithName":"'+innerElementName+'","LastElementWithIdentity":"'+innerElementID+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","SectionID":"'+window.location.href+'","SessionDuration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}'; 
     stock_event += data+",";
  }
  else if(event.deltaY < 0)
  {
    var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"wheelup","Key":"null","Element":"'+event.target.id+'","elementsFromPointName":"'+b+'","elementsFromPointID":"'+a+'","LastElementWithName":"'+innerElementName+'","LastElementWithIdentity":"'+innerElementID+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","SectionID":"'+window.location.href+'","SessionDuration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}'; 
    stock_event += data+",";
  }
}
else
{
     if (document.elementsFromPoint) {
  let elements = document.elementsFromPoint(event.pageX, event.pageY);
  elements.forEach((elt, i) => {
    a += elt.id;
    b += elt.localName;
    if (i < elements.length - 1) {
      a += " < ";
      b += " < ";
      if (innerElementID == "" & elt.id != "" & elt.id != "undefined") {
    innerElementID = elt.id}
    if (innerElementName == "" & elt.id != "" & elt.id != "undefined") {
    innerElementName = elt.localName}
    }
  });
}
   var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","DeviceID":"'+getMachineId()+'","Event":"'+event.type+'","Key":"null","Element":"'+event.target.id+'","elementsFromPointName":"'+b+'","elementsFromPointID":"'+a+'","LastElementWithName":"'+innerElementName+'","LastElementWithIdentity":"'+innerElementID+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","SectionID":"'+window.location.href+'","SessionDuration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}'; 
   stock_event += data+",";
}


      
}
  
function JSON2CSV(objArray, head_field) 
{
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';

     var csvStr = head_field.join(";") + "\n";

    if(head_field==head_fields1){
      
      objArray.forEach(element => {
        Timestamp = element.Timestamp;
        SessionID = element.SessionID;
        DeviceID = element.DeviceID;
        Event= element.Event;
        Key= element.Key;
        Element=element.Element;
        elementsFromPointName=element.elementsFromPointName;
        elementsFromPointID=element.elementsFromPointID;
        LastElementWithName=element.LastElementWithName;
        LastElementWithIdentity=element.LastElementWithIdentity;
        ScreenX=element.ScreenX;
        ScreenY=element.ScreenY;
        SectionID=element.SectionID;
        SessionDuration=element.SessionDuration;
        Email=element.Email;
        Framecount=element.Framecount;
    
            csvStr +=Timestamp + ';' + SessionID + ';' + DeviceID + ';' + Event + ';'  + Key + ';' + Element + ';'+ elementsFromPointName + ';'+ elementsFromPointID + ';'+ LastElementWithName + ';' + LastElementWithIdentity + ';' + ScreenX + ';' + ScreenY + ';' + SectionID + ';' + SessionDuration + ';' + Email +';' + Framecount +"\n";
    })}
    else if(head_field==head_fields2)
    {
      objArray.forEach(element => {
        Timestamp = element.Timestamp;
        SessionID = element.SessionID;
        ScreenX=element.ScreenX;
        ScreenY=element.ScreenY;
        elementsFromPointName=element.elementsFromPointName;
        elementsFromPointID=element.elementsFromPointID;
        LastElementWithName=element.LastElementWithName;
        LastElementWithIdentity=element.LastElementWithIdentity;
        Email=element.Email;
        Framecount=element.Framecount;
    
            csvStr +=Timestamp + ';' + SessionID + ';' + ScreenX + ';' + ScreenY + ';'+ elementsFromPointName + ';'+ elementsFromPointID + ';'+ LastElementWithName + ';'+ LastElementWithIdentity + ';' + Email +';' + Framecount +"\n";
    })}
    else
    {
      objArray.forEach(element => {
        Timestamp = element.Timestamp;
        SessionID = element.SessionID;
        TargetSamplingRate= element.TargetSamplingRate;
        MeasuredSamplingRate= element.MeasuredSamplingRate;
        Duration=element.Duration;
        Email=element.Email;
        Framecount=element.Framecount;
    
            csvStr +=Timestamp + ';' + SessionID + ';' + TargetSamplingRate + ';'+ MeasuredSamplingRate + ';'+ Duration + ';'+ Email +';' + Framecount +"\n";
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
        let a;
        let b;
        var innerElementName_continuous = "";
        var innerElementID_continuous = "";
      if (document.elementsFromPoint) {
  let elements = document.elementsFromPoint(event.pageX, event.pageY);
  elements.forEach((elt, i) => {
    a += elt.id;
    b += elt.localName;
    if (i < elements.length - 1) {
      a += " < ";
      b += " < ";
       if (innerElementID_continuous == "" & elt.id != "" & elt.id != "undefined") {
    innerElementID_continuous = elt.id}
     if (innerElementName_continuous == "" & elt.id != "" & elt.id != "undefined") {
    innerElementName_continuous = elt.localName}
    }
  });
}
    var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","elementsFromPointName":"'+b+'","elementsFromPointID":"'+a+'","LastElementWithName":"'+innerElementName_continuous+'","LastElementWithIdentity":"'+innerElementID_continuous+'","Email":"anonymous","Framecount":"NA"}'; 
    stock_continuous_measurement = data;

  end_time=d.getFullYear()+"-"+ (d.getUTCMonth()+1) +"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+':'+d.getMilliseconds();
    
}
function frequence()
{
  if(stock_continuous_measurement!="")
  {
      stock_frequence+= stock_continuous_measurement+",";
        continuous_rows=(continuous_rows)*1+1;
        if(stock_frequence!="")
        {
           start_time=d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();
        }
        
  }
}
function Meta()
{
date1 = new Date(start_time);
date2 = new Date(end_time);
tmp = (date2 - date1)/1000;
var sample_rate=continuous_rows/tmp;   
let d = new Date();
  var data = '{"Timestamp":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+SessionID+'","TargetSamplingRate":"60","MeasuredSamplingRate":"'+sample_rate+'","Duration":"'+tmp+'","Email":"anonymous","Framecount":"NA"}'; 
  stock_meta += data+",";
}
