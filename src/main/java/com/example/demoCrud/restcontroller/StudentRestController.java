package com.example.demoCrud.restcontroller;

import com.example.demoCrud.exception.ResourceNotFoundException;
import com.example.demoCrud.model.Student;
import com.example.demoCrud.repository.StudentRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
public class StudentRestController {
    @Autowired
    private StudentRepository studentRepository;

    public StudentRestController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentRestController() {
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {

        List<Student> students = studentRepository.findAll();
        return students;
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable(value = "id") Long studentId)
            throws ResourceNotFoundException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + studentId));
        return ResponseEntity.ok().body(student);
    }

    @PostMapping("/student")
    public Student createStudent(@Valid @RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PostMapping("/student/update")
    public ResponseEntity<Student> updateStudent(
             @RequestBody Student studentDetails) throws ResourceNotFoundException {
        System.out.println("controller hit");
        Student student = studentRepository.findById(studentDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found for this id :: " + studentDetails.getId()));

        student.setId(studentDetails.getId());
        student.setName(studentDetails.getName());
        student.setGender(studentDetails.getGender());
        student.setBirthDate(studentDetails.getBirthDate());
        student.setDescription(studentDetails.getDescription());
         Student updatedStudent = studentRepository.save(student);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/student/{id}")
    public Map<String, Boolean> deleteStudent(@PathVariable(value = "id") Long studentId)
            throws ResourceNotFoundException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found for this id :: " + studentId));

        studentRepository.delete(student);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    @PostMapping("/deletestudent/{id}")
    public Map<String, Boolean> delete(@PathVariable(value = "id") Long studentId)
            throws ResourceNotFoundException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found for this id :: " + studentId));

        studentRepository.delete(student);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
