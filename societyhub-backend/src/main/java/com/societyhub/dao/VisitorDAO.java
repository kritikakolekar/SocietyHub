package com.societyhub.dao;

import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class VisitorDAO {

    public List<String[]> getAllVisitors() {

        List<String[]> visitors = new ArrayList<>();

        String sql =
            "SELECT * FROM visitors ORDER BY id DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql);
            ResultSet resultSet =
                statement.executeQuery()
        ) {

            while (resultSet.next()) {

                String[] visitor = {
                    String.valueOf(resultSet.getInt("id")),
                    resultSet.getString("visitor_name"),
                    resultSet.getString("flat_number"),
                    resultSet.getString("contact_number"),
                    resultSet.getString("purpose"),
                    String.valueOf(resultSet.getTimestamp("entry_time")),
                    String.valueOf(resultSet.getTimestamp("exit_time")),
                    resultSet.getString("status")
                };

                visitors.add(visitor);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return visitors;
    }
}