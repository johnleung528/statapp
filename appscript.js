function prepare_process(request) {
  var leader = Session.getActiveUser().getEmail();
  var event_id=request.parameter["e_id"];
  var approve;
  var message;
  if(request.parameter["approve"]=="true"){
    approve = true;
    message = "<html><body>LDHR has received your reply - APPROVE.<br>We will continue to process this application. Thank you!</body></html>";
  }else{
    approve = false;
    message = "<html><body>LDHR has received your reply - DISAPPROVE.<br>We will stop proccessing and inform the applicant. Thank you!</body></html>";
  }
  var response = request_handler(leader,approve,event_id);


  if(response["success"]){
    response["message"] = message;
  }else{
    response["message"] = "<html><body>Cannot change the status of leave<br>"+response["message"]+"</body></html>";
  }

  return response;
}

function make_approval_decision(approve_object,leader_mail,approve){
  check_string = approve_object['admin'].toString();
  if((check_string.indexOf(leader_mail) > -1)&&(check_string.indexOf("approve")<0)){

    if(approve){
      approve_object['admin']=leader_mail+'<approve>';
    }else{
      approve_object['admin']=leader_mail+'<disapprove>';
    }

  }

  check_string = approve_object['dir'].toString();
  if((check_string.indexOf(leader_mail) > -1)&&(check_string.indexOf("approve")<0)){

    if(approve){
      approve_object['dir']=leader_mail+'<approve>';
    }else{
      approve_object['dir']=leader_mail+'<disapprove>';
    }

  }

  check_string = approve_object['mcc'].toString();
  if((check_string.indexOf(leader_mail) > -1)&&(check_string.indexOf("approve")<0)){

    if(approve){
      approve_object['mcc']=leader_mail+'<approve>';
    }else{
      approve_object['mcc']=leader_mail+'<disapprove>';
    }

  }

  check_string = approve_object['nat'].toString();
  if((check_string.indexOf(leader_mail) > -1)&&(check_string.indexOf("approve")<0)){

    if(approve){
      approve_object['nat']=leader_mail+'<approve>';
    }else{
      approve_object['nat']=leader_mail+'<disapprove>';
    }

  }

  check_string = approve_object['ldhr'].toString();
  if((check_string.indexOf(leader_mail) > -1)&&(check_string.indexOf("approve")<0)){

    if(approve){
      approve_object['ldhr']=leader_mail+'<approve>';
    }else{
      approve_object['ldhr']=leader_mail+'<disapprove>';
    }

  }

  return approve_object;
}

function enough_remain_day(type_of_leave,number_of_days,target_staff_email,ministry_year){

  if(ministry_year==leave_library.get_current_ministry_year()){
    token = leave_library.this_year_token;
  }

  if(ministry_year==leave_library.get_last_ministry_year()){
    token = leave_library.last_year_token;
  }

  if(ministry_year==leave_library.get_next_ministry_year()){
    token = leave_library.next_year_token;
  }


  number_of_days = parseFloat(number_of_days);

  var result={};
  result["success"]=true;
  result["message"]="";
  var short_form_of_leave = leave_library.find_index_of_object(leave_library.display_leave_type_in_calender, type_of_leave);

  if(short_form_of_leave==null){
    throw("Error! No this type of leave:"+type_of_leave);
  }
  //Logger.log(short_form_of_leave);
  var remain_leave = leave_library.get_leave_remain(target_staff_email,leave_library.get_current_ministry_year());
  var remain_leave_of_type;

  switch (short_form_of_leave) {
    case leave_library.leave_type_short_form_collection[leave_library.annual_leave_option]:
      //AL
      var this_remain_leave_of_type = parseFloat(remain_leave[leave_library.this_year_leave_type_in_header[short_form_of_leave]]);
      var next_remain_leave_of_type = parseFloat(remain_leave[leave_library.next_year_leave_type_in_header[short_form_of_leave]]);
      if(token==leave_library.this_year_token||token==leave_library.last_year_token){
        //this year
        if(next_remain_leave_of_type>0){
          //no leave is occupied for next year
          remain_leave_of_type = this_remain_leave_of_type;
        }else{
          //leave is occupied for next year
          remain_leave_of_type = this_remain_leave_of_type + next_remain_leave_of_type;
        }
      }else{
        //next year
        if(this_remain_leave_of_type>10){
          this_remain_leave_of_type = 10;
        }

        remain_leave_of_type = this_remain_leave_of_type + next_remain_leave_of_type;
      }
      break;
    case leave_library.leave_type_short_form_collection[leave_library.sick_leave_option]:
      //SL

      var this_remain_leave_of_type = parseFloat(remain_leave[leave_library.this_year_leave_type_in_header[short_form_of_leave]]);
      var next_remain_leave_of_type = parseFloat(remain_leave[leave_library.next_year_leave_type_in_header[short_form_of_leave]]);
      if(token==leave_library.this_year_token||token==leave_library.last_year_token){
        //this year
        if(next_remain_leave_of_type>0){
          //no leave is occupied for next year
          remain_leave_of_type = this_remain_leave_of_type;
        }else{
          //leave is occupied for next year
          remain_leave_of_type = this_remain_leave_of_type + next_remain_leave_of_type;
        }
      }else{
        if(this_remain_leave_of_type>120){
          this_remain_leave_of_type = 120;
        }

        remain_leave_of_type = this_remain_leave_of_type + next_remain_leave_of_type;
      }

      break;
    default:
      //others
      if(token==leave_library.this_year_token||token==leave_library.last_year_token){
        remain_leave_of_type = parseFloat(remain_leave[leave_library.this_year_leave_type_in_header[short_form_of_leave]]);
      }else{
        remain_leave_of_type = parseFloat(remain_leave[leave_library.next_year_leave_type_in_header[short_form_of_leave]]);
      }
  }

  Logger.log(remain_leave_of_type);
  var result = true;
  if(number_of_days>remain_leave_of_type){
    result = false;
  }

  Logger.log(result);

  return result;
}

