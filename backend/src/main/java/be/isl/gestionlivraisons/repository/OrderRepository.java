package be.isl.gestionlivraisons.repository;

import be.isl.gestionlivraisons.model.Order;
import be.isl.gestionlivraisons.model.Ride;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 */

@Repository
public interface OrderRepository extends CrudRepository<Order, String> {

    Order findByRide(Ride ride);

    List<Order> findByUserId(Long id);

    void delete(Order order);

    Order findByUuid(UUID uuid);
}
