function mk_varsyml() {
  var
  ss = SpreadsheetApp.getActiveSpreadsheet(),
  sheet = ss.getSheets()[0],
  last_row = sheet.getLastRow(),
  output_data = 'path:\n';

  function Publish_data(row_num) {
    
    this.url = sheet.getRange(row_num, 4).getValue();
    
    this.title = sheet.getRange(row_num, 6).getValue().replace(/(\s\|\s.+.$)/, '');
    
    this.keyword = sheet.getRange(row_num, 7).getValue();
    
    this.description = sheet.getRange(row_num, 8).getValue();
    
    this.google_remarketing = function(){
      if(sheet.getRange(row_num, 10).getValue()) {
        return "1";
      } else {
        return;
      }
    };
    this.microad_blade = function(){
      var microad_blade_parameter = sheet.getRange(row_num, 11).getValue();
      if(microad_blade_parameter) {
        return microad_blade_parameter;
      } else {
        return;
      }
    };
    this.ogp_social = function(){
      if(sheet.getRange(row_num, 12).getValue()) {
        return "1";
      } else {
        return;
      }
    };
    this.social = function(){
      if(sheet.getRange(row_num, 13).getValue()) {
        return "1";
      } else {
        return;
      }
    };
    this.render = function() {
      var my_publish_data = "  "+this.url+":\n"+
        "    title: \""+this.title+"\"\n"+
        "    keyword: \""+this.keyword+"\"\n"+
        "    description: \""+this.description+"\"\n";

      if(this.google_remarketing()) {
        my_publish_data += "    google_remarketing: 1\n";
      }

      if(this.microad_blade()) {
        my_publish_data += "    microad_blade: \""+this.microad_blade()+"\"\n";
      }

      if(this.ogp_social()) {
        my_publish_data += "    ogp_social: 1\n";
      }

      if(this.social()) {
        my_publish_data += "    social: 1\n";
      }

      return my_publish_data;
    };
  }
  
  function looper() {
    for (var i = 2; i <= last_row; i++) {
      var publish_data = new Publish_data(i);
      Logger.log(i);
      Logger.log(publish_data.render());
      output_data += publish_data.render()
    }

    return output_data;
  
  }
  
  //ss.insertSheet(1);
  var output_range = ss.getSheetByName('Phest設定データ').getRange(1, 1);
  output_range.setValue(looper());

};