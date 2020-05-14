package be.isl.gestionlivraisons.controller;

import be.isl.gestionlivraisons.exception.BadRequestException;
import be.isl.gestionlivraisons.model.Order;
import be.isl.gestionlivraisons.model.Ride;
import be.isl.gestionlivraisons.model.dto.OrderPackageDto;
import be.isl.gestionlivraisons.security.CurrentUser;
import be.isl.gestionlivraisons.security.UserPrincipal;
import be.isl.gestionlivraisons.service.OrderService;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.io.Console;
import java.util.List;
import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 */

@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            final OrderService orderService
    ) {
        this.orderService = orderService;
    }

    @RequestMapping(value = "/order/{rideId}", method = RequestMethod.POST)
//    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Charge> createOrder(@CurrentUser UserPrincipal userPrincipal,
                                              @PathVariable("rideId") String rideId,
                                              @RequestBody OrderPackageDto orderPackage
    ) throws Exception {
        if (userPrincipal == null || rideId == null || orderPackage == null
                || orderPackage.getStripeToken() == null
                || orderPackage.getOrderDto().getCalculatedPrice() == null
        ) {
            throw new BadRequestException("Cannot order ride with id: " + rideId);
        }

        Order order = orderService.create(userPrincipal.getId(), Long.valueOf(rideId), orderPackage);
        return new ResponseEntity(order, HttpStatus.OK);
    }

    @GetMapping("/order/my-orders")
//    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Iterable<Order>> getMyAllOrders(@CurrentUser UserPrincipal userPrincipal) {

        ResponseEntity<Iterable<Order>> responseEntity;
        Iterable<Order> order;
        List<Order> orderList;
        orderList = orderService.getOrdersByUserId(userPrincipal.getId());
        order = orderService.getOrdersByUserId(userPrincipal.getId());

        responseEntity = new ResponseEntity<>(orderList, HttpStatus.OK);

        return responseEntity;
    }

    @DeleteMapping(value = "/order/delete")
    public ResponseEntity<Iterable<Order>> delete(@CurrentUser UserPrincipal userPrincipal, @RequestParam("uuid") UUID uuid)
    {
        //trouver l order correspondant à l uuid
        Order order = orderService.getOrderByUuid (uuid);

        //le suprimer
        orderService.delete(order);

        //retourner la liste des orders mise à jour
        ResponseEntity<Iterable<Order>> responseEntity;
        List<Order> orderList;
        orderList = orderService.getOrdersByUserId(userPrincipal.getId());

        responseEntity = new ResponseEntity<>(orderList, HttpStatus.OK);

        return responseEntity;
    }

}
