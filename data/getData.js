// This code is run in google apps script
// doGet gets run when sending a GET request to this url:
// https://script.google.com/macros/s/AKfycbzZWEKSn7vkZOJ7HdORB9oWHJdDOQVxNbEK04VTLLtN0Ff9omkC/exec
// database sheet can be found here: https://docs.google.com/spreadsheets/d/1UVqgmo5TxxebRt3ql0yYhGkGiuQWClRuF-PzyRzXizo/edit#gid=0

function doGet() {
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1UVqgmo5TxxebRt3ql0yYhGkGiuQWClRuF-PzyRzXizo/edit#gid=0");
    var sheet = ss.getSheetByName("cards");
    
    return getData(sheet);
    
  }
  
  function getData(sheet){
  
    var jo ={};
    var dataArray = [];
    var rows = sheet.getRange(2,1,sheet.getLastRow(), sheet.getLastColumn()).getValues();
    
    for(var i= 0, l = rows.length - 1; i < l ; i++){
      var dataRow = rows[i];
      var record = {};
      record["id"] = i
      record["name"] = dataRow[0]
      record["price"] = dataRow[1]
      record["priceString"] = dataRow[2]
      record["obligatory"] = dataRow[3]
      
      dataArray.push(record)
    }
  
    
    jo.data = dataArray;
    var result = JSON.stringify(jo)
    
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON)
    
  }