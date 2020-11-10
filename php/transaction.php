<?php
class Transaction {
    private $con;
    
    public $transaction_id;
    public $total;
    public $shipping;
    public $grand_total;
    public $customer_id;
    public $id;

    public function __construct($db) {
        $this->con = $db;
    }

    function create() {
        $query = "INSERT INTO transactions (transaction_id, create_time, total, shipping, grand_total, customer_id) 
                    VALUES (:transaction_id, :create_time, :total, :shipping, :grand_total, :customer_id)";
        
        $stmt = $this->con->prepare($query);
        
        $stmt->bindParam(":transaction_id", $this->transaction_id);
        $stmt->bindParam(":create_time", date_format(date_create(), "d/m/Y H:i:s"));
        $stmt->bindParam(":total", $this->total);
        $stmt->bindParam(":shipping", $this->shipping);
        $stmt->bindParam(":grand_total", $this->grand_total);
        $stmt->bindParam(":customer_id", $this->customer_id);
        
        $stmt->execute();
    }
}
?>