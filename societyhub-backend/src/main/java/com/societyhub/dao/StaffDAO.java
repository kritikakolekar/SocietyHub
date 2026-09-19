package com.societyhub.dao;

import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StaffDAO {

    public List<String[]> getAllStaff() {

        List<String[]> staffList = new ArrayList<>();

        String sql =
            "SELECT * FROM staff ORDER BY id DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql);
            ResultSet resultSet =
                statement.executeQuery()
        ) {

            while (resultSet.next()) {

                String[] staff = {
                    String.valueOf(resultSet.getInt("id")),
                    resultSet.getString("name"),
                    resultSet.getString("job_role"),
                    resultSet.getString("phone"),
                    String.valueOf(resultSet.getBigDecimal("salary")),
                    String.valueOf(resultSet.getDate("joining_date")),
                    resultSet.getString("status")
                };

                staffList.add(staff);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return staffList;
    }
}