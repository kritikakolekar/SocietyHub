package com.societyhub.model;

public class Complaint {

    private int id;
    private String residentName;
    private String subject;
    private String description;
    private String status;

    public Complaint() {
    }

    public Complaint(int id, String residentName, String subject,
                     String description, String status) {
        this.id = id;
        this.residentName = residentName;
        this.subject = subject;
        this.description = description;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getResidentName() {
        return residentName;
    }

    public void setResidentName(String residentName) {
        this.residentName = residentName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}