package be.isl.gestionlivraisons.service;

import be.isl.gestionlivraisons.model.GlobalRidePriceCalculationConfig;
import be.isl.gestionlivraisons.model.dto.CalculateDto;
import be.isl.gestionlivraisons.repository.GlobalRidePriceCalculationConfigRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * @author Pierre-Yves Crutzen
 */

@Service
public class CalculateService {

    private final GlobalRidePriceCalculationConfigRepository globalRidePriceCalculationConfigRepository;

    public CalculateService(final GlobalRidePriceCalculationConfigRepository globalRidePriceCalculationConfigRepository) {
        this.globalRidePriceCalculationConfigRepository = globalRidePriceCalculationConfigRepository;
    }

    public CalculateDto calculateDeliveryProductPrice(CalculateDto calculateDto) {
        BigDecimal distance = BigDecimal.valueOf(Double.valueOf(calculateDto.getDistance())); // Déjà avec décimales
        BigDecimal askedprice = BigDecimal.valueOf(calculateDto.getPrice() / 100); // Conversion avec décimales
//        BigDecimal maxMass = BigDecimal.valueOf(Double.valueOf(calculateDto.getMass()) / 100); // Conversion avec décimales
//        BigDecimal maxVolume = BigDecimal.valueOf(Double.valueOf(calculateDto.getVolume()) / 100); // Conversion avec décimales

        GlobalRidePriceCalculationConfig ridePriceCalculationConfig = this.globalRidePriceCalculationConfigRepository.findById(1L);

        // From configuration parameters
        BigDecimal costByKilometer = ridePriceCalculationConfig.getRideCostByKilometer(); // Coût réel au kilomètre
        BigDecimal commissionByKilometer = ridePriceCalculationConfig.getCommissionByKilometer(); // Commission au kilomètre défini par l'entreprise
        BigDecimal minCommission = ridePriceCalculationConfig.getMinimumComissionByRide(); // Commission minimale liée à la configuration
        BigDecimal ratioKilometerMin = ridePriceCalculationConfig.getRatioKilometerMin(); // Ratio de 1 / ratioKilometerMin
        BigDecimal ratioKilometerMax = ridePriceCalculationConfig.getRatioKilometerMax(); // Ratio de 1 / ratioKilometerMax
        BigDecimal minGainByUser = ridePriceCalculationConfig.getMinGainByUser(); // Prix minimum demandé pour un utilisateur

        // Calcul de commission du trajet de A à B demandée par l'entreprise
        BigDecimal rideCommission = commissionByKilometer.multiply(distance);

        // Calcul de commission prise par l'entreprise
        BigDecimal resultCommission = this.calculateRideCommission(rideCommission, minCommission);

        // Coût réel estimé du trajet du point de départ au point d'arrivée et sans détour.
        BigDecimal rideCost = costByKilometer.multiply(distance);

        BigDecimal commissionPlusMinGain = resultCommission.add(minGainByUser);

        // Prix demandé par le livreur minimum possible pour le détour = (coût réel estimé du trajet * (1 / ratioKilometerMax) + commission
        BigDecimal minimumPrice = calculateMinPrice(rideCost, ratioKilometerMin, resultCommission, commissionPlusMinGain); // TODO: OK // TODO: enregistrer en db pour que lors de la commande, le client ne puisse pas aller en dessous du montant

        // Prix demandé par le livreur maximum possible pour le détour = (coût réel estimé du trajet * (2 / ratioKilometerMax) + commission
        BigDecimal maximumPrice = calculateMaxPrice(rideCost, ratioKilometerMax, resultCommission, commissionPlusMinGain); // TODO: OK // TODO: enregistrer en db pour que lors de la commande, le client ne puisse pas aller en dessous du montant

//        // Calcul du prix demandé par l'utilisateur et au kilomètre = (prix demandé par kilomètre / distance du trajet)
//        BigDecimal askedPriceByKilometer = askedprice.divide(distance, 2, RoundingMode.CEILING);

//        // Cout estimé sur base de la masse par kilomètre = prix au kilomètre / masse max
//        BigDecimal costByKilogramAndKilometer = askedPriceByKilometer.divide(maxMass,2, RoundingMode.CEILING);
//
//        // Cout estimé sur base du volume par kilomètre = prix au kilomètre / volume max
//        BigDecimal costByLiterAndKilometer = askedPriceByKilometer.divide(maxVolume,2, RoundingMode.CEILING);

        // Calcul du prix maximum à pouvoir être demandé par l'utilisateur = prix demandé par kilomètre + (commission par kilomètre * distance)
        BigDecimal price = askedprice.add(resultCommission);

        // Prix calculé = prix >= à min et <= à max
        BigDecimal calculatedPrice = this.calculatePriceAskedByUser(minimumPrice, price, maximumPrice, minGainByUser);

        // Bénéfice pour l'utilisateur = prix calculé - commission.
        BigDecimal totalGain = calculatedPrice.subtract(resultCommission).subtract(rideCost);

        // Distance maximale calculée = distance du trajet * (1/ratio)
        BigDecimal maxDistance = calculateMaxDistance(distance, ratioKilometerMax);

        // Data sent to the frontend
        CalculateDto calculatedResult = new CalculateDto();
        calculatedResult.setRideCost(String.valueOf(rideCost));
        calculatedResult.setCommission(String.valueOf(resultCommission));
        calculatedResult.setMinimumPrice(String.valueOf(minimumPrice));
        calculatedResult.setMaximumPrice(String.valueOf(maximumPrice));
        calculatedResult.setPrice(Double.valueOf(String.valueOf(calculatedPrice)));
        calculatedResult.setTotalGain(String.valueOf(totalGain));
        calculatedResult.setMaximumDistance(Double.valueOf(String.valueOf(maxDistance)));
        return calculatedResult;
    }

