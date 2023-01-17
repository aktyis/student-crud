package com.example.demoCrud.service;

import com.example.demoCrud.model.Student;
import com.example.demoCrud.repository.StudentRepository;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

  @Autowired
  private final StudentRepository studentRepository;

  public StudentServiceImpl(StudentRepository studentRepository) {
    this.studentRepository = studentRepository;
  }

  @Override
  public List<Student> findAll() {
    List<Student> students = studentRepository.findAll();
    return students;
  }

  @Override
  public Student findById(long id) {
    return studentRepository.getById(id);
  }

  @Override
  public Student save(Student student) throws IOException {
    return studentRepository.save(student);
  }

  @Override
  public void deleteById(long id) {
    studentRepository.deleteById(id);

  }
}
