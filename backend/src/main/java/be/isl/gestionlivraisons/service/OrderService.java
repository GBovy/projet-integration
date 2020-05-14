package be.isl.gestionlivraisons.service;

import be.isl.gestionlivraisons.exception.BadRequestException;
import be.isl.gestionlivraisons.model.Order;
import be.isl.gestionlivraisons.model.Package;
import be.isl.gestionlivraisons.model.Ride;
import be.isl.gestionlivraisons.model.User;
import be.isl.gestionlivraisons.model.dto.OrderDto;
import be.isl.gestionlivraisons.model.dto.OrderPackageDto;
import be.isl.gestionlivraisons.model.dto.PackageDto;
import be.isl.gestionlivraisons.model.enums.OrderStatus;
import be.isl.gestionlivraisons.repository.OrderRepository;
import be.isl.gestionlivraisons.repository.PackageRepository;
import be.isl.gestionlivraisons.repository.RideRepository;
import be.isl.gestionlivraisons.repository.UserRepository;
import be.isl.gestionlivraisons.service.component.StripeClient;
import com.stripe.model.Charge;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 */

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RideRepository rideRepository;
    private final PackageRepository packageRepository;
    private final StripeClient stripeClient;
    private final UserRepository userRepository;

    public OrderService(
            final OrderRepository orderRepository,
            final RideRepository rideRepository,
            final PackageRepository packageRepository,
            final StripeClient stripeClient,
            final UserRepository userRepository
    ) {
        this.orderRepository = orderRepository;
        this.rideRepository = rideRepository;
        this.packageRepository = packageRepository;
        this.stripeClient = stripeClient;
        this.userRepository = userRepository;
    }

    public Order getOrderByUuid (UUID uuid)
    {
        return orderRepository.findByUuid(uuid);
    }

    public void delete(Order order) {orderRepository.delete(order);}

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order create(Long userId, Long rideId, OrderPackageDto orderPackageDto) throws Exception {
        Ride ride = rideRepository.findById(rideId);
        if (ride == null) {
            throw new IllegalArgumentException("Not any ride with the id : " + rideId.toString());
        }

        Order order;
        if (orderRepository.findByRide(ride) != null) {
            throw new BadRequestException("The order for this ride already exists : " + rideId);
        } else {
            Charge charge = stripeClient.chargeCreditCard(
                    orderPackageDto.getStripeToken(),
                    orderPackageDto.getOrderDto().getCalculatedPrice());
            order = generateOrderFromRide(userId, ride, orderPackageDto, charge);
            orderRepository.save(order);
        }
        return order;
    }

    private Order generateOrderFromRide(Long userId, Ride ride, OrderPackageDto orderPackageDto, Charge stripeCharge) {

        PackageDto packageDto = orderPackageDto.getPackageDto();
        OrderDto orderDto = orderPackageDto.getOrderDto();

        Package pack = new Package();
//        pack.setDescription(packageDto.getDescription());
//        pack.setPrice(packageDto.getPrice());
        pack.setMass(Double.valueOf(packageDto.getMass()));
        pack.setVolume(Double.valueOf(packageDto.getVolume()));
        pack.setPickUpAddress(packageDto.getPickUpAddress());
        pack.setPickUpCity(packageDto.getPickUpCity());
        pack.setPickUpZipCode(packageDto.getPickUpZipCode());
        pack.setPickUpCountry(packageDto.getPickUpCountry());
        pack.setRide(ride);
        packageRepository.save(pack);

        Order order = new Order();
        order.setUuid(UUID.randomUUID());
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setDeliveryCity(orderDto.getDeliveryCity());
        order.setDeliveryZipCode(orderDto.getDeliveryZipCode());
        order.setDeliveryCountry(orderDto.getDeliveryCountry());
        order.setComment(orderDto.getComment());

        boolean paid = stripeCharge != null ? true : false; // TODO: identifier si inutile
        order.setPaid(paid);

        OrderStatus status = paid ? OrderStatus.PAIEMENT_RECU : OrderStatus.PAIEMENT_EN_ATTENTE;
        order.setStatus(status);

        order.setCalculatedPrice(ride.getPrice()); // TODO: Faire le calcul prix

        order.setRide(ride);

        Double mass = order.getRide().getPackages().stream()
                .map(Package::getMass)
                .filter(Objects::nonNull)
                .mapToDouble(Double::doubleValue)
                .sum();
        order.setMass(mass);

        Double volume = order.getRide().getPackages().stream()
                .map(Package::getVolume)
                .filter(Objects::nonNull)
                .mapToDouble(Double::doubleValue)
                .sum();
        order.setVolume(volume);

        User user = userRepository.findById(userId).get();
        order.setUser(user);

        return order;
    }
}
