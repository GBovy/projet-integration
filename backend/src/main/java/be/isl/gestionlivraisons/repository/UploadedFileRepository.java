package be.isl.gestionlivraisons.repository;

import be.isl.gestionlivraisons.model.UploadedFile;
import be.isl.gestionlivraisons.model.User;
import be.isl.gestionlivraisons.model.enums.DocumentType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Pierre-Yves Crutzen
 */

@Repository
@Transactional
public interface UploadedFileRepository extends CrudRepository<UploadedFile, Long> {

    UploadedFile findByDocumentTypeAndUser(DocumentType documentType, User user);
}
