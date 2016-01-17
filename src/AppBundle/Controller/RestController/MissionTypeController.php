<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MissionTypeController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    /**
     * @return Response
     */
    public function getMissionTypesAction() {
        $em = $this->getDoctrine()->getManager();
        $missionTypes = $em->getRepository('AppBundle:MissionType')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($missionTypes, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}