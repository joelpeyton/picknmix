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
}
?>