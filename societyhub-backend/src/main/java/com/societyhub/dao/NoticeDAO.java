package com.societyhub.dao;

import com.societyhub.model.Notice;
import com.societyhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class NoticeDAO {

    public List<Notice> getAllNotices() {

        List<Notice> notices = new ArrayList<>();

        String sql = "SELECT * FROM notices ORDER BY notice_date DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery()
        ) {

            while (resultSet.next()) {

                Notice notice = new Notice(
                    resultSet.getInt("id"),
                    resultSet.getString("title"),
                    resultSet.getString("message"),
                    resultSet.getString("notice_date")
                );

                notices.add(notice);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return notices;
    }

    public boolean addNotice(Notice notice) {

        String sql = "INSERT INTO notices (title, message, notice_date) " +
                     "VALUES (?, ?, ?)";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)
        ) {

            statement.setString(1, notice.getTitle());
            statement.setString(2, notice.getMessage());
            statement.setDate(
                3,
                Date.valueOf(notice.getNoticeDate())
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}