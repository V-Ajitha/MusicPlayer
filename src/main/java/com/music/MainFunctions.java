package com.music;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.List;
import java.util.ArrayList;

import org.json.JSONObject;

public class MainFunctions{
	
	String categories; 
	
	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}
	
	public List<JSONObject> getCatagoryDetails() {
	    List<JSONObject> resultList = new ArrayList<>();
			try {
				String selectQuery = "SELECT * FROM " + categories;
				PreparedStatement pst = DBConnection.getConnection(selectQuery);
				ResultSet rs = pst.executeQuery();
				while (rs.next()) {
				
				JSONObject json = new JSONObject();
				ResultSetMetaData metaData = rs.getMetaData();
				int columnCount = metaData.getColumnCount();
//				System.out.println(columnCount);

				for (int i = 1; i <= columnCount; i++) {
					String columnName = metaData.getColumnName(i);
					String columnValue = rs.getString(columnName);
					json.put(columnName, columnValue);
				}

				resultList.add(json);
			}
				
			} catch (Exception e) {
				System.out.println("Error: " + e);
				return null;
			}
    
    	return resultList;
	}	


	public List<JSONObject> getSongDetails(String artistName){
		 List<JSONObject> songList = new ArrayList<>();
		 try{
			String selectQuery = "SELECT * FROM song_details WHERE artists_name = ?";
				PreparedStatement pst = DBConnection.getConnection(selectQuery);
				pst.setString(1, artistName);
				ResultSet rs = pst.executeQuery();
				while (rs.next()) {
				
				JSONObject json = new JSONObject();
				ResultSetMetaData metaData = rs.getMetaData();
				int columnCount = metaData.getColumnCount();


				for (int i = 1; i <= columnCount; i++) {
					String columnName = metaData.getColumnName(i);
					String columnValue = rs.getString(columnName);
					json.put(columnName, columnValue);
				}
				songList.add(json);	
		 }
		 }catch(Exception e){
			System.out.println("Error:"+e);
			return null;
		 }		 
		 return songList;
	}	
	
	public List<JSONObject> getSongFromName(String songName){
		 List<JSONObject> divList = new ArrayList<>();
		 try{
			String selectQuery = "SELECT * FROM song_details WHERE song_name = ?";
				PreparedStatement pst = DBConnection.getConnection(selectQuery);
				pst.setString(1, songName);
				ResultSet rs = pst.executeQuery();
				while (rs.next()) {
				
				JSONObject json = new JSONObject();
				ResultSetMetaData metaData = rs.getMetaData();
				int columnCount = metaData.getColumnCount();


				for (int i = 1; i <= columnCount; i++) {
					String columnName = metaData.getColumnName(i);
					String columnValue = rs.getString(columnName);
					json.put(columnName, columnValue);
				}
				divList.add(json);	
		 }
		 }catch(Exception e){
			System.out.println("Error:"+e);
			return null;
		 }		 
		 return divList;
	}
	
	public List<JSONObject> getSongsFromId(int id){
		 List<JSONObject> idSongList = new ArrayList<>();
		 try{
			String selectQuery = "SELECT * FROM song_details WHERE newSongID = ?";
				PreparedStatement pst = DBConnection.getConnection(selectQuery);
				pst.setInt(1, id);
				ResultSet rs = pst.executeQuery();
				while (rs.next()) {
				
				JSONObject json = new JSONObject();
				ResultSetMetaData metaData = rs.getMetaData();
				int columnCount = metaData.getColumnCount();


				for (int i = 1; i <= columnCount; i++) {
					String columnName = metaData.getColumnName(i);
					String columnValue = rs.getString(columnName);
					json.put(columnName, columnValue);
				}
				idSongList.add(json);	
		 }
		 }catch(Exception e){
			System.out.println("Error:"+e);
			return null;
		 }		 
		 return idSongList;
	}
}