function change_record_in_database(target_id,token,row, ministry_year,event_series){
  try{
    var result={};


    //get staff information
    var leave_database_spreadsheet = SpreadsheetApp.openById(leave_library.get_leave_database_spreadsheet_id(ministry_year));

    var leave_status_sheet   = leave_database_spreadsheet.getSheetByName(leave_library.leave_status_sheet_name); // select the staff information sheet
    var headers = leave_status_sheet.getRange(1, 1, 1, leave_status_sheet.getLastColumn()).getValues()[0];
    var head_index_object = leave_library.find_index_for_each_header(headers, leave_library.leave_status_sheet_header);
    Logger.log(head_index_object);

    var check_result = leave_library.check_index_for_each_header(head_index_object);

    if(!check_result["success"]){
      throw(check_result["message"]+'" in sheet: "'+leave_library.current_leave_number_sheet_name+'"');
    }


    var id_in_sheet= leave_status_sheet.getRange(row, head_index_object[leave_library.leave_id_column_name]).getValue();

    var target_record_row=-1;

    if(target_id==id_in_sheet){

      target_record_row=row;
    }else{
      //2 to avoid header
      var id_column_content = leave_status_sheet.getRange(2, head_index_object[leave_library.leave_id_column_name], leave_status_sheet.getLastRow(), 1).getValues();



      for(var i = 0; i < id_column_content.length; i++){
        if(id_column_content[i][0]==target_id){
          target_record_row = i+2;// avoid header and the array start from 0, so add 2
          break;
        }
      }

      if(target_record_row==-1){
        //throw('Cannot find E-mail: "'+target_id+'" in sheet: "'+leave_library.leave_status_sheet_name+'"');

        var detail = JSON.parse(event_series.getDescription());
        var record_object={};
        record_object[leave_library.email_in_staff_information_sheet]=detail['target_staff_email'];
        record_object[leave_library.leave_id_column_name]=target_id;
        record_object[leave_library.type_of_leave_column_name]=detail['mail_detail_content']['type_of_leave'];
        record_object[leave_library.number_of_days_column_name]=detail['mail_detail_content']['number_of_days'];
        record_object[leave_library.status_column_name]=token;
        var year=leave_library.this_year_token;
        if(target_id.indexOf("L") !== -1){
          year = leave_library.last_year_token;
        }

        if(target_id.indexOf("N") !== -1){
          year = leave_library.next_year_token;
        }


        record_object[leave_library.year_column_name]=year;
        record_object[leave_library.remarks_column_name]="";
        var response = leave_library.add_record_to_database(record_object,ministry_year);
        if(!response['success']){
          throw(response['message']);
        }
        var row = response['row'];
        detail['row'] = row;
        event_series.setDescription(JSON.stringify(detail));
      }
    }




    leave_status_sheet.getRange(target_record_row ,head_index_object[leave_library.status_column_name]).setValue(token);




    result['success']=true;
    return result;

  }catch(error){
    var result={};
    result['success']=false;
    result['message']=error;

    Logger.log(error);
    return result;

  }

}

function request_handler(leader,approve,event_id){

  try{
    /*
    var leader = "leave.record@hkccc.org";
    var approve = true;
    var event_id="bkcn7iuq1ef9crfq5dg6if668g@google.com";*/



    var calenders = CalendarApp.getCalendarsByName(leave_library.pending_calendar_name);
    if(calenders.length==0){
      throw("No Pending Calendar");
    }

    var pending_calendar = calenders[0];

    calenders = CalendarApp.getCalendarsByName(leave_library.finsih_calendar_name);
    if(calenders.length==0){
      throw("No Finish Calendar");
    }

    var finsih_calendar = calenders[0];

    var event_series = pending_calendar.getEventSeriesById(event_id);

    if(event_series==null){
      throw("the process is finished.");
    }

    if(event_series.getTag("delete")==1){
      throw("The process is finished.");
    }

    Logger.log(event_series.getDescription());
    Logger.log("Hi! before ministry year");

    var description = JSON.parse(event_series.getDescription());
    if(description['admin_approve']!=""){
      throw("The process is finished.");
    }



    var ministry_year = description['ministry_year'];
    var start_date = description['event_detail']['start_date'];
    var target_ministry_year = leave_library.get_ministry_year_from_date(start_date);
    var id = description['leave_id'];
    var approve_object = description['approval_object'];
    var row = description['row'];
    try{
      logcat(ministry_year,leader,id);
    }catch(error){

    }


    var enough = enough_remain_day(description['mail_detail_content']['type_of_leave'],description['mail_detail_content']['number_of_days'],description['target_staff_email'],target_ministry_year);

    if(enough){
      description['approval_object'] = make_approval_decision(approve_object, leader, approve);



      var today = new Date();
      var remind_date= new Date();
      remind_date.setDate(today.getDate() + 7);
      var remind_date_string = remind_date.toString();
      description['remind_date_string']=remind_date_string;
      Logger.log(description);
      event_series.setDescription(JSON.stringify(description));
      var check_result = leave_library.check_all_leader_approval(approve_object);
      var to_address="";
      if(approve){
        //<approve>
        //check if this leave application is processed by every leaders or not
        if(!check_result['all_approve']){
          //not all approve
          //send the approval e-mail to next leader
          to_address = description['approval_object'][check_result['next']];
          var subject_prefix="";
          if(check_result['next']=="ldhr"){
            subject_prefix="[LDHR Approval] ";
          }

          Logger.log(to_address);
          var mai_detail_content = description['mail_detail_content'];
          mai_detail_content["admin_info"] = "";
          var html_content = leave_library.get_leaders_mail_template(mai_detail_content);


          var mail_response = leave_library.send_mail( html_content ,subject_prefix+'Leave Application: '+description['mail_detail_content']['applicatant']+' (ID:'+id+')', to_address);

          if(!mail_response['success']){
            throw("Cannot send to :"+to_address+" due to "+mail_response['message']);
        }

          Logger.log(html_content);

        }else{
          //all approve
          follow_up_work_of_approval(id, approve, description, event_series, finsih_calendar,row, ministry_year,leader);




        }


      }else{
        //disapprove

        follow_up_work_of_approval(id, approve, description, event_series, finsih_calendar,row, ministry_year,leader);


      }
    }else{
      throw("根據記錄顯示，所剩假期數目不足以接納是次申請，請 Disapprove 是次申請。");
    }









    var result={};
    result["success"] = true;
    return result;

  }catch(error){
    Logger.log(error);
    var result={};
    result["success"] = false;
    result["message"] = error;
    return result;
  }




}

function follow_up_work_of_approval(id, approve, description, event_series, finsih_calendar,row,ministry_year,leader){
  var token;
  if(approve){
    token = leave_library.approve_status_token;
  }else{
    token = leave_library.disapprove_status_token;
  }

  //change record
  var response = leave_library.change_record_in_database(id, token,row,ministry_year,"",event_series);
  if(!response['success']){
    throw(response['message']);
  }

  //record in finish
  var event_detail = description["event_detail"];
  var processed_event;
  if(description['mail_detail_content']["start"]==description['mail_detail_content']["end"]){
    processed_event = finsih_calendar.createAllDayEvent(event_detail["title"], new Date(event_detail["start_date"]));
  }else{
    processed_event = finsih_calendar.createEvent(event_detail["title"],
                                                  new Date(event_detail["start_date"]),
                                                  new Date(event_detail["end_date"]));
  }

  var new_id= processed_event.getId();
  var new_description_obj = JSON.parse(event_series.getDescription());
  new_description_obj['event_id'] = new_id;
  processed_event.setDescription(JSON.stringify(new_description_obj));

  //remove event in pending

  event_series.deleteTag("delete");
  event_series.setTag("delete", 1);
  event_series.deleteEventSeries();


  var html_content;
  var mail_title;
  if(approve){
    //create event in display calendar
    var team_string = description["team_calendar"];
    leave_library.add_event_to_display_calendar(description['mail_detail_content'],team_string.split(","));
    var inform_admin_work_manually = description['inform_admin_work_manually'];
    var mail_detail_content = description['mail_detail_content'];
    mail_detail_content["other_information"] = "<div>由於收到上年度的申請，Admin需要：人手於今年度的Database扣Carried from last year之假期日數</div>";
    if(inform_admin_work_manually==1){
      var html_content = leave_library.get_information_mail_template(mail_detail_content);
      var mail_response = leave_library.send_mail( html_content ,"[Admin Operation] 收到上年度的申請(ID:"+id+")", leave_library.admin_mail);

      if(!mail_response['success']){
        throw("Cannot send to :"+target_staff_email+" due to "+mail_response['message']);
      }


    }
    html_content = leave_library.get_approve_mail_template(description['mail_detail_content']);
    //mail_title = "Your Leave Application (ID:"+id+") was approved";

  }else{
    html_content = leave_library.get_disapprove_mail_template(description['mail_detail_content'],leader);
    //mail_title = "Your Leave Application (ID:"+id+") was disapproved";
  }
  mail_title = 'Your Leave Application Summary (ID:'+id+')';


  //send e-mail to applicants to tell him/her the result of this application and other stuff
  var to_address = description['target_staff_email'];

  var mail_response = leave_library.send_mail( html_content ,mail_title, to_address);
  if(!mail_response['success']){
    throw("Cannot send to :"+to_address+" due to "+mail_response['message']);
  }

  var mail_array=leave_library.check_all_mailed_before(description["approval_object"]);
  var mail_subject = 'Leave Application: '+description['mail_detail_content']["applicatant"]+' (ID:'+id+')';
    Logger.log(mail_array);
    for(var staff_type in mail_array){
      var subject = mail_subject;
      if(staff_type=="admin"){
        subject = "[Admin approve] "+subject;
      }
      if(staff_type=="ldhr"){
        subject = "[LDHR Approval] "+subject;
      }
      var mail_response=leave_library.send_mail(html_content,subject,mail_array[staff_type]);
      Logger.log(mail_response);
      if(!mail_response['success']){
        throw("Cannot send to :"+mail_array[staff_type]+" due to "+mail_response['message']);
      }

    }

}

function test(){
  //var team_string = "SLM leave calendar,SLM OPS leave calendar";
  //Logger.log(team_string.split(","));
  //add_event_to_display_calendar(description['mail_detail_content'],team_string.split(","));
  //logcat('2017-2018',"test_leader","test_id");
//  var approve_object = JSON.parse('{"dir":"george.lee@hkccc.org<approve>","admin":"leave.record@hkccc.org<approve>","mcc":"/","nat":"/","ldhr":"leave.approval@hkccc.org<approve>"}')
//  var check_result = leave_library.check_all_leader_approval(approve_object);
//  Logger.log(check_result)
  var start_date = "2018-07-14T16:00:00.000Z";
  var target_ministry_year = leave_library.get_ministry_year_from_date(start_date);
  var r = enough_remain_day("AL",15,"suiwing.huang@hkccc.org", target_ministry_year);

}

function logcat(ministry_year,leader,id){
  var leave_database_spreadsheet = SpreadsheetApp.openById(leave_library.get_leave_database_spreadsheet_id(ministry_year));
  var log_sheet   = leave_database_spreadsheet.getSheetByName('Logcat');
  var lastRow=log_sheet.getLastRow()+1;
  var log_obj = {};
  log_obj['ministry_year']= ministry_year;
  log_obj['leader']= leader;
  log_obj['id']= id;
  log_obj['date']= new Date();

  log_sheet.getRange(lastRow ,1).setValue(JSON.stringify(log_obj));
  //Logger.log(log_sheet.getLastRow());

}
