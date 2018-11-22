package ParkInsp;

//import all of the classes and libraries needed for the project.
import org.json.JSONArray;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;


@WebServlet("/api/navigate")
public class Navigate extends HttpServlet {
    //establish inheritance properties
    private static final long serialVersionUID = 1L;
    public Navigate() {
        super();
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //set output characteristics for the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");


        //run an sql query using the nice included DBUtility class
        DBUtility dbutil = new DBUtility();
        String sql = "SELECT ST_AsGeoJSON(geom) AS geom, ST_AsGeoJSON(ST_Centroid(geom)) AS point, parkFootprints.parknum AS parknum, currname, pastname, googlelink, inspa.date AS inspDate " +
                " FROM parkFootprints LEFT OUTER JOIN (SELECT parknum, MAX(inspDate) AS date FROM inspectionnotes GROUP BY parknum) as inspa ON parkfootprints.parknum=inspa.parkNum ;";
        ResultSet res = dbutil.queryDB(sql);


        //the output is going to be json so a JSONArray object will be used to hold the output given to the response object
        JSONArray list = new JSONArray();

        //this whole thing annoyingly needs to be included inside of an
        //sql try block. the sql stuff throws a SQLException object. I would include it outside of the try block
        //except that because of the object inheritance from HttpServlet the method throws statement can't include
        //that type or error. the try block avoids this.
        try {
            while (res.next()) {
                //create a hashmap and place all the results into their respective keys
                HashMap<String, String> m = new HashMap<String,String>();
                m.put("point", res.getString("point"));
                m.put("geom", res.getString("geom"));
                m.put("parknum", res.getString("parknum"));
                m.put("currname", res.getString("currname"));
                m.put("pastname", res.getString("pastname"));
                m.put("googlelink", res.getString("googlelink"));
                m.put("inspDate" , res.getString("inspDate"));
                list.put(m);//convert the hash into json

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        //send the response back to the browser
        response.getWriter().write(list.toString());

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
