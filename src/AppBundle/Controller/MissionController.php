<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Form\MissionType;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Mission;
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
     * @Route("/mission/{id}", methods={"GET"}, requirements={"id"="^[0-9]$"})
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
        $mission = new Mission();
        $form = $this->createForm($this->get("app.form.mission.type"), $mission, array('method' => 'POST'));
        $form->handleRequest($request);

        if($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($mission);
            $em->flush();
            return new Response(Response::HTTP_OK);
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/mission/{id}", methods={"PUT"})
     * @param Request $request
     * @param Mission $mission
     * @return Response
     */
    public function updateMissionAction(Request $request, Mission $mission) {
        $form = $this->createForm($this->get('app.form.mission.type'), $mission, array('method' => 'PUT'));
        $form->handleRequest($request);

        if($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($mission);
            $em->flush();
            return new Response(Response::HTTP_OK);
        }

        $view = $this->view($form, 400);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/mission/{id}", methods={"DELETE"})
     * @param Mission $mission
     * @return Response
     */
    public function deleteMissionAction(Mission $mission) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($mission);
        $em->flush();
        return new Response(Response::HTTP_OK);
    }
}