    /**
     * Calculated max distance
     * calculated from ride's distance * 1 / maxDistanceRatio in kilometers
     * @param distance ride's distance in kilometers
     * @param ratioKilometerMax the ratio to calculate the max distance from the configurations
     * @return the maxDistance for the frontend
     */
    private BigDecimal calculateMaxDistance(BigDecimal distance, BigDecimal ratioKilometerMax) {
        return distance.multiply(BigDecimal.valueOf(1).divide(ratioKilometerMax));
    }

    /**
     * Calculated price = (price >= to min anx <= to max.
     * @param minimalPrice Min accepted price
     * @param maximalPrice Max accepted price
     * @param price Price asked by the user + price commission asked by the company
     * @return The asked price by the user.
     */
    private BigDecimal calculatePriceAskedByUser(BigDecimal minimalPrice, BigDecimal price, BigDecimal maximalPrice, BigDecimal minGainByUser) {

        BigDecimal askedPriceByUser;

        if (minimalPrice.compareTo(price) > 0) { // Si prix min > prix demandé
            askedPriceByUser = minimalPrice;
        } else if (maximalPrice.compareTo(price) < 0) { // Si prix max < prix demandé
            askedPriceByUser = maximalPrice;
        } else {
            askedPriceByUser = price;
        }
        return askedPriceByUser;
    }

    /**
     * Calculates the commission asked to the driver by the enterprise with a minimum authorized by the system.
     * @param rideCommission Ride's commission from A to B asked by the company
     * @param minCommission Min commission linked to the configuration defined by the company
     * @return The commission asked by the rider.
     */
    private BigDecimal calculateRideCommission(BigDecimal rideCommission, BigDecimal minCommission) {

        BigDecimal resultCommission;

        // Si commission calculée < commission minimale --> commission min, sinon, commission calculée.
        if (rideCommission.compareTo(minCommission) < 0) {
            resultCommission = minCommission;
        } else {
            resultCommission = rideCommission;
        }
        return resultCommission;
    }

    /**
     * Prix minimum possible = (coût réel estimé du trajet * (1 / ratioKilometerMin) + commission
     * Doit être inférieur à ratioKilometerMax
     * Prix min possible = (commission + bénéfice min) si (minimum calculé < (commission + bénéfice min))
     */
    private BigDecimal calculateMinPrice(BigDecimal rideCost, BigDecimal ratioKilometerMin, BigDecimal rideCommission, BigDecimal commissionPlusMinGain) {
        BigDecimal calculatedMin = (rideCost.multiply(
                BigDecimal.valueOf(1).divide(ratioKilometerMin))
            ).add(rideCommission);
        if (calculatedMin.compareTo(commissionPlusMinGain) < 0) {
            return commissionPlusMinGain;
        }
        return calculatedMin;
    }

    /**
     * Prix max possible = (coût réel estimé du trajet * (1 / ratioKilometerMax) + commission
     * Doit être inférieur à ratioKilometerMin
     * Prix max possible = (commission + bénéfice min) si (maximum calculé < (commission + bénéfice min))
     */
    private BigDecimal calculateMaxPrice(BigDecimal rideCost, BigDecimal ratioKilometerMax, BigDecimal rideCommission, BigDecimal commissionPlusMinGain) {
        BigDecimal calculatedMax = (rideCost.multiply(
                BigDecimal.valueOf(1).divide(ratioKilometerMax))
        ).add(rideCommission);

        if (calculatedMax.compareTo(commissionPlusMinGain) < 0) {
            return commissionPlusMinGain;
        }
        return calculatedMax;
    }
}
