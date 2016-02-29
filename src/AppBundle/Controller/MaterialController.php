<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Material;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class MaterialController extends FOSRestController {
    /**
     * @Route("/material", methods={"GET"})
     */
    public function getMaterialsAction() {
        $em = $this->getDoctrine()->getManager();
        $materials = $em->getRepository('AppBundle:Material')->findAll();
        $view = $this->view($materials, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/material/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Material $material
     * @return Material
     */
    public function getMaterialAction(Material $material) {
        $view = $this->view($material, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/material/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addMaterialAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $material = new Material();
        $context = new DeserializationContext();
        $context->setAttribute('target', $material);
        $material = $serializer->deserialize($data, 'AppBundle\Entity\Material', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($material);
        $em->flush();

        return $this->getMaterialsAction();
    }

    /**
     * @Route("/api/material/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Material $material
     * @return Response
     */
    public function updateMaterialAction(Request $request, Material $material) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $material);
        $material = $serializer->deserialize($data, 'AppBundle\Entity\Material', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($material);
        $em->flush();

        return $this->getMaterialsAction();
    }

    /**
     * @Route("/api/material/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Material $material
     * @return Response
     */
    public function deleteMaterialAction(Material $material) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($material);
        $em->flush();

        return $this->getMaterialsAction();
    }
}