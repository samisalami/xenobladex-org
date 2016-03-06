<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;

class MissionTypeController extends FOSRestController {

    public function getMissionTypesAction() {
        $em = $this->getDoctrine()->getManager();
        $missionTypes = $em->getRepository('AppBundle:MissionType')->findAll();
        $view = $this->view($missionTypes, 200);
        return $this->handleView($view);
    }
}