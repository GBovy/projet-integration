package be.isl.gestionlivraisons.security.oauth2.user;


import be.isl.gestionlivraisons.exception.OAuth2AuthenticationProcessingException;
import be.isl.gestionlivraisons.model.enums.AuthProvider;

import java.util.Map;

/**
 * @author Pierre-Yves Crutzen
 */

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
