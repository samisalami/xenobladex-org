<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class SecurityController extends Controller
{
    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function loginAction()
    {
//        $authenticationUtils = $this->get('security.authentication_utils');
//        $error = $authenticationUtils->getLastAuthenticationError();
//
//        if($error) {
//            $response = new Response(json_encode(array('message' => $error)));
//        } else {
//            $response = new Response(json_encode(array('success' => true)));
//        }

        $response = new Response(json_encode(array('success' => false,'message' => "Sorry, no entrance for you!")));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}