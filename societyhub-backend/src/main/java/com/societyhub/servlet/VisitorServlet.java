package com.societyhub.servlet;

import com.societyhub.dao.VisitorDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/visitors")
public class VisitorServlet extends HttpServlet {

    private VisitorDAO visitorDAO;

    @Override
    public void init() {
        visitorDAO = new VisitorDAO();
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

        List<String[]> visitors =
                visitorDAO.getAllVisitors();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < visitors.size(); i++) {

            String[] visitor = visitors.get(i);

            out.print("{");

            out.print("\"id\":" + visitor[0] + ",");
            out.print("\"visitorName\":\"" + visitor[1] + "\",");
            out.print("\"flatNumber\":\"" + visitor[2] + "\",");
            out.print("\"contactNumber\":\"" + visitor[3] + "\",");
            out.print("\"purpose\":\"" + visitor[4] + "\",");
            out.print("\"entryTime\":\"" + visitor[5] + "\",");
            out.print("\"exitTime\":\"" + visitor[6] + "\",");
            out.print("\"status\":\"" + visitor[7] + "\"");

            out.print("}");

            if (i < visitors.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }
}