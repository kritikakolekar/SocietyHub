package com.societyhub.servlet;

import com.societyhub.dao.SocietyEventDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/events")
public class SocietyEventServlet extends HttpServlet {

    private SocietyEventDAO eventDAO;

    @Override
    public void init() {
        eventDAO = new SocietyEventDAO();
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

        List<String[]> events = eventDAO.getAllEvents();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < events.size(); i++) {

            String[] event = events.get(i);

            out.print("{");

            out.print("\"id\":" + event[0] + ",");
            out.print("\"eventName\":\"" + event[1] + "\",");
            out.print("\"eventDate\":\"" + event[2] + "\",");
            out.print("\"eventTime\":\"" + event[3] + "\",");
            out.print("\"location\":\"" + event[4] + "\",");
            out.print("\"description\":\"" + event[5] + "\"");

            out.print("}");

            if (i < events.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }
    @Override
protected void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws ServletException, IOException {

    response.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:5173"
    );

    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    String eventName = request.getParameter("eventName");
    String eventDate = request.getParameter("eventDate");
    String eventTime = request.getParameter("eventTime");
    String location = request.getParameter("location");
    String description = request.getParameter("description");

    boolean success = eventDAO.addEvent(
        eventName,
        eventDate,
        eventTime,
        location,
        description
    );

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    PrintWriter out = response.getWriter();

    if (success) {
        out.print(
            "{\"success\":true,\"message\":\"Event added successfully\"}"
        );
    } else {
        response.setStatus(
            HttpServletResponse.SC_INTERNAL_SERVER_ERROR
        );

        out.print(
            "{\"success\":false,\"message\":\"Failed to add event\"}"
        );
    }

    out.flush();
}
}