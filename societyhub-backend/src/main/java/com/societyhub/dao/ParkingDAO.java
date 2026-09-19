package com.societyhub.dao;

import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ParkingDAO {

    public List<String[]> getAllParking() {

        List<String[]> parkingList = new ArrayList<>();

        String sql =
            "SELECT * FROM parking ORDER BY id DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql);
            ResultSet resultSet =
                statement.executeQuery()
        ) {

            while (resultSet.next()) {

                String[] parking = {
                    String.valueOf(resultSet.getInt("id")),
                    resultSet.getString("parking_slot"),
                    resultSet.getString("flat_number"),
                    resultSet.getString("owner_name"),
                    resultSet.getString("vehicle_number"),
                    resultSet.getString("vehicle_type"),
                    resultSet.getString("status")
                };

                parkingList.add(parking);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return parkingList;
    }
}
