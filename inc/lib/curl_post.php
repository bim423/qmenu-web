<?php

/**
 * Makes a HTTP post request
 * @param $url
 * @param array $fields
 * @return string Response from server
 */
function post($url, array $fields) {

    $fields_string = http_build_query($fields);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}