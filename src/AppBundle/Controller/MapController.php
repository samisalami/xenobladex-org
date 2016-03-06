<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Map;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MapController extends FOSRestController {
    /**
     * @Route("/map", methods={"GET"})
     */
    public function getMapsAction() {
        $em = $this->getDoctrine()->getManager();
        $maps = $em->getRepository('AppBundle:Map')->findAll();
        $view = $this->view($maps, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/map/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Map $map
     * @return Map
     */
    public function getMapAction(Map $map) {
        $view = $this->view($map, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/map/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addMapAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $map = new Map();
        $context = new DeserializationContext();
        $context->setAttribute('target', $map);
        $map = $serializer->deserialize($data, 'AppBundle\Entity\Map', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($map);
        $em->flush();

        $view = $this->view($map, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/map/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Map $map
     * @return Response
     */
    public function updateMapAction(Request $request, Map $map) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $map);
        $map = $serializer->deserialize($data, 'AppBundle\Entity\Map', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($map);
        $em->flush();

        $view = $this->view($map, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/map/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Map $map
     * @return Response
     */
    public function deleteMapAction(Map $map) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($map);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}