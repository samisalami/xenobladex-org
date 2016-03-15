<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\EquipUpgradeTier;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class EquipUpgradeTierController extends FOSRestController {
    /**
     * @Route("/equip/upgrade/tier", methods={"GET"})
     */
    public function getEquipUpgradeTiersAction() {
        $em = $this->getDoctrine()->getManager();
        $equipUpgradeTiers = $em->getRepository('AppBundle:EquipUpgradeTier')->findAll();
        $view = $this->view($equipUpgradeTiers, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/equip/upgrade/tier/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param EquipUpgradeTier $EquipUpgradeTier
     * @return EquipUpgradeTier
     */
    public function getEquipUpgradeTierAction(EquipUpgradeTier $EquipUpgradeTier) {
        $view = $this->view($EquipUpgradeTier, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/tier/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addEquipUpgradeTierAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $EquipUpgradeTier = new EquipUpgradeTier();
        $context = new DeserializationContext();
        $context->setAttribute('target', $EquipUpgradeTier);
        $EquipUpgradeTier = $serializer->deserialize($data, 'AppBundle\Entity\EquipUpgradeTier', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($EquipUpgradeTier);
        $em->flush();

        $view = $this->view($EquipUpgradeTier, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/tier/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param EquipUpgradeTier $EquipUpgradeTier
     * @return Response
     */
    public function updateEquipUpgradeTierAction(Request $request, EquipUpgradeTier $EquipUpgradeTier) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $EquipUpgradeTier);
        $EquipUpgradeTier = $serializer->deserialize($data, 'AppBundle\Entity\EquipUpgradeTier', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($EquipUpgradeTier);
        $em->flush();

        $view = $this->view($EquipUpgradeTier, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/tier/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param EquipUpgradeTier $EquipUpgradeTier
     * @return Response
     */
    public function deleteEquipUpgradeTierAction(EquipUpgradeTier $EquipUpgradeTier) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($EquipUpgradeTier);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}