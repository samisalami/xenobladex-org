<?php
namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Response;

class RestSecurityController extends FOSRestController
{
    public function getLogin($username, $password) {
        return new Response('{test:test}');
    }
}