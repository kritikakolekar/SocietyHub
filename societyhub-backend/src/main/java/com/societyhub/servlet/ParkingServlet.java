package com.societyhub.servlet;

import com.societyhub.dao.ParkingDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/parking")
public class ParkingServlet extends HttpServlet {

    private ParkingDAO parkingDAO;

    @Override
    public void init() {
        parkingDAO = new ParkingDAO();
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

        List<String[]> parkingList =
                parkingDAO.getAllParking();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < parkingList.size(); i++) {

            String[] parking = parkingList.get(i);

            out.print("{");

            out.print("\"id\":" + parking[0] + ",");
            out.print("\"parkingSlot\":\"" + parking[1] + "\",");
            out.print("\"flatNumber\":\"" + parking[2] + "\",");
            out.print("\"ownerName\":\"" + parking[3] + "\",");
            out.print("\"vehicleNumber\":\"" + parking[4] + "\",");
            out.print("\"vehicleType\":\"" + parking[5] + "\",");
            out.print("\"status\":\"" + parking[6] + "\"");

            out.print("}");

            if (i < parkingList.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }
}