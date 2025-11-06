package swb4.softwareprojekt.bewerbungstracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swb4.softwareprojekt.bewerbungstracker.entity.TestData;

public interface TestDataRepository extends JpaRepository<TestData, Long> {}