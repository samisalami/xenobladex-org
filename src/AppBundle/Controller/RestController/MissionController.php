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

    protected function updateMission(Mission $mission, Mission $deserialized_mission) {
        $em = $this->getDoctrine()->getManager();
        $updated_mission = $em->merge($deserialized_mission);
        $mission->setName($updated_mission->getName());
        $mission->setDescription($updated_mission->getDescription());
        $mission->setTasks($updated_mission->getTasks());
        $mission->setSolution($updated_mission->getSolution());
        $mission->setConditions($updated_mission->getConditions());
        $mission->setLocationNote($updated_mission->getLocationNote());
        $mission->setRewards($updated_mission->getRewards());
        $mission->setMissionType($updated_mission->getMissionType());
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMissionsAction() {
        $em = $this->getDoctrine()->getEntityManager();
        $missions = $em->getRepository('AppBundle:Mission')->findAll();
        $serializer = $this->getJMSSerializer();
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
            $serializer = $this->getJMSSerializer();
            $deserialized_mission = $serializer->deserialize($content, 'AppBundle\Entity\Mission', 'json');
            $this->addMission($deserialized_mission);

            $response = new Response($serializer->serialize($deserialized_mission, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }

    /**
     * @Route("/mission/update", methods={"POST"})
     */
    public function updateMissionAction() {
        $content = $this->get('request')->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mission = $serializer->deserialize($content, 'AppBundle\Entity\Mission', 'json');
            $mission = $this->getDoctrine()
                ->getRepository('AppBundle:Mission')
                ->find($deserialized_mission->getId());

            if(!$mission) {
                $this->addMission($mission);
            } else {
                $this->updateMission($mission, $deserialized_mission);
            }

            $response = new Response($serializer->serialize($deserialized_mission, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
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