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
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/api/viewpast")
public class ViewPast extends javax.servlet.http.HttpServlet {
    //private static final long serialVersionUID = 1L;

    /**
     * @see javax.servlet.http.HttpServlet#javax.servlet.http.HttpServlet()
     */
    public ViewPast() {
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
        JSONArray list = new JSONArray();

        DBUtility dbutil = new DBUtility();

        String parknum = request.getParameter("parknum");

        String sql = "select inspector, inspdate, conversion, dataCorr, maint, public_acc, notetype, note1" +
                " from inspectionnotes where inspectionnotes.parknum = '" + parknum + "'";

        ResultSet res = dbutil.queryDB(sql);
        System.out.println(sql);
        try {
            while (res.next()) {
                HashMap<String, String> m = new HashMap<String, String>();
                m.put("inspector", res.getString("inspector"));
                m.put("inspdate", res.getString("inspdate"));
                m.put("note1", res.getString("note1"));
                m.put("conversion", res.getString("conversion"));
                m.put("dataCorr", res.getString("dataCorr"));
                m.put("maint", res.getString("maint"));
                m.put("public_acc", res.getString("public_acc"));
                m.put("notetype", res.getString("notetype"));
                list.put(m);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }


        response.getWriter().write(list.toString());
    }

}
