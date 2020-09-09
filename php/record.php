<?php
class Record {
    private $con;
    private $tableName = "Records";

    public $productId;
    public $artist;
    public $title;
    public $condition;
    public $category;
    public $price;

    public function __construct($db) {
        $this->con = $db;
    }

    function read() {
        $query = "SELECT * FROM " . $this->tableName . " ORDER BY Artist";

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function search($field, $term) {
        $term = strtolower($term);
        $query = "SELECT * FROM " . $this->tableName . " WHERE LOWER(" . $field . ") LIKE '%" . $term . "%' ORDER BY Artist"; 
        
        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>