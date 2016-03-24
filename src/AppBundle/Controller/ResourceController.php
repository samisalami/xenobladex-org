<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Resource;
use AppBundle\Entity\Monster;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class ResourceController extends FOSRestController {
    /**
     * @Route("/resource", methods={"GET"})
     */
    public function getResourcesAction() {
        $serializer = $this->get("jms_serializer");
        $em = $this->getDoctrine()->getManager();
        $resources = $em->getRepository('AppBundle:Resource')->findAll();

        $context = new SerializationContext();
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($resources, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/resource/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Resource $resource
     * @return Resource
     */
    public function getResourceAction(Resource $resource) {
        $serializer = $this->get("jms_serializer");

        $context = new SerializationContext();
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($resource, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/resource/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addResourceAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $resource = new Resource();
        $context = new DeserializationContext();
        $context->setAttribute('target', $resource);
        $resource = $serializer->deserialize($data, 'AppBundle\Entity\Resource', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($resource);
        $em->flush();

        $view = $this->view($resource, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/resource/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Resource $resource
     * @return Response
     */
    public function updateResourceAction(Request $request, Resource $resource) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $resource);
        $resource = $serializer->deserialize($data, 'AppBundle\Entity\Resource', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($resource);
        $em->flush();

        $view = $this->view($resource, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/resource/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Resource $resource
     * @return Response
     */
    public function deleteResourceAction(Resource $resource) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($resource);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}