package com.societyhub.model;

public class Admin extends User {

    public Admin() {
        super();
    }

    public Admin(int id, String username, String password) {
        super(id, username, password, "ADMIN");
    }
}