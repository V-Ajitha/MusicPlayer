package com.music;

import java.io.IOException;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MusicController {
	
	@RequestMapping("/")
	public String indexPage() {
		return "mainPage.html";
	}

	@RequestMapping("/searchCategory")
	public void artistDetails(@ModelAttribute MainFunctions mainFunc, HttpServletResponse response) throws IOException {
		
		List<JSONObject> result = mainFunc.getCatagoryDetails();

	    response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	    out.println(result.toString());
	}

	@RequestMapping("/getsongdetails")
	public void songDetails(@RequestParam("category") String name,@ModelAttribute MainFunctions mainFunc, HttpServletResponse response) throws IOException{

		List<JSONObject> songs = mainFunc.getSongDetails(name);
		
		response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	    out.println(songs.toString());
	}
	
	@RequestMapping("/songName")
	public void songFromName(@RequestParam("songName") String name,@ModelAttribute MainFunctions mainFunc, HttpServletResponse response) throws IOException{

		List<JSONObject> songs = mainFunc.getSongFromName(name);
		
		response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	    out.println(songs.toString());
	}

	@RequestMapping("/getSongsUsingSongId")
	public void songDetailsfromID(@RequestParam("songID") int id,@ModelAttribute MainFunctions mainFunc, HttpServletResponse response) throws IOException{

		List<JSONObject> songs = mainFunc.getSongsFromId(id);
		
		response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	    out.println(songs.toString());
	}

}




