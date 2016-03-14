<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\EquipUpgradeCategory;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class EquipUpgradeCategoryController extends FOSRestController {
    /**
     * @Route("/equip/upgrade/category", methods={"GET"})
     */
    public function getEquipUpgradeCategoriesAction() {
        $em = $this->getDoctrine()->getManager();
        $equipUpgradeCategories = $em->getRepository('AppBundle:EquipUpgradeCategory')->findAll();
        $view = $this->view($equipUpgradeCategories, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/equip/upgrade/category/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param EquipUpgradeCategory $equipUpgradeCategory
     * @return EquipUpgradeCategory
     */
    public function getEquipUpgradeCategoryAction(EquipUpgradeCategory $equipUpgradeCategory) {
        $view = $this->view($equipUpgradeCategory, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/category/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addEquipUpgradeCategoryAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $equipUpgradeCategory = new EquipUpgradeCategory();
        $context = new DeserializationContext();
        $context->setAttribute('target', $equipUpgradeCategory);
        $equipUpgradeCategory = $serializer->deserialize($data, 'AppBundle\Entity\EquipUpgradeCategory', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($equipUpgradeCategory);
        $em->flush();

        $view = $this->view($equipUpgradeCategory, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/category/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param EquipUpgradeCategory $equipUpgradeCategory
     * @return Response
     */
    public function updateEquipUpgradeCategoryAction(Request $request, EquipUpgradeCategory $equipUpgradeCategory) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $equipUpgradeCategory);
        $equipUpgradeCategory = $serializer->deserialize($data, 'AppBundle\Entity\EquipUpgradeCategory', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($equipUpgradeCategory);
        $em->flush();

        $view = $this->view($equipUpgradeCategory, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/equip/upgrade/category/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param EquipUpgradeCategory $equipUpgradeCategory
     * @return Response
     */
    public function deleteEquipUpgradeCategoryAction(EquipUpgradeCategory $equipUpgradeCategory) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($equipUpgradeCategory);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}