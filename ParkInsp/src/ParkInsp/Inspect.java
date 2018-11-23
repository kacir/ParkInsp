package ParkInsp;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/api/inspect")
public class Inspect extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public Inspect() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String parknum = request.getParameter("parknum");
        DBUtility dbutil = new DBUtility();

        //the output is going to be json so a JSONArray object will be used to hold the output given to the response object
        JSONObject outputJSON = new JSONObject();
        JSONArray structuresJSON = new JSONArray();
        JSONObject projectBoundaryFederal = new JSONObject();
        JSONObject projectBoundaryState = new JSONObject();


        //search for the park footprints
        String parkFootprintSQL = "SELECT ST_AsGeoJSON(geom) as geom, currname FROM  parkFootprints WHERE parknum='" + parknum + "';";
        ResultSet parkFootprintResult = dbutil.queryDB(parkFootprintSQL);
        try {
            while (parkFootprintResult.next()) {
                outputJSON.put("geom_footprint", new JSONObject(parkFootprintResult.getString("geom")) );
                outputJSON.put("currname", parkFootprintResult.getString("currname"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        //search for project boundary federal if it exists
        String projectBoundaryFederalSQL = "SELECT ST_AsGeoJSON(projectboundary.geom) as geom, projectboundary.type as type FROM projectboundary WHERE st_intersects(projectboundary.geom, (SELECT geom FROM  parkFootprints WHERE parknum = '" + parknum + "')) AND projectboundary.type = 'federal'";
        ResultSet projectBoundaryFederalResult = dbutil.queryDB(projectBoundaryFederalSQL);
        try {
            while (projectBoundaryFederalResult.next()) {

                projectBoundaryFederal.put("geom" , new JSONObject(projectBoundaryFederalResult.getString("geom")));
                projectBoundaryFederal.put("type" , projectBoundaryFederalResult.getString("type"));

                outputJSON.put("projectboundaryfederal" , projectBoundaryFederal);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        //search for project boundary state if it exists
        String projectBoundaryStateSQL = "SELECT ST_AsGeoJSON(projectboundary.geom) as geom, projectboundary.type as type FROM projectboundary WHERE st_intersects(projectboundary.geom, (SELECT geom FROM  parkFootprints WHERE parknum = '" + parknum + "')) AND projectboundary.type = 'state'";
        ResultSet projectBoundaryStateResult = dbutil.queryDB(projectBoundaryStateSQL);
        try {
            while (projectBoundaryStateResult.next()) {
                projectBoundaryState.put("geom" , new JSONObject(projectBoundaryStateResult.getString("geom")));
                projectBoundaryState.put("type" , projectBoundaryStateResult.getString("type"));

                outputJSON.put("projectboundarystate" , projectBoundaryState);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }




        //search for structures if there are any
        String structuresSQL = "SELECT ST_AsGeoJSON(geom) as geom, structures.label AS label, structures.type AS type FROM structures WHERE st_intersects(structures.geom, (SELECT geom FROM  parkFootprints WHERE parknum = '" + parknum + "'));";
        ResultSet structureResult = dbutil.queryDB(structuresSQL);
        try {
            while (structureResult.next()) {

                JSONObject structure = new JSONObject();
                structure.put("geom" , new JSONObject(structureResult.getString("geom")) );
                structure.put("label" , structureResult.getString("label"));
                structure.put("type" , structureResult.getString("type"));

                structuresJSON.put(structure);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            outputJSON.put("structures" , structuresJSON);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        //send the response back to the browser
        response.getWriter().write(outputJSON.toString());

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
