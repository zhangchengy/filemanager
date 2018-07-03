package com.succez.login.java;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

public class ListAction extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ArrayList<MyFile> filess = new ArrayList<MyFile>();

	public ListAction() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		filess.clear();
		JSONObject obj = new JSONObject();
		ServletContext context = getServletConfig().getServletContext();
		String path = context.getRealPath("/");
		findFile(path, 0);
		obj.put("files", filess);
		response.getWriter().append(obj.toString());
	}

	public void findFile(String path, int level) {

		System.out.println(path);
		File file = new File(path);
		File[] files = file.listFiles();
		for (File f : files) {

			MyFile myFile = new MyFile();
			myFile.setFileName(f.getName());
			myFile.setFilePath(f.getPath());
			Long fileModified=f.lastModified();
			Date date=new Date(fileModified);
			SimpleDateFormat simpleDateFormat =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String lastModify=simpleDateFormat.format(date);
			myFile.setLastModify(lastModify);
			myFile.setLevel(level);
			myFile.setSize(f.length());
			if (f.isDirectory()) {

				System.out.println("文件夹：" + f.getName());
				myFile.setDirectory(true);
				filess.add(myFile);
				findFile(f.getPath(), level + 1);

			} else {
				System.out.println("文件：" + f.getName());
				myFile.setDirectory(false);
				filess.add(myFile);
			}
		}
	}

}
