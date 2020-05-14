package be.isl.gestionlivraisons.repository;

import be.isl.gestionlivraisons.model.Order;
import be.isl.gestionlivraisons.model.Ride;
import be.isl.gestionlivraisons.model.enums.DeliveryType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author Pierre-Yves Crutzen
 */

@Repository
public interface RideRepository extends CrudRepository<Ride, String> {

    List<Ride> findByDeliveryType(DeliveryType type);

    List<Ride> findByUserIdAndDeliveryType(Long id, DeliveryType type);

    Ride findById(Long id);

    List<Ride> findByStartingCityAndDeliveryType(String startingCity, DeliveryType deliveryType);

    List<Ride> findByDestinationCityAndDeliveryType(String destinationCity, DeliveryType deliveryType);

    List<Ride> findByStartingCityAndDestinationCityAndDeliveryType(String startingCity, String destinationCity, DeliveryType deliveryType);

//    List<Ride> findByOrders(List<Order> orders);

}
