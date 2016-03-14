<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\EquipUpgrade;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EquipUpgradeController extends FOSRestController {
    /**
     * @Route("/equip/upgrades", methods={"GET"})
     */
    public function getEquipUpgradesAction() {
        $em = $this->getDoctrine()->getManager();
        $equipUpgrades = $em->getRepository('AppBundle:EquipUpgrade')->findAll();
        $view = $this->view($equipUpgrades, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/equip/upgrade/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param EquipUpgrade $equipUpgrade
     * @return EquipUpgrade
     */
    public function getEquipUpgradeAction(EquipUpgrade $equipUpgrade) {
        $view = $this->view($equipUpgrade, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addEquipUpgradeAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $equipUpgrade = new EquipUpgrade();
        $context = new DeserializationContext();
        $context->setAttribute('target', $equipUpgrade);
        $equipUpgrade = $serializer->deserialize($data, 'AppBundle\Entity\EquipUpgrade', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($equipUpgrade);
        $em->flush();

        $view = $this->view($equipUpgrade, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param EquipUpgrade $equipUpgrade
     * @return Response
     */
    public function updateEquipUpgradeAction(Request $request, EquipUpgrade $equipUpgrade) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $equipUpgrade);
        $equipUpgrade = $serializer->deserialize($data, 'AppBundle\Entity\EquipUpgrade', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($equipUpgrade);
        $em->flush();

        $view = $this->view($equipUpgrade, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param EquipUpgrade $equipUpgrade
     * @return Response
     */
    public function deleteEquipUpgradeAction(EquipUpgrade $equipUpgrade) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($equipUpgrade);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}