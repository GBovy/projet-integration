##         How to set up and start the project          

##### 1. Create empty schema projet-integration
##### 2. Set properties to :
    - spring.jpa.hibernate.dll-auto: create
    - flyway.baseline-on-migrate: false
    - flyway.enabled: false
##### 3. Start the project to initialize the database
##### 4. Stop the server
##### 5. Set properties to :
    - spring.jpa.hibernate.dll-auto: validate
    - flyway.baseline-on-migrate: true 
    - flyway.enabled: true
##### 6. Set properties to :
     - spring.jpa.hibernate.dll-auto: validate
     - flyway.baseline-on-migrate: true 
     - flyway.enabled: false
