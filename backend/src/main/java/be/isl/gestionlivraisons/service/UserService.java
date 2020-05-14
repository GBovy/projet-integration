package be.isl.gestionlivraisons.service;

import be.isl.gestionlivraisons.exception.BadRequestException;
import be.isl.gestionlivraisons.model.UploadedFile;
import be.isl.gestionlivraisons.model.User;
import be.isl.gestionlivraisons.model.dto.UserDto;
import be.isl.gestionlivraisons.model.enums.AccessRole;
import be.isl.gestionlivraisons.model.enums.AuthProvider;
import be.isl.gestionlivraisons.model.enums.DocumentType;
import be.isl.gestionlivraisons.model.enums.UserRole;
import be.isl.gestionlivraisons.payload.SignUpRequest;
import be.isl.gestionlivraisons.repository.UploadedFileRepository;
import be.isl.gestionlivraisons.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @author Pierre-Yves Crutzen
 *
 * Contains the business logic and the DAO binding logic to the model persistence.
 *
 * Used between UserController and User model to create the logic.
 * TODO: Must be splitted in UserService and UserDao later
 */

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UploadedFileRepository uploadedFileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            final UserRepository userRepository,
            final UploadedFileRepository uploadedFileRepository,
            final PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.uploadedFileRepository = uploadedFileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User create(SignUpRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        // Creating user's account
        User user = new User();
        user.setUuid(UUID.randomUUID());
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);

        // Set default roles to user
        user.setAccessRole(AccessRole.NORMAL);
        user.setUserRole(UserRole.CLIENT);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User updateUserFile(Long userId, MultipartFile file, String fileName) throws IOException {

        return userRepository.findById(userId)
                .map(user -> {

                    // setting documents (this condition must stay before setting roles)
                    // UserRole.LIVREUR.equals(user.getUserRole()) &&
                    if (fileName != null) {
                        DocumentType documentType = DocumentType.valueOf(fileName);
                        UploadedFile uploadedFile = uploadedFileRepository.findByDocumentTypeAndUser(documentType, user);
                        if (uploadedFile == null) {
                            try {
                                uploadedFile = new UploadedFile(
                                        file.getOriginalFilename(),
                                        file.getContentType(),
                                        file.getBytes(),
                                        documentType);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
    //                        if (fileName.equals(DocumentType.greenCard)) {
    //                            if (user.getUploadedFiles().size() > 0
    //                                    && user.getUploadedFiles()
    //                                    && user.getUploadedFiles().contains(DocumentType.greenCard)) {
    //
    //                            }
    //                            uploadedFile.setDocumentType(DocumentType.greenCard);


    //                        }
    //                        if (fileName.equals(DocumentType.drivingLicence)) {
    //                            uploadedFile = uploadedFileRepository.findByDocumentTypeAndUserId(
    //                                    DocumentType.drivingLicence, Long userId);
    //                            uploadedFile.setDocumentType(DocumentType.drivingLicence);
    //                        }
    //                        if (fileName.equals(DocumentType.insuranceDocument)) {
    //                            uploadedFile.setDocumentType(DocumentType.insuranceDocument);
    //                        }

                        }
                        uploadedFile.setUser(user);
                        uploadedFileRepository.save(uploadedFile);

//                            Set uploadedFiles = new HashSet<UploadedFile>();
//                            uploadedFiles.add(uploadedFile);
//                            user.setUploadedFiles(uploadedFiles);
//                            userRepository.save(user);
                    }
//                    return userRepository.save(user);
                    return user;
                }).get();
//           });

    }

    /**
     * Updating user and persisting in database.
     * @param userId technical id.
     * @param userDto dto from the frontend.
     * @return the user data.
     */
    public User updateUser(Long userId, UserDto userDto) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setFirstname(userDto.getFirstname());
                    user.setLastname(userDto.getLastname());
                    if (userDto.getPassword() != null){
                        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
                    }
                    user.setAddress(userDto.getAddress());
                    user.setCity(userDto.getCity());
                    user.setZipCode(userDto.getZipCode());
                    user.setCountry(userDto.getCountry());
                    user.setBankingAccount(userDto.getBankingAccount());
//                    user.setCreditCard(userDto.getCreditCard());
//                    user.setCreditCardValidity(userDto.getCreditCardValidity());
                    user.setPaypal(userDto.getPaypal());
//                    // setting documents (this condition must stay before setting roles)
//                    if (UserRole.LIVREUR.equals(user.getUserRole())) {
//                        try {
//                            if (user.getGreenCard() != null) {
//                                user.setGreenCard(userDto.getGreenCard());
//                            }
//                            if (user.getDrivingLicence() != null) {
//                                user.setDrivingLicence(userDto.getDrivingLicence());
//                            }
//                            if (user.getInsuranceDocument() != null) {
//                                user.setInsuranceDocument(userDto.getInsuranceDocument());
//                            }
//                        } catch (IOException e) {
//                            e.printStackTrace();
//                        }
//                    }
                    user.setVehicleModel(userDto.getVehicleModel());
                    user.setVehicleYear(userDto.getVehicleYear());
                    // setting roles
                    user.setUserRole(userDto.getUserRole());
                    user.setImageUrl(userDto.getImageUrl());

                    // must stay at last position

                    // Check if profile completed
                    user.setProfileCompleted(checkRoleAndProfileCompleted(user));

                    return userRepository.save(user);
                }).get();
    }

    private Boolean checkRoleAndProfileCompleted(User user) {
        boolean completed = false;
        if (user != null && user.getUserRole() != null
                && user.getFirstname() != null && user.getFirstname().length() > 0
                && user.getLastname() != null && user.getLastname().length() > 0
                && user.getEmail() != null && user.getEmail().length() > 0
                && user.getPassword() != null && user.getPassword().length() > 0
                && user.getAddress() != null && user.getAddress().length() > 0
                && user.getCountry() != null && user.getCountry().length() > 0
                && user.getZipCode() != null && user.getZipCode().length() > 0
                && user.getCity() != null && user.getCity().length() > 0
                && user.getBankingAccount() != null && user.getBankingAccount().length() > 0
                //&& user.getCreditCard() != null && user.getCreditCard().length() > 0
                && //((user.getCreditCardValidity() != null && user.getCreditCardValidity().length() > 0) ||
                (user.getPaypal() != null && user.getPaypal().length() > 0)
        //)
            ) {
                if (UserRole.CLIENT.equals(user.getUserRole()) || (
                        UserRole.LIVREUR.equals(user.getUserRole())
                                && user.getUploadedFiles().size() == 3
//                                && user.getUploadedFiles().contains(DocumentType.greenCard)
//                                && user.getUploadedFiles().contains(DocumentType.drivingLicence)
//                                && user.getUploadedFiles().contains(DocumentType.insuranceDocument)
//                                && user.getUploadedFiles().stream().allMatch(e ->
//                                     (DocumentType.greenCard.equals(e.getDocumentType())
//                                            && DocumentType.drivingLicence.equals(e.getDocumentType())
//                                            && DocumentType.insuranceDocument.equals(e.getDocumentType()))
//                                )
//                    && user.getUploadedFiles().stream().map(uploadedFile -> {
//                    DocumentType.GREEN_CARD.equals(uploadedFile.getDocumentType())
//                            && DocumentType.DRIVING_LICENCE.equals(uploadedFile.getDocumentType())
//                            && DocumentType.INSURANCE.equals(uploadedFile.getDocumentType())
//                    }))
//                        && DocumentType.DRIVING_LICENCE.equals(user.getUploadedFiles().getDocumentType())
//                        && DocumentType.INSURANCE.equals(user.getUploadedFiles().getDocumentType())
//                    && user.getGreenCard() != null && user.getGreenCard().getFile() != null && user.getGreenCard().getFile().length > 0
//                    && user.getDrivingLicence() != null && user.getDrivingLicence().getFile() != null && user.getDrivingLicence().getFile().length > 0
//                    && user.getInsuranceDocument() != null && user.getInsuranceDocument().getFile() != null && user.getInsuranceDocument().getFile().length > 0
                    && user.getVehicleModel() != null && user.getVehicleModel().length() > 0
                    && user.getVehicleYear() != null && user.getVehicleYear().length() > 0
                )) {
                    completed = true;
                }

            }
        return completed;
    }
}
