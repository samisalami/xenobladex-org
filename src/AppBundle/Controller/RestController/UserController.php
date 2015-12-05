<?php
/**
 * Created by PhpStorm.
 * User: Samjessa
 * Date: 04.12.2015
 * Time: 22:06
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Response;


class UserController extends FOSRestController
{
    /**
     * @Route("/user/login", methods={"POST"})
     */
    public function loginAction()
    {
        $response = new Response(json_encode(array('success' => false,'message' => "Sorry, no entrance for you!")));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}