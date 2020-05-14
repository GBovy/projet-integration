package be.isl.gestionlivraisons.repository;

import be.isl.gestionlivraisons.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Pierre-Yves Crutzen
 */

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
}
