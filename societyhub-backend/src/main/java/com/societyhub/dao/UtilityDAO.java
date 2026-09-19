package com.societyhub.dao;

import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UtilityDAO {

    public List<String[]> getAllUtilities() {

        List<String[]> utilityList = new ArrayList<>();

        String sql =
            "SELECT * FROM utilities ORDER BY id DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql);
            ResultSet resultSet =
                statement.executeQuery()
        ) {

            while (resultSet.next()) {

                String[] utility = {
                    String.valueOf(resultSet.getInt("id")),
                    resultSet.getString("month"),
                    String.valueOf(resultSet.getBigDecimal("electricity_units")),
                    String.valueOf(resultSet.getBigDecimal("electricity_bill")),
                    String.valueOf(resultSet.getBigDecimal("water_bill")),
                    String.valueOf(resultSet.getBigDecimal("other_expenses")),
                    String.valueOf(resultSet.getBigDecimal("total_amount")),
                    resultSet.getString("payment_status")
                };

                utilityList.add(utility);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return utilityList;
    }
}