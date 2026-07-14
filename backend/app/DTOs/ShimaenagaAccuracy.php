<?php
// 📄 backend/app/DTOs/ShimaenagaAccuracy.php

class ShimaenagaAccuracy
{
    // PHPでも、型（floatやint）を厳しく指定してデータの形を保証します
    public float $realAccuracy;
    public float $plushAccuracy;
    public int $totalAttempts;

    public function __construct(float $realAccuracy, float $plushAccuracy, int $totalAttempts)
    {
        $this->realAccuracy = $realAccuracy;
        $this->plushAccuracy = $plushAccuracy;
        $this->totalAttempts = $totalAttempts;
    }
}