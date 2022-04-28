// Pendma Surabaya
function doGet() {
  return HtmlService.createTemplateFromFile('DataTable')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}
function saveData(obj) {
  var folder = DriveApp.getFolderById("1M_xyFqj4uk-pbFIKkysAH8_QnDpgvhdE"); //Folder
  var file = ''
  if (obj.imagedata) {
    var datafile = Utilities.base64Decode(obj.imagedata)
    var blob = Utilities.newBlob(datafile, obj.filetype, obj.filename);
    file = folder.createFile(blob).getUrl()
  }
var bdate = obj.data4.split("-")
var thaiDate = LanguageApp.translate(Utilities.formatDate(new Date(bdate[0],parseInt(bdate[1])-1,parseInt(bdate[2])),'GMT+07:00','dd/MM/yyyy'),'en','id').split('-').map((a,i) =>{if(i != 2 || parseInt(a)>2100){return a}; a = parseInt(a)+0; return a}).join(' ')
  var rowData = [
    obj.data0,
    obj.data1,
    obj.data2,
    obj.data3,
    thaiDate,
    obj.data5,
   "'" + obj.data6,
    obj.data7,
    obj.data8,
    obj.data9,
    obj.data10,
    obj.data11,
    obj.data12,
    obj.data13,
    new Date(),
    file,
  ];
  SpreadsheetApp.getActive().getSheets()[0].appendRow(rowData);
  return true
}


/**  INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}



/**DataTable */
function getData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheets()[0]
  var range = sheet.getDataRange()
  var values = range.getDisplayValues()
  Logger.log(values)
  return values
}
