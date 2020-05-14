package be.isl.gestionlivraisons.service;

import be.isl.gestionlivraisons.model.Order;
import be.isl.gestionlivraisons.model.Ride;
import be.isl.gestionlivraisons.model.User;
import be.isl.gestionlivraisons.model.dto.RideDto;
import be.isl.gestionlivraisons.model.enums.DeliveryType;
import be.isl.gestionlivraisons.repository.OrderRepository;
import be.isl.gestionlivraisons.repository.RideRepository;
import be.isl.gestionlivraisons.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Pierre-Yves Crutzen
 */

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public RideService(
            final RideRepository rideRepository,
            final UserRepository userRepository,
            final OrderRepository orderRepository
    ) {
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public List<Ride> getRidesByDeliveryType(
//            Long userId,
                                             String type) {
//        List<Order> orders = orderRepository.findByUserId(userId);
//        List<Ride> rides = rideRepository.findByDeliveryType(DeliveryType.valueOf(type));
//        rides.removeAll(rideRepository.findByOrders(orders));
//        return rides;
        return rideRepository.findByDeliveryType(DeliveryType.valueOf(type));
    }
    
    public List<Ride> getRidesByUserAndDeliveryType(Long userId, String type) {
//        List<Order> orders = orderRepository.findByUserId(userId);
//        List<Ride> rides = rideRepository.findByUserIdAndDeliveryType(userId, DeliveryType.valueOf(type));
//        rides.removeAll(rideRepository.findByOrders(orders));
//        return rides;
        return rideRepository.findByUserIdAndDeliveryType(userId, DeliveryType.valueOf(type));
    }
    
    public Ride getRideById(String rideId) {
        return rideRepository.findById(Long.valueOf(rideId));
    }
    
    public Ride create(final RideDto rideDto, final Long userId) {
        Ride ride = new Ride();
        ride.setStartingAddress(rideDto.getStartingAddress());
        ride.setStartingCity(rideDto.getStartingCity());
        ride.setStartingZipCode(rideDto.getStartingZipCode());
        ride.setStartingCountry(rideDto.getStartingCountry());
        ride.setDestinationAddress(rideDto.getDestinationAddress());
        ride.setDestinationCity(rideDto.getDestinationCity());
        ride.setDestinationZipCode(rideDto.getDestinationZipCode());
        ride.setDestinationCountry(rideDto.getDestinationCountry());
        ride.setDeliveryDate(rideDto.getDeliveryDate());
        ride.setMaxMass(rideDto.getMaxMass());
        ride.setMaxVolume(rideDto.getMaxVolume());
        ride.setPrice(rideDto.getPrice());
        ride.setDistance(Double.valueOf(rideDto.getDistance()));
        ride.setDuration(Double.valueOf(rideDto.getDuration()));
        ride.setDeliveryType(DeliveryType.valueOf(rideDto.getDeliveryType()));
        ride.setMaximumDistance(BigDecimal.valueOf(rideDto.getMaximumDistance()));

        User user = userRepository.findById(userId).get();
        ride.setUser(user);
    
        return this.rideRepository.save(ride);
    }

    public List<Ride> getRidesByStartingCityAndDestinationCityAndDeliveryType(String startingCity, String destinationCity, String deliveryType) {
        if (startingCity.length() == 0 && destinationCity.length() == 0) {
            return rideRepository.findByDeliveryType(DeliveryType.valueOf(deliveryType));
        } else if (startingCity.length() == 0 && destinationCity.length() != 0) {
            return rideRepository.findByDestinationCityAndDeliveryType(destinationCity, DeliveryType.valueOf(deliveryType));
        } else if (startingCity.length() != 0 && destinationCity.length() == 0) {
            return rideRepository.findByStartingCityAndDeliveryType(startingCity, DeliveryType.valueOf(deliveryType));
        } else {
            return rideRepository.findByStartingCityAndDestinationCityAndDeliveryType(startingCity, destinationCity, DeliveryType.valueOf(deliveryType));
        }
    }
}
