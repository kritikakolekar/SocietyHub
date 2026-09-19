package com.societyhub.servlet;

import com.societyhub.dao.ComplaintDAO;
import com.societyhub.model.Complaint;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/complaints")
public class ComplaintServlet extends HttpServlet {

    private ComplaintDAO complaintDAO;

    @Override
    public void init() {
        complaintDAO = new ComplaintDAO();
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
            "GET, POST, PUT, OPTIONS"
        );

        response.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<Complaint> complaints =
                complaintDAO.getAllComplaints();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < complaints.size(); i++) {

            Complaint complaint = complaints.get(i);

            out.print("{");
            out.print("\"id\":" + complaint.getId() + ",");
            out.print("\"residentName\":\""
                    + complaint.getResidentName() + "\",");
            out.print("\"subject\":\""
                    + complaint.getSubject() + "\",");
            out.print("\"description\":\""
                    + complaint.getDescription() + "\",");
            out.print("\"status\":\""
                    + complaint.getStatus() + "\"");
            out.print("}");

            if (i < complaints.size() - 1) {
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
        "GET, POST, PUT, OPTIONS"
    );

    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    String residentName = request.getParameter("residentName");
    String subject = request.getParameter("subject");
    String description = request.getParameter("description");

    Complaint complaint = new Complaint(
        0,
        residentName,
        subject,
        description,
        "Pending"
    );

    boolean success = complaintDAO.addComplaint(complaint);

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    PrintWriter out = response.getWriter();

    if (success) {
        out.print("{\"success\":true,\"message\":\"Complaint added successfully\"}");
    } else {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        out.print("{\"success\":false,\"message\":\"Failed to add complaint\"}");
    }

    out.flush();
}
}