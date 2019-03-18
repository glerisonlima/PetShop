package com.petshop.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.petshop.model.Animal;
import com.petshop.model.Cliente;

@Controller
public class AnimalController {

	@GetMapping(value="/animais")
	public ModelAndView animais() {
		ModelAndView modelandview = new ModelAndView("animal/animais");
		return modelandview ;
	}
	
	@RequestMapping(value="/animalNovo")
	public ModelAndView animalNovo() {
		Animal animal = new Animal();
		ModelAndView modelAndView = new ModelAndView("/animal/animalNovo");
		modelAndView.addObject(animal);
		return modelAndView;
	}
	
	@ModelAttribute("cliente")
	public Cliente getCliente(){
		return new Cliente();
	}
}
