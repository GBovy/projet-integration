package be.isl.gestionlivraisons.controller;

import be.isl.gestionlivraisons.model.Package;
import be.isl.gestionlivraisons.repository.PackageRepository;
import be.isl.gestionlivraisons.security.CurrentUser;
import be.isl.gestionlivraisons.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pierre-Yves Crutzen
 */

@RestController
public class PackageController {

//    @Autowired
//    PackageRepository packageRepository;
//
//    @GetMapping("/packages")
////    @PreAuthorize("hasRole('ROLE_USER')")
//    public Iterable<Package> getAllPackages(@CurrentUser UserPrincipal userPrincipal) {
//        return packageRepository.findAll();
//    }
    
}
