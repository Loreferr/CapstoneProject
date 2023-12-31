package com.epicode.Spring.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epicode.Spring.classes.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {

	List<Review> findByAuthor(String author);

	List<Review> findByCity(String city);

}
