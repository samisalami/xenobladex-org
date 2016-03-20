<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\CollectionCategory;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;

class CollectionCategoryController extends FOSRestController {
    /**
     * @Route("/collection/category", methods={"GET"})
     */
    public function getCollectionCategoryiesAction() {
        $serializer = $this->get("jms_serializer");
        $em = $this->getDoctrine()->getManager();
        $collectionCategoryies = $em->getRepository('AppBundle:CollectionCategory')->findAll();

        $context = new SerializationContext();
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($collectionCategoryies, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/collection/category/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param CollectionCategory $collectionCategory
     * @return CollectionCategory
     */
    public function getCollectionCategoryAction(CollectionCategory $collectionCategory) {
        $serializer = $this->get("jms_serializer");

        $context = new SerializationContext();
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($collectionCategory, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/collection/category/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addCollectionCategoryAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $collectionCategory = new CollectionCategory();
        $context = new DeserializationContext();
        $context->setAttribute('target', $collectionCategory);
        $collectionCategory = $serializer->deserialize($data, 'AppBundle\Entity\CollectionCategory', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collectionCategory);
        $em->flush();

        $view = $this->view($collectionCategory, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/category/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param CollectionCategory $collectionCategory
     * @return Response
     */
    public function updateCollectionCategoryAction(Request $request, CollectionCategory $collectionCategory) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $collectionCategory);
        $collectionCategory = $serializer->deserialize($data, 'AppBundle\Entity\CollectionCategory', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collectionCategory);
        $em->flush();

        $view = $this->view($collectionCategory, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collection/category/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param CollectionCategory $collectionCategory
     * @return Response
     */
    public function deleteCollectionCategoryAction(CollectionCategory $collectionCategory) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($collectionCategory);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}