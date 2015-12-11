<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Mission;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MissionController extends FOSRestController {
    /**
     * @return Response
     */
    public function getMissionsAction() {
        $em = $this->getDoctrine()->getEntityManager();
        $missions = $em->getRepository('AppBundle:Mission')->findAll();
        $serializer = $this->get('jms_serializer');
        $response = new Response($serializer->serialize($missions, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mission/add", methods={"POST"})
     */
    public function addMissionAction() {
        $content = $this->get('request')->getContent();
        if(!empty($content)) {
            $serializer = $this->get('jms_serializer');
            $mission = $serializer->deserialize($content, 'AppBundle/Entity/Mission', 'json');

            $em = $this->getDoctrine()->getManager();

            $em->persist($mission);
            $em->flush();
        }
    }
}