package be.isl.gestionlivraisons.controller;

import be.isl.gestionlivraisons.exception.ResourceNotFoundException;
import be.isl.gestionlivraisons.model.dto.UserDto;
import be.isl.gestionlivraisons.repository.UserRepository;
import be.isl.gestionlivraisons.security.CurrentUser;
import be.isl.gestionlivraisons.security.UserPrincipal;
import be.isl.gestionlivraisons.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @author Pierre-Yves Crutzen
 */

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(
            final UserRepository userRepository,
            final UserService userService
    ) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/user")
//    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        try {
            return new ResponseEntity(new UserDto(userRepository.findById(userPrincipal.getId()).get()), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        }
    }

    @PutMapping(path = "/user")
    public ResponseEntity<UserDto> updateCurrentUser(@CurrentUser UserPrincipal userPrincipal,
                                                     @RequestBody UserDto userInfo) {
        try {
            return new ResponseEntity(new UserDto(userService.updateUser(userPrincipal.getId(), userInfo)), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        }
    }

    @PutMapping(path = "/user/file")
    public ResponseEntity<UserDto> updateUserFile(
            @CurrentUser UserPrincipal userPrincipal,
            @RequestPart("file") MultipartFile file,
            @RequestParam("fileName") String fileName
    ) throws IOException {
        try {
            return new ResponseEntity(new UserDto(userService.updateUserFile(userPrincipal.getId(), file, fileName)), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        }
    }

    @GetMapping("/user/completed")
    public ResponseEntity<Boolean> isUserCompleted(@CurrentUser UserPrincipal userPrincipal) {
        try {
            return new ResponseEntity<>(userRepository.findById(userPrincipal.getId()).get().getProfileCompleted(), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        }
    }
}
