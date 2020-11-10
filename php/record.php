<?php
class Record {
    private $con;
    
    public function __construct($db) {
        $this->con = $db;
    }

    function readFixed() {
        $query = "SELECT * FROM f1
                  UNION ALL
                  SELECT * FROM f2
                  UNION ALL
                  SELECT * FROM f3
                  UNION ALL
                  SELECT * FROM f4
                  UNION ALL
                  SELECT * FROM f5";

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function readIndivid() {
        $query = "SELECT * FROM i1 
                  UNION ALL
                  SELECT * FROM i2
                  UNION ALL
                  SELECT * FROM i3";

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function getCart($tableName, $id) {
        $query = "SELECT * FROM " . $tableName . " WHERE id = " . $id;

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function read($tableName) {
        $query = "SELECT * FROM " . $tableName . " WHERE sold = 0 ORDER BY artist";

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function search($tableName, $field, $term) {
        $term = strtolower($term);
        $query = "SELECT * FROM " . $tableName . " WHERE LOWER(" . $field . ") LIKE '%" . $term . "%' AND sold = 0 ORDER BY Artist"; 
        
        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function updateSold($tableName, $id) {
        $query = "UPDATE " . $tableName . " SET sold = 1 WHERE id = " .$id;

        $stmt = $this->con->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function createSold($transactionId, $tableName, $recordId) {
        $query = "INSERT INTO sold_records (transaction_id, table_name, record_id) VALUES (:transaction_id, :table_name, :record_id)";

        $stmt = $this->con->prepare($query);

        $stmt->bindParam(":transaction_id", $transactionId);
        $stmt->bindParam(":table_name", $tableName);
        $stmt->bindParam(":record_id", $recordId);
    
        $stmt->execute();
    }
}
?>