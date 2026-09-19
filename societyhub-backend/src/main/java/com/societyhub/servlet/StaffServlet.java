package com.societyhub.servlet;

import com.societyhub.dao.StaffDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/staff")
public class StaffServlet extends HttpServlet {

    private StaffDAO staffDAO;

    @Override
    public void init() {
        staffDAO = new StaffDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader(
            "Access-Control-Allow-Origin",
            "http://localhost:5173"
        );

        response.setHeader(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        );

        response.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<String[]> staffList =
                staffDAO.getAllStaff();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < staffList.size(); i++) {

            String[] staff = staffList.get(i);

            out.print("{");

            out.print("\"id\":" + staff[0] + ",");
            out.print("\"name\":\"" + staff[1] + "\",");
            out.print("\"jobRole\":\"" + staff[2] + "\",");
            out.print("\"phone\":\"" + staff[3] + "\",");
            out.print("\"salary\":\"" + staff[4] + "\",");
            out.print("\"joiningDate\":\"" + staff[5] + "\",");
            out.print("\"status\":\"" + staff[6] + "\"");

            out.print("}");

            if (i < staffList.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }
}