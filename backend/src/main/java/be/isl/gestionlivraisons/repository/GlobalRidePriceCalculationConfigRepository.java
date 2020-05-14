package be.isl.gestionlivraisons.repository;

import be.isl.gestionlivraisons.model.GlobalRidePriceCalculationConfig;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalRidePriceCalculationConfigRepository extends CrudRepository<GlobalRidePriceCalculationConfig, String> {

    GlobalRidePriceCalculationConfig findById(Long id);

}
