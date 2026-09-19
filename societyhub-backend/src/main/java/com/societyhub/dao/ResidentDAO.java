package com.societyhub.dao;

import com.societyhub.model.Resident;
import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ResidentDAO {

    public List<Resident> getAllResidents() {

        List<Resident> residents = new ArrayList<>();

        String sql = "SELECT * FROM residents";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery()
        ) {

            while (resultSet.next()) {

                Resident resident = new Resident(
                    resultSet.getInt("id"),
                    resultSet.getString("name"),
                    resultSet.getString("email"),
                    resultSet.getString("phone"),
                    resultSet.getString("flat_number")
                );

                residents.add(resident);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return residents;
    }

    public boolean addResident(Resident resident) {

        String sql = "INSERT INTO residents (name, email, phone, flat_number) VALUES (?, ?, ?, ?)";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)
        ) {

            statement.setString(1, resident.getName());
            statement.setString(2, resident.getEmail());
            statement.setString(3, resident.getPhone());
            statement.setString(4, resident.getFlatNumber());

            return statement.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteResident(int id) {

        String sql = "DELETE FROM residents WHERE id = ?";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean updateResident(Resident resident) {

    String sql = "UPDATE residents SET name = ?, email = ?, phone = ?, flat_number = ? WHERE id = ?";

    try (
        Connection connection = DBConnection.getConnection();
        PreparedStatement statement = connection.prepareStatement(sql)
    ) {

        statement.setString(1, resident.getName());
        statement.setString(2, resident.getEmail());
        statement.setString(3, resident.getPhone());
        statement.setString(4, resident.getFlatNumber());
        statement.setInt(5, resident.getId());

        return statement.executeUpdate() > 0;

    } catch (Exception e) {
        e.printStackTrace();
        return false;
    }
}
}
