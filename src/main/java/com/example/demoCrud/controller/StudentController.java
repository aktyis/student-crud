package com.example.demoCrud.controller;

import com.example.demoCrud.model.Student;
import com.example.demoCrud.service.StudentService;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class StudentController {

  @Autowired
  private StudentService studentService;

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  public StudentController() {

  }

  @RequestMapping({
      "/",
      "/student/list"
  })
  public String viewStudentList(Model model) {
    List<Student> students = studentService.findAll();
    model.addAttribute("students", students);
    return "student/student-list";
  }

  @GetMapping("/student/add")
  public String showForm(Model model) {
    Student student = new Student();
    model.addAttribute("student", student);
    return "student/student-form";
  }

  @PostMapping("/student/add")
  public String saveProduct(@ModelAttribute @Valid Student student, Errors errors, Model model)
      throws IOException {
    if (errors.hasErrors()) {
      return "student/student-form";
    } else {
      studentService.save(student);
      return "redirect:/student/list";
    }
  }

  @GetMapping("/student/edit/{id}")
  public String edit(Model model, @PathVariable("id") long id) {
    Student student = studentService.findById(id);

    model.addAttribute("student", student);

    return "student/student-form";
  }

  @GetMapping("student/delete/{id}")
  public String delete(Model model, @PathVariable("id") long id) {
    studentService.deleteById(id);
    return "redirect:/student/list";
  }
}
