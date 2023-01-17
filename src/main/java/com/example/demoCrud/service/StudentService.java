package com.example.demoCrud.service;

import com.example.demoCrud.model.Student;
import java.io.IOException;
import java.util.List;

public interface StudentService {
    public List<Student> findAll();

    public Student findById(long id);

    public Student save(Student student) throws IOException;

    public void deleteById(long id);
}
