package com.societyhub.servlet;

import com.societyhub.dao.NoticeDAO;
import com.societyhub.model.Notice;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/notices")
public class NoticeServlet extends HttpServlet {

    private NoticeDAO noticeDAO;

    @Override
    public void init() {
        noticeDAO = new NoticeDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader(
            "Access-Control-Allow-Origin",
            "http://localhost:5173"
        );

        response.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS"
        );

        response.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<Notice> notices = noticeDAO.getAllNotices();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < notices.size(); i++) {

            Notice notice = notices.get(i);

            out.print("{");
            out.print("\"id\":" + notice.getId() + ",");
            out.print("\"title\":\"" + notice.getTitle() + "\",");
            out.print("\"message\":\"" + notice.getMessage() + "\",");
            out.print("\"noticeDate\":\"" + notice.getNoticeDate() + "\"");
            out.print("}");

            if (i < notices.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }
}