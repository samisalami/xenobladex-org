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
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMission(Mission $mission) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($mission);
        $em->flush();
    }

    protected function addMission(Mission $deserialized_mission) {
        $em = $this->getDoctrine()->getManager();
        $mission = $em->merge($deserialized_mission);
        $em->persist($mission);
        $em->flush();
    }

    protected function updateMission(Mission $deserialized_mission) {
        $em = $this->getDoctrine()->getManager();
        $updated_mission = $em->merge($deserialized_mission);
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMissionsAction() {
        $em = $this->getDoctrine()->getManager();
        $missions = $em->getRepository('AppBundle:Mission')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($missions, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mission/add", methods={"POST"})
     */
    public function addMissionAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mission = $serializer->deserialize($content, 'AppBundle\Entity\Mission', 'json');
            $this->addMission($deserialized_mission);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/mission/update", methods={"POST"})
     */
    public function updateMissionAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mission = $serializer->deserialize($content, 'AppBundle\Entity\Mission', 'json');

            $this->updateMission($deserialized_mission);

            $response = new Response($serializer->serialize($deserialized_mission, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    public function deleteMissionAction($id) {
        $mission = $this->getDoctrine()
            ->getRepository('AppBundle:Mission')
            ->find($id);
        $this->deleteMission($mission);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mission, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}