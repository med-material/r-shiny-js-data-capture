
function mouselog(event) {
    let d = new Date();
    var data = '{"Date":"'+d.getFullYear()+'-'+ (d.getUTCMonth()+1) +'-'+d.getUTCDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.'+d.getMilliseconds()+'", "SessionID":"'+Math.floor(Math.random() * 100)+'","DeviceID":"'+getMachineId()+'","Event":"'+event.type+'","Element":"'+event.target.id+'","ScreenX":"'+event.pageX+'","ScreenY":"'+event.pageY+'","SectionID":"'+window.location.href+'","SessionDuration":"'+d.getTime()+'"}'; 
    text.value += data+",";
    text.scrollTop = text.scrollHeight;
  }
  function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';
    head_fileds=["Date","SessionID","DeviceID","Event","Element","Screen-x","Screen-y","SectionID","SessionDuration"];

    var csvStr = head_fileds.join(",") + "\n";

    objArray.forEach(element => {
        Date = element.Date;
        SessionID = element.SessionID;
        DeviceID = element.DeviceID;
        Event= element.Event;
        Element=element.Element;
        ScreenX=element.ScreenX;
        ScreenY=element.ScreenY;
        SectionID=element.SectionID;
        SessionDuration=element.SessionDuration;
        
    
            csvStr += Date + ',' + SessionID + ',' + DeviceID + ',' + Event + ',' + Element + ',' + ScreenX + ',' + ScreenY + ',' + SectionID + ',' + SessionDuration + "\n";
    })
    return csvStr;
}
function btn()
{
    var a= text.value.slice(0, -1);
    var b= "["+a+"]";
    text.value=b;
        var json=$.parseJSON(b);
        console.log(json);
        var csv = JSON2CSV(json);
        console.log(csv);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
  
        downloadLink.href = url;
        downloadLink.download = "data.csv";
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        ;
}
function getMachineId() {
    
    let machineId = localStorage.getItem('MachineId');
    
    if (!machineId) {
        machineId = crypto.randomUUID();
        localStorage.setItem('MachineId', machineId);
    }

    return machineId;
}