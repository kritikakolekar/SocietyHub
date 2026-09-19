package com.societyhub.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import com.mysql.cj.jdbc.Driver;

public class DBConnection {

    private static final String URL =
            "jdbc:mysql://localhost:3306/societyhub";

    private static final String USER = "root";

    private static final String PASSWORD = "Kritika@2006";

    public static Connection getConnection() throws SQLException {
        DriverManager.registerDriver(new Driver());
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}