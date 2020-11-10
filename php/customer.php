<?php
class Customer {
    private $con;
    
    public $given_name;
    public $surname;
    public $email;
    public $payer_id;
    public $id;

    public function __construct($db) {
        $this->con = $db;
    }

    function customerExists() {
        $query = "SELECT * FROM customers WHERE email = :email";

        $stmt = $this->con->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        // email already in database 
        // populate customer object
        // return true
        if ($stmt->rowCount() > 0) {
            // get record
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row["id"];
            $this->given_name = $row["given_name"];
            $this->surname = $row["surname"];
            $this->email = $row["email"];
            $this->payer_id = $row["payer_id"];

            return true;
        } 
        
        // else no customer with that email exists
        else {
            return false;
        }
    }

    function create() {
        $query = "INSERT INTO customers (given_name, surname, email, payer_id) VALUES (:given_name, :surname, :email, :payer_id)";
        
        $stmt = $this->con->prepare($query);
        
        $stmt->bindParam(":given_name", $this->given_name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":payer_id", $this->payer_id);

        // execute statement
        if ($stmt->execute()) {
            return true;
        }
        else {
            return false;
        }
    }

    function readOne() {
        $query = "SELECT * FROM customers WHERE email = :email";
        
        $stmt = $this->con->prepare($query);
        
        $stmt->bindParam(":email", $this->email);

        // execute statement
        $stmt->execute();

        // populate user object
        if ($stmt->rowCount() > 0) {
            // get record
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row["id"];
            $this->email = $row["email"];
            $this->given_name = $row["given_name"];
            $this->surname = $row["surname"];
            $this->payer_id = $row["payer_id"];

            return true;
        } 
        
        // else no user with that id exists
        else {
            return false;
        }
    }
}
?>