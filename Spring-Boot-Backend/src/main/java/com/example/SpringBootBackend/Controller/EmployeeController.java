package com.example.SpringBootBackend.Controller;

import com.example.SpringBootBackend.Model.Employee;
import com.example.SpringBootBackend.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    //Get all employees
    @GetMapping("employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // Create employee
    @PostMapping("employees")
    public Employee createEmployee (@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }
}
