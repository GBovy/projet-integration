package be.isl.gestionlivraisons.security.oauth2.user;


import java.util.Map;

/**
 * @author Pierre-Yves Crutzen
 */

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getFirstname() {
        return (String) attributes.get("given_name");
    }

    @Override
    public String getLastname() {
        return (String) attributes.get("family_name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
}
