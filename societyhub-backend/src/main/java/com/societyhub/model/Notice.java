package com.societyhub.model;

public class Notice {

    private int id;
    private String title;
    private String message;
    private String noticeDate;

    public Notice() {
    }

    public Notice(int id, String title, String message, String noticeDate) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.noticeDate = noticeDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNoticeDate() {
        return noticeDate;
    }

    public void setNoticeDate(String noticeDate) {
        this.noticeDate = noticeDate;
    }
}