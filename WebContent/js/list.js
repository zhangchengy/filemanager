function submit(){
	var result=document.getElementById("result");
	result.innerHTML="";
    var request = new XMLHttpRequest();
	request.open("POST", "User/ListAction");      
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState===4) {
			if (request.status===200) { 
				var data = JSON.parse(request.responseText);                        
                	for(var j = 0,len = data.files.length; j < len; j++){
                		var blank="";
                        for(var k=0;k<data.files[j].level;k++){var blank=blank+"&nbsp;&nbsp;";}
                            if(data.files[j].directory==true)
                                result.innerHTML=result.innerHTML+"<li class='isdi'>"+blank+"<a href='#'>"+data.files[j].fileName+"</a></li>";
                            else
                                result.innerHTML=result.innerHTML+"<li class='notdi'>"+blank+"<a href='#'>"+data.files[j].fileName+"</a></li>";
                		console.log(j);
                	}                	            	
			} else {
				alert("发生错误：" + request.status);
			}
		} 
	}
}