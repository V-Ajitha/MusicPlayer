package com.music;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DBConnection {
	private static final String Url = "jdbc:mysql://localhost:3306/Music_Player";
	private static final String UserName = "Aji";
	private static final String Password = "Jerry$001";
	
	public static PreparedStatement getConnection(String query) throws SQLException, ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection(Url,UserName,Password);
		PreparedStatement pst = con.prepareStatement(query);
		return pst;
	}
}

