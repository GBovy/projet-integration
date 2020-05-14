package be.isl.gestionlivraisons.model.dto;

import com.stripe.model.Token;

/**
 * @author Pierre-Yves Crutzen
 */

public class OrderPackageDto {

    private PackageDto packageDto;
    private OrderDto orderDto;
//    private Token tokenDto;
    private String stripeToken;

    public String getStripeToken() {
        return stripeToken;
    }

    public void setStripeToken(String stripeToken) {
        this.stripeToken = stripeToken;
    }

    public PackageDto getPackageDto() {
        return packageDto;
    }

    public void setPackageDto(PackageDto packageDto) {
        this.packageDto = packageDto;
    }

    public OrderDto getOrderDto() {
        return orderDto;
    }

    public void setOrderDto(OrderDto orderDto) {
        this.orderDto = orderDto;
    }

//    public Token getTokenDto() {
//        return tokenDto;
//    }
//
//    public void setTokenDto(Token tokenDto) {
//        this.tokenDto = tokenDto;
//    }
}
