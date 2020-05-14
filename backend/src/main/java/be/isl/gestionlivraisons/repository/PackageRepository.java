package be.isl.gestionlivraisons.repository;

import be.isl.gestionlivraisons.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Pierre-Yves Crutzen
 */

@Repository
public interface PackageRepository extends JpaRepository<Package, String> {

    @Override
    void delete(Package deleted);
}
