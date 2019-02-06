package com.petshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.petshop.model.Cliente;
import com.petshop.repository.ClienteRepository;

@Controller
public class ClienteController {
	
	@Autowired
	private ClienteRepository clienteRepo;

	@RequestMapping(value="/clientes")
	public ModelAndView clientes() {
		ModelAndView modelAndView = new ModelAndView("/cliente/clientes");
		modelAndView.addObject("clientes", clienteRepo.findAll());
		return modelAndView;
	}
	
	@RequestMapping(value="/clienteNovo")
	public ModelAndView clienteNovo() {
		Cliente cliente = new Cliente();
		ModelAndView modelAndView = new ModelAndView("/cliente/clienteNovo");
		modelAndView.addObject(cliente);
		return modelAndView;
	}
	
	@PostMapping("/cliente")
	public String salvar(Cliente cliente) {
		if(!cliente.getNome().equals("")) {
			this.clienteRepo.save(cliente);
		}
		return "redirect:/clientes";
	}
	
	
	@GetMapping("/cliente/delete/{id}")
	public String delete(@PathVariable("id") Long id) {
		clienteRepo.delete(id);
		return "redirect:/clientes";
	}
	
	@GetMapping("/cliente/edit/{id}")
	public ModelAndView edite(@PathVariable("id") Long id) {
		Cliente cliente = clienteRepo.findOne(id);
		ModelAndView modelAndView = new ModelAndView("/cliente/clienteNovo");
		modelAndView.addObject(cliente);
		return modelAndView;
	}
}
