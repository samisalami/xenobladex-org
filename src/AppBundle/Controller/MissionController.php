<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Mission;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MissionController extends FOSRestController {

    /**
     * @Route("/mission", methods={"GET"})
     */
    public function getMissionsAction() {
        $em = $this->getDoctrine()->getManager();
        $missions = $em->getRepository('AppBundle:Mission')->findAll();
        $view = $this->view($missions, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/mission/{id}", methods={"GET"}, requirements={"id"="^[0-9].$"})
     * @param Mission $mission
     * @return Mission
     */
    public function getMissionAction(Mission $mission) {
        $view = $this->view($mission, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/mission/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addMissionAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $mission = new Mission();
        $context = new DeserializationContext();
        $context->setAttribute('target', $mission);
        $mission = $serializer->deserialize($data, 'AppBundle\Entity\Mission', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($mission);
        $em->flush();

        return $this->getMissionsAction();
    }

    /**
     * @Route("/api/mission/{id}", methods={"PUT"}, requirements={"id"="^[0-9].$"})
     * @param Request $request
     * @param Mission $mission
     * @return Response
     */
    public function updateMissionAction(Request $request, Mission $mission) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $mission);
        $mission = $serializer->deserialize($data, 'AppBundle\Entity\Mission', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($mission);
        $em->flush();

        return $this->getMissionsAction();
    }

    /**
     * @Route("/api/mission/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].$"})
     * @param Mission $mission
     * @return Response
     */
    public function deleteMissionAction(Mission $mission) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($mission);
        $em->flush();

        return $this->getMissionsAction();
    }
}