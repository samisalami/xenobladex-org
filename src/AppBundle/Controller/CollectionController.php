<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Collection;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class CollectionController extends FOSRestController {
    /**
     * @Route("/collection", methods={"GET"})
     */
    public function getCollectionsAction() {
        $em = $this->getDoctrine()->getManager();
        $collections = $em->getRepository('AppBundle:Collection')->findAll();
        $view = $this->view($collections, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/collection/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Collection $collection
     * @return Collection
     */
    public function getCollectionAction(Collection $collection) {
        $view = $this->view($collection, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addCollectionAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $collection = new Collection();
        $context = new DeserializationContext();
        $context->setAttribute('target', $collection);
        $collection = $serializer->deserialize($data, 'AppBundle\Entity\Collection', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collection);
        $em->flush();

        $view = $this->view($collection, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Collection $collection
     * @return Response
     */
    public function updateCollectionAction(Request $request, Collection $collection) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $collection);
        $collection = $serializer->deserialize($data, 'AppBundle\Entity\Collection', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collection);
        $em->flush();

        $view = $this->view($collection, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Collection $collection
     * @return Response
     */
    public function deleteCollectionAction(Collection $collection) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($collection);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}