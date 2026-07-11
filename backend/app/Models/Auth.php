<?php

class AuthModel
{
    public function login(
        string $userId,
        string $password
    ): array
    {
        // 後でDB検索を書く
        return [];
    }


    public function register(
        string $userId,
        string $password,
        string $email,
        string $gender,
        int $aga,

    ): array
    {
        // 後でDB検索を書く
        return [];
    }
}
