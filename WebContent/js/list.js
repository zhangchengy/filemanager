window.onload = function() {
	var result = document.getElementById("result");
	result.innerHTML = "";
	var request = new XMLHttpRequest();
	request.open("POST", "User/ListAction");
	request.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded;charset=utf-8");
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				var data = JSON.parse(request.responseText);
				for (var j = 0, len = data.files.length; j < len; j++) {
					var blank = "", lastLocation, tr, td, td2, td3, directory, li, a;
					for (var k = 0; k < data.files[j].level; k++) {
						blank = blank + "&nbsp;&nbsp;";
					}
					if (data.files[j].directory == true) {

						lastLocation = data.files[j].filePath.lastIndexOf("\\");
						directory = data.files[j].filePath.substring(0,
								lastLocation);
						tr = document.createElement("tr");
						result.appendChild(tr);
						td = document.createElement("td");
						tr.appendChild(td);
						li = document.createElement("li");
						li.setAttribute("class", "isdi");
						li.innerHTML = blank;
						tr.setAttribute("onclick", "re(this);");
						td.appendChild(li);
						a = document.createElement("a");
						a.setAttribute("id", directory);

						a.innerHTML = data.files[j].fileName;
						li.appendChild(a);

						td1 = document.createElement("td");
						tr.appendChild(td1);
						
						td2 = document.createElement("td");
						tr.appendChild(td2);
						td2.innerHTML = data.files[j].lastModify;
						if (data.files[j].level != 0)
							tr.style.display = "none";
					} else {
						lastLocation = data.files[j].filePath.lastIndexOf("\\");
						directory = data.files[j].filePath.substring(0,
								lastLocation);
						tr = document.createElement("tr");
						result.appendChild(tr);
						td = document.createElement("td");
						tr.appendChild(td);
						li = document.createElement("li");
						li.setAttribute("class", "notdi");
						li.innerHTML = blank;
						
						td.appendChild(li);
						a = document.createElement("a");
						a.setAttribute("id", directory);
					//	a.setAttribute("onclick", "down(this);");
						a.innerHTML = data.files[j].fileName;
						tr.setAttribute("onclick","filedownload(this);");
						li.appendChild(a);
						td1 = document.createElement("td");
						tr.appendChild(td1);
						if (data.files[j].size < 1024)
							td1.innerHTML = parseInt(data.files[j].size) + "B";
						else if (data.files[j].size > 1024
								&& data.files[j].size < 1024 * 1024)
							td1.innerHTML = parseInt(data.files[j].size
									/ Math.pow(2, 10))
									+ "KB";
						else
							td1.innerHTML = parseInt(data.files[j].size
									/ Math.pow(2, 20))
									+ "MB";
						td2 = document.createElement("td");
						tr.appendChild(td2);
						td2.innerHTML = data.files[j].lastModify;

						if (data.files[j].level != 0)
							tr.style.display = "none";
					}
				}
			} else {
				alert("发生错误：" + request.status);
			}
		}
	}

}
function re(ee) {
	var e = ee.firstChild.firstChild.lastChild;
	var id = e.id;
	var list = document.getElementsByTagName("a");
	var flag;
	if (ee.nextSibling.style.display == "table-row")
		flag = 1;
	else
		flag = 0;
	for (var i = 0; i < list.length; i++) {
		if (list[i].id.indexOf(id + "\\" + e.innerHTML) != -1) {
			if (flag == 1) {
				list[i].parentNode.parentNode.parentNode.style.display = "none";
				flag = 1;
			} else {
				if (list[i].id == (id + "\\" + e.innerHTML))
					list[i].parentNode.parentNode.parentNode.style.display = "table-row";
				flag = 0;
			}
		}
	}

}

function filedownload(e){
	var f=e.firstChild.firstChild.lastChild;
	var body=document.getElementsByTagName("body");
	var form = document.createElement("form");
	body[0].appendChild(form);
	form.setAttribute("action","User/FileDownload");
	form.setAttribute("method","post");
	
	var input = document.createElement("input");
	form.appendChild(input);
	input.setAttribute("type","hidden");
	input.setAttribute("name","filePath");
	input.setAttribute("value",f.id+"\\"+f.innerHTML);
	form.submit();
	body[0].removeChild(form);

}