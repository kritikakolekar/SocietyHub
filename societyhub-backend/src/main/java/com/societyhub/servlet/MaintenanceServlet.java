package com.societyhub.servlet;

import com.societyhub.dao.MaintenanceDAO;
import com.societyhub.util.DBConnection;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/api/maintenance")
public class MaintenanceServlet extends HttpServlet {
    private MaintenanceDAO maintenanceDAO;

@Override
public void init() {
    maintenanceDAO = new MaintenanceDAO();
}

    @Override
    protected void doGet(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader(
            "Access-Control-Allow-Origin",
            "http://localhost:5173"
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String sql =
            "SELECT * FROM maintenance ORDER BY id DESC";

        PrintWriter out = response.getWriter();

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql);
            ResultSet resultSet =
                statement.executeQuery()
        ) {

            out.print("[");

            boolean first = true;

            while (resultSet.next()) {

                if (!first) {
                    out.print(",");
                }

                out.print("{");

                out.print("\"id\":"
                    + resultSet.getInt("id") + ",");

                out.print("\"residentName\":\""
                    + resultSet.getString("resident_name")
                    + "\",");

                out.print("\"flatNumber\":\""
                    + resultSet.getString("flat_number")
                    + "\",");

                out.print("\"month\":\""
                    + resultSet.getString("month")
                    + "\",");

                out.print("\"amount\":"
                    + resultSet.getBigDecimal("amount")
                    + ",");

                out.print("\"paymentStatus\":\""
                    + resultSet.getString("payment_status")
                    + "\",");

                out.print("\"paymentDate\":\""
                    + resultSet.getString("payment_date")
                    + "\"");

                out.print("}");

                first = false;
            }

            out.print("]");

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                "{\"success\":false,\"message\":\"Failed to load maintenance data\"}"
            );
        }

        out.flush();
    }
}