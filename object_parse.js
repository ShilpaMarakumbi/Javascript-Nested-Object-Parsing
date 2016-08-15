/*parse the object */


var obj={
    "resourceType":"Patient",
    "id":
    "Patient-1119",
    "meta":{
        "versionId":"3",
        "lastUpdated":"2016-07-20T07:04:22.739-04:00"
    },
    "text":{
        "status":"generated",
        "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\"> Tricia Lynn <b>FRANKLIN </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>000001119</td></tr><tr><td>Address</td><td><span>770 SE Pecan Street </span><br /><span>Pontiac </span><span>MI </span></td></tr><tr><td>Date of birth</td><td><span>15 January 1987</span></td></tr></tbody></table></div>"
    },
    "extension":[
        {
            "url":"http://hl7.org/fhir/StructureDefinition/us-core-race",
            "valueCodeableConcept":{
                "coding":[
                    {
                        "system":"http://hl7.org/fhir/v3/Race",
                        "code":"2056-0",
                        "display":"Black"
                    }
                ]
            }
        },
        {
            "url":"http://hl7.org/fhir/StructureDefinition/us-core-ethnicity",
            "valueCodeableConcept":{
                "coding":[
                    {
                        "system":"http://hl7.org/fhir/v3/Ethnicity",
                        "code":"2186-5",
                        "display":"Not Hispanic or Latino"
                    }
                ]
            }
        },
        {
            "url":"http://hl7.org/fhir/StructureDefinition/us-core-religion",
            "valueCodeableConcept":{
                "coding":[
                    {
                        "system":"http://hl7.org/fhir/v3/ReligiousAffiliation",
                        "code":"1077",
                        "display":"Protestant"
                    }
                ]
            }
        }
    ],
    "identifier":[
        {
            "use":"official",
            "type":{
                "coding":[
                    {
                        "system":"http://hl7.org/fhir/identifier-type",
                        "code":"SB",
                        "display":"Social Beneficiary Identifier"
                    }
                ],
                "text":"US Social Security Number"
            },
            "system":"http://hl7.org/fhir/sid/us-ssn",
            "value":"000001119"
        },
        {
            "use":"official",
            "type":{
                "coding":[
                    {
                        "system":"http://hl7.org/fhir/identifier-type",
                        "code":"SB",
                        "display":"Social Beneficiary Identifier"
                    }
                ],
                "text":"Michigan Common Key Service Identifier"
            },
            "system":"http://mihin.org/fhir/cks",
            "value":"ah7xct5hfl4bdznumnupokdyn67ruuxusrdj4qgc"
        }
    ],
    "active":false,
    "name":[
        {
            "family":[
                "Franklin"
            ],
            "given":[
                "Tricia",
                "Lynn"
            ]
        }
    ],
    "telecom":[
        {
            "system":"phone",
            "value":"248.555.7818",
            "use":"home"
        },
        {
            "system":"phone",
            "value":"248.555.0530",
            "use":"work"
        },
        {
            "extension":[
                {
                    "url":"http://hl7.org/fhir/StructureDefinition/us-core-direct",
                    "valueBoolean":true
                }
            ],
            "system":"email",
            "value":"Tricia.L.Franklin@direct.mihintest.org",
            "use":"home"
        }
    ],
    "gender":"female",
    "birthDate":"1987-01-15",
    "address":[
        {
            "line":[
                "770 SE Pecan Street"
            ],
            "city":"Pontiac",
            "state":"MI",
            "postalCode":"48341"
        }
    ]
};
var obj123= obj;
console.log(obj123);
$(document).ready(function(){

  var html_obj="";
  function parseobj(obj,type,data_path_params){
  	var extendedClass="";
   switch(type){
	   	case 1:extendedClass="ClassOne";
	   	break;
	   	case 2:extendedClass="ClassTwo";
	   	break;
	   	case 3:extendedClass="ClassThree";
	   	break;
	   	case 4:extendedClass="classFour";
	   	break;
   }

  var set_flag_for=0;
  for(var key in obj){
  	var data_path=JSON.stringify(obj);

     if(type==1) data_path_params="/";
        if(set_flag_for){
         data_path_params=data_path_params.split("/").slice(0,-2).join("/");
         data_path_params+="/";
      }
  	if(!(typeof obj[key]=="object" && !(obj==null))){

      data_path_params+=key+"/";
 		 html_obj+="<span class='dataType  "+extendedClass+"' data-path='"+data_path_params+"' >"+key+":</span>";
 		 html_obj+="<span class='dataValue' data-path='"+data_path_params+"'>"+obj[key]+"</span></br>";
  	  set_flag_for=1;
  	}
  	else if (typeof obj[key]=="object" && !(obj==null) && !(obj[key] instanceof Array) ){
        data_path_params+=key+"/";
        html_obj+="<br/><span class='dataType subdataType  "+extendedClass+"' >"+key+":</span></br>";
        var typeTemp=(type>=2?type:2);
        parseobj(obj[key],typeTemp,data_path_params);
  	}
  	else if (obj[key] instanceof Array){
  		
  		 html_obj+="<span class='dataType nestedsubdataType "+extendedClass+"' >"+key+":</span></br>";
  		
  		for( var index=0;index<obj[key].length;index++){
       var exception_flag=0;
  			var typeTemp=(type==3?4:3);
  			if (typeof obj[key][index]=="object" && !(obj[key]==null)){
          
          var param_check=data_path_params.split('/');
           param_check[param_check.length-1];
           data_path_params+=key+"/"+index+"/";
         
           if( param_check[param_check.length-2]==(index-1)){
            data_path_params=data_path_params.replace(param_check[param_check.length-3]+"/"+param_check[param_check.length-2]+"/","");
            }
  			   parseobj(obj[key][index],typeTemp,data_path_params);
         }
  			else {
					exception_flag=1;
					html_obj+="<span class='dataValue classFour' data-path='"+data_path_params+key+"/'>"+obj[key][index]+"</span></br>";
  			}
  		 }
        if(	!exception_flag){
			data_path_params=data_path_params.split("/").slice(0,-3).join("/");
			data_path_params+="/";
         }
  		}
       
          
  	}
  	  	

  }

 var data_path_params="/";
 parseobj(obj,1,data_path_params);
 $("#container").append(html_obj);

function updateDataAttr(key,obj)
{
	 $(".dataType").each(function(){
	 	var ob=obj;
	 	ob=ob[key];
	     $(this).attr("data-path",JSON.stringify(key)); 
	     object_tmp=($(this).attr("data-path"));
         
	 });

}


 
$(".dataValue").each(function(){
	$(this).attr("contentEditable","true");
});

$("#SaveBtn").click(function(){
  $(".dataValue").each(function(){
	var save_obj=obj123;
    var flag= $(this).attr("data-path");
     if(flag){
        var  arr_path=flag.split("/");
        arr_path.pop();
        arr_path.shift();
     
        value=$(this).html();
        
        function setValue(save_obj,arr_path,value){
    
            if (arr_path.length > 1){
                setValue(save_obj[arr_path.shift()],arr_path,value);
            }else{
                obj[arr_path[0]] = value;
            }
        }

        setValue(save_obj,arr_path,value);
         console.log(save_obj);

     }
    
  });
});

$(".nestedsubdataType").each(function(){
   var margin_elem=$(this).css("margin-left","+=10px");
   var vl=margin_elem+"10"+"px";
   $(this).css("margin-left",vl);
   
});
});



