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
        $serializer = $this->get("jms_serializer");
        $em = $this->getDoctrine()->getManager();
        $materials = $em->getRepository('AppBundle:Material')->findAll();

        $context = new SerializationContext();
        $context->setGroups(['default', 'viewOnly']);
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($materials, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/material/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Material $material
     * @return Material
     */
    public function getMaterialAction(Material $material) {
        $serializer = $this->get("jms_serializer");

        $context = new SerializationContext();
        $context->setGroups(['default', 'viewOnly']);
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($material, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
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
        $context->setGroups(['default']);
        $material = $serializer->deserialize($data, 'AppBundle\Entity\Material', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($material);
        $em->flush();

        $view = $this->view($material, 200);
        return $this->handleView($view);
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
        $context->setGroups(['default']);
        $material = $serializer->deserialize($data, 'AppBundle\Entity\Material', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($material);
        $em->flush();

        $view = $this->view($material, 200);
        return $this->handleView($view);
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

        return new Response(Response::HTTP_OK);
    }
}