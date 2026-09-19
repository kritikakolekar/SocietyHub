package com.societyhub.dao;

import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MaintenanceDAO {

    public List<String[]> getAllMaintenance() {

        List<String[]> maintenanceList = new ArrayList<>();

        String sql = "SELECT * FROM maintenance ORDER BY id DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery()
        ) {

            while (resultSet.next()) {

                String[] record = {
                    String.valueOf(resultSet.getInt("id")),
                    resultSet.getString("resident_name"),
                    resultSet.getString("flat_number"),
                    resultSet.getString("month"),
                    resultSet.getBigDecimal("amount").toString(),
                    resultSet.getString("payment_status"),
                    String.valueOf(resultSet.getDate("payment_date"))
                };

                maintenanceList.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return maintenanceList;
    }
}