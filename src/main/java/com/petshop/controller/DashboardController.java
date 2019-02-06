package com.petshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DashboardController {

	private final String INDEX = "index";
	
	@RequestMapping(value="/")
	public String index() {
		return INDEX;
	}
}
