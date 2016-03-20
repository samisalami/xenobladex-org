<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\CollectionGroup;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;

class CollectionGroupController extends FOSRestController {
    /**
     * @Route("/collection/group", methods={"GET"})
     */
    public function getCollectionGroupsAction() {
        $serializer = $this->get("jms_serializer");
        $em = $this->getDoctrine()->getManager();
        $collectionGroups = $em->getRepository('AppBundle:CollectionGroup')->findAll();

        $context = new SerializationContext();
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($collectionGroups, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/collection/group/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param CollectionGroup $collectionGroup
     * @return CollectionGroup
     */
    public function getCollectionGroupAction(CollectionGroup $collectionGroup) {
        $serializer = $this->get("jms_serializer");

        $context = new SerializationContext();
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($collectionGroup, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/collection/group/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addCollectionGroupAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $collectionGroup = new CollectionGroup();
        $context = new DeserializationContext();
        $context->setAttribute('target', $collectionGroup);
        $collectionGroup = $serializer->deserialize($data, 'AppBundle\Entity\CollectionGroup', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collectionGroup);
        $em->flush();

        $view = $this->view($collectionGroup, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/group/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param CollectionGroup $collectionGroup
     * @return Response
     */
    public function updateCollectionGroupAction(Request $request, CollectionGroup $collectionGroup) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $collectionGroup);
        $collectionGroup = $serializer->deserialize($data, 'AppBundle\Entity\CollectionGroup', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collectionGroup);
        $em->flush();

        $view = $this->view($collectionGroup, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/group/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param CollectionGroup $collectionGroup
     * @return Response
     */
    public function deleteCollectionGroupAction(CollectionGroup $collectionGroup) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($collectionGroup);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}