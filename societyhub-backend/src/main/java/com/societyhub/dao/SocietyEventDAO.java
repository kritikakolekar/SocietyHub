package com.societyhub.dao;

import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SocietyEventDAO {

    public List<String[]> getAllEvents() {

        List<String[]> events = new ArrayList<>();

        String sql =
            "SELECT * FROM society_events ORDER BY event_date ASC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql);
            ResultSet resultSet =
                statement.executeQuery()
        ) {

            while (resultSet.next()) {

                String[] event = {
                    String.valueOf(resultSet.getInt("id")),
                    resultSet.getString("event_name"),
                    String.valueOf(resultSet.getDate("event_date")),
                    String.valueOf(resultSet.getTime("event_time")),
                    resultSet.getString("location"),
                    resultSet.getString("description")
                };

                events.add(event);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return events;
    }
    public boolean addEvent(
        String eventName,
        String eventDate,
        String eventTime,
        String location,
        String description) {

    String sql =
        "INSERT INTO society_events " +
        "(event_name, event_date, event_time, location, description) " +
        "VALUES (?, ?, ?, ?, ?)";

    try (
        Connection connection = DBConnection.getConnection();
        PreparedStatement statement =
            connection.prepareStatement(sql)
    ) {

        statement.setString(1, eventName);
        statement.setDate(2, Date.valueOf(eventDate));
        statement.setTime(3, Time.valueOf(eventTime));
        statement.setString(4, location);
        statement.setString(5, description);

        return statement.executeUpdate() > 0;

    } catch (Exception e) {
        e.printStackTrace();
        return false;
    }
}
}