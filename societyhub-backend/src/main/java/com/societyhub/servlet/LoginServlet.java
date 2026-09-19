package com.societyhub.servlet;

import com.societyhub.dao.UserDAO;
import com.societyhub.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {

    private UserDAO userDAO;

    @Override
    public void init() {
        userDAO = new UserDAO();
    }

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User user = userDAO.login(username, password);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        if (user != null) {

            out.print("{");
            out.print("\"success\":true,");
            out.print("\"message\":\"Login successful\",");
            out.print("\"username\":\"" + user.getUsername() + "\",");
            out.print("\"role\":\"" + user.getRole() + "\"");
            out.print("}");

        } else {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            out.print("{");
            out.print("\"success\":false,");
            out.print("\"message\":\"Invalid username or password\"");
            out.print("}");
        }

        out.flush();
    }
}