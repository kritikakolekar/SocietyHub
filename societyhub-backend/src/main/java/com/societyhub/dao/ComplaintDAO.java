package com.societyhub.dao;

import com.societyhub.model.Complaint;
import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ComplaintDAO {

    public List<Complaint> getAllComplaints() {

        List<Complaint> complaints = new ArrayList<>();

        String sql = "SELECT * FROM complaints";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery()
        ) {

            while (resultSet.next()) {

                Complaint complaint = new Complaint(
                    resultSet.getInt("id"),
                    resultSet.getString("resident_name"),
                    resultSet.getString("subject"),
                    resultSet.getString("description"),
                    resultSet.getString("status")
                );

                complaints.add(complaint);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return complaints;
    }

    public boolean addComplaint(Complaint complaint) {

        String sql = "INSERT INTO complaints " +
                     "(resident_name, subject, description, status) " +
                     "VALUES (?, ?, ?, ?)";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)
        ) {

            statement.setString(1, complaint.getResidentName());
            statement.setString(2, complaint.getSubject());
            statement.setString(3, complaint.getDescription());
            statement.setString(4, complaint.getStatus());

            return statement.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateStatus(int id, String status) {

        String sql = "UPDATE complaints SET status = ? WHERE id = ?";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)
        ) {

            statement.setString(1, status);
            statement.setInt(2, id);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}