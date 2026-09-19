package com.societyhub.servlet;

import com.societyhub.dao.UtilityDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/utilities")
public class UtilityServlet extends HttpServlet {

    private UtilityDAO utilityDAO;

    @Override
    public void init() {
        utilityDAO = new UtilityDAO();
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

        List<String[]> utilityList =
                utilityDAO.getAllUtilities();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < utilityList.size(); i++) {

            String[] utility = utilityList.get(i);

            out.print("{");

            out.print("\"id\":" + utility[0] + ",");
            out.print("\"month\":\"" + utility[1] + "\",");
            out.print("\"electricityUnits\":\"" + utility[2] + "\",");
            out.print("\"electricityBill\":\"" + utility[3] + "\",");
            out.print("\"waterBill\":\"" + utility[4] + "\",");
            out.print("\"otherExpenses\":\"" + utility[5] + "\",");
            out.print("\"totalAmount\":\"" + utility[6] + "\",");
            out.print("\"paymentStatus\":\"" + utility[7] + "\"");

            out.print("}");

            if (i < utilityList.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }
}