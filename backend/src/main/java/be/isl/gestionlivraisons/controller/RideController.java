package be.isl.gestionlivraisons.controller;

import be.isl.gestionlivraisons.exception.BadRequestException;
import be.isl.gestionlivraisons.model.Ride;
import be.isl.gestionlivraisons.model.dto.CalculateDto;
import be.isl.gestionlivraisons.model.dto.RideDto;
import be.isl.gestionlivraisons.security.CurrentUser;
import be.isl.gestionlivraisons.security.UserPrincipal;
import be.isl.gestionlivraisons.service.CalculateService;
import be.isl.gestionlivraisons.service.RideService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Pierre-Yves Crutzen
 */

@RestController
public class RideController {

    private final RideService rideService;
    private final CalculateService calculateService;

    public RideController(
            final RideService rideService,
            final CalculateService calculateService
    ) {
        this.rideService = rideService;
        this.calculateService = calculateService;
    }

    @GetMapping("/rides")
    public ResponseEntity<Iterable<Ride>> getAllRides(@CurrentUser UserPrincipal userPrincipal,
                                                      @RequestParam("type") String rideType) {
        if (rideType == null || userPrincipal == null) {
            throw new BadRequestException("Cannot get rides.");
        }
        return new ResponseEntity<>(rideService.getRidesByDeliveryType(
//                userPrincipal.getId(),
                rideType), HttpStatus.OK);
    }

    @GetMapping("/ride")
    public ResponseEntity<Ride> getRideById(@CurrentUser UserPrincipal userPrincipal,
                                            @RequestParam("id") String id) {
        if (id == null || userPrincipal == null) {
            throw new BadRequestException("Cannot get ride.");
        }
        return new ResponseEntity<>(rideService.getRideById(id), HttpStatus.OK);
    }

    @PostMapping("/ride")
    public ResponseEntity<Ride> create(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestBody RideDto rideDto
    ) {
        if (rideDto == null || userPrincipal == null) {
            throw new BadRequestException("Cannot create ride.");
        }
        return new ResponseEntity<>(rideService.create(rideDto, userPrincipal.getId()), HttpStatus.OK);
    }

    @PostMapping("/ride/calculate")
    public ResponseEntity<CalculateDto> calculate(@CurrentUser UserPrincipal userPrincipal,
                                                  @RequestBody CalculateDto calculateDto
    ) {
        if (calculateDto == null || userPrincipal == null) {
            throw new BadRequestException("Cannot calculate ride.");
        }
        return new ResponseEntity<>(calculateService.calculateDeliveryProductPrice(calculateDto), HttpStatus.OK);
    }

    @GetMapping("/my-rides")
    public ResponseEntity<Iterable<Ride>> getMyAllRides(@CurrentUser UserPrincipal userPrincipal,
                                                        @RequestParam("type") String rideType) {
        if (rideType == null) {
            throw new BadRequestException("Ride type of undefined.");
        }
        return new ResponseEntity<>(rideService.getRidesByUserAndDeliveryType(userPrincipal.getId(), rideType), HttpStatus.OK);
    }

    @GetMapping("/search-products")
    public Iterable<Ride> getRidesByStartingCity(@CurrentUser UserPrincipal userPrincipal,
                                                 @RequestParam("startingCity") String startingCity,
                                                 @RequestParam("destinationCity") String destinationCity,
                                                 @RequestParam("deliveryType") String deliveryType
    ) {
        if (startingCity == null || destinationCity == null || deliveryType == null) {
            throw new BadRequestException("Missing parameter.");
        }
        return rideService.getRidesByStartingCityAndDestinationCityAndDeliveryType(startingCity, destinationCity, deliveryType);
    }

}
