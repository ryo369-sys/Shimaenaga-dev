<?php
// 📄 backend/app/DTOs/NameAccuracy.php

class NameAccuracy
{
    // PHPでも、型（floatやint）を厳しく指定してデータの形を保証します
    public string $names;
    public string $Accuracy;

    public function __construct(string $names, string $Accuracy)
    {
        $this->names = $names;
        $this->Accuracy = $Accuracy;
    }
}