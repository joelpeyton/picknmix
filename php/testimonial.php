<?php
class Testimonial {
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }

    function read() {
        $query = "SELECT * FROM testimonials";

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>