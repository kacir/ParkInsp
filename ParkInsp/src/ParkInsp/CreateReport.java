package ParkInsp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/api/createreport")
public class CreateReport extends javax.servlet.http.HttpServlet {
    //private static final long serialVersionUID = 1L;

    /**
     * @see javax.servlet.http.HttpServlet#javax.servlet.http.HttpServlet()
     */
    public CreateReport() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse
            response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        DBUtility dbutil = new DBUtility();
        String sql;

        int report_id = 0;
        String parknum = request.getParameter("parknum");
        String inspector = request.getParameter("inspector");
        String inspdate = request.getParameter("inspdate");
        String conversion = request.getParameter("conversion");
        String datacorr = request.getParameter("datacorr");
        String maint = request.getParameter("maint");
        String public_acc = request.getParameter("public_acc");
        String note1 = request.getParameter("note1");
        if (parknum != null) {parknum = "'" + parknum + "'";}
        if (inspector != null) {inspector = "'" + inspector + "'";}
        if (inspdate != null) {inspdate = "'" + inspdate + "'";}
        if (note1 != null) {note1 = "'" + note1 + "'";}
        if (conversion != null) {conversion = "'" + conversion + "'";}
        if (datacorr != null) {datacorr = "'" + datacorr + "'";}
        if (maint != null) {maint = "'" + maint + "'";}
        if (public_acc != null) {public_acc = "'" + public_acc + "'";}

        sql = "insert into inspectionnotes (parknum, inspector, inspdate, conversion, datacorr, maint, " +
                "public_acc, note1) values (" + parknum + "," + inspector + "," + inspdate
                + "," + conversion + "," + datacorr + "," + maint + "," + public_acc + "," + note1 + ")";
        System.out.println(sql);
        dbutil.modifyDB(sql);

        try {
            // record the report id
            ResultSet res_1 = dbutil.queryDB("select last_value from inspectionnotes_id_seq");
            res_1.next();
            report_id = res_1.getInt(1);
        } catch (SQLException e){
            e.printStackTrace();
        }

        System.out.println("Success! Report created.");

        // response that the report submission is successful
        JSONObject data = new JSONObject();
        try {
            data.put("status", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.getWriter().write(data.toString());
    }

}
