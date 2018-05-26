package com.succez.login.java;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Login extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {
		super.init();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json; charset=utf-8");
		String jsonStr = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";
		response.getWriter().write(jsonStr);
	}

	public void destroy() {
		super.destroy();
	}
}