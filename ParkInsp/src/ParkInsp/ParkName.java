package ParkInsp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/api/parkname")
public class ParkName extends HttpServlet {
    //establish inheritance properties
    private static final long serialVersionUID = 1L;
    public ParkName() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //set output characteristics for the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JSONObject outputJSON = new JSONObject();

        String parknum = request.getParameter("parknum");

        //run an sql query using the nice included DBUtility class
        DBUtility dbutil = new DBUtility();
        String sql = "SELECT currname FROM parkfootprints WHERE parknum = '" + parknum +"';";
        ResultSet res = dbutil.queryDB(sql);

        try {
            res.next();
            System.out.println(res.getString("currname"));

            outputJSON.put("currname" ,res.getString("currname"));

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        //send the response back to the browser
        response.getWriter().write(outputJSON.toString());

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
