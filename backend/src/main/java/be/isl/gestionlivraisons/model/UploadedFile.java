package be.isl.gestionlivraisons.model;

import be.isl.gestionlivraisons.model.enums.DocumentType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "uploaded_files")
public class UploadedFile {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

//    @OneToOne
//    @MapsId
//    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

//    @Lob
    @Column(name = "file", length = 2048)
    private byte[] file;

    @Column(name = "document_type")
    DocumentType documentType;

    public UploadedFile() {
    }

    public UploadedFile(String name, String type, byte[] file, DocumentType documentType) {
        this.name = name;
        this.type = type;
        this.file = file;
        this.documentType = documentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
