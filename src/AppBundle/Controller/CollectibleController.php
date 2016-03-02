<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Collectible;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class CollectibleController extends FOSRestController {
    /**
     * @Route("/collectible", methods={"GET"})
     */
    public function getCollectiblesAction() {
        $em = $this->getDoctrine()->getManager();
        $collectibles = $em->getRepository('AppBundle:Collectible')->findAll();
        $view = $this->view($collectibles, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/collectible/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Collectible $collectible
     * @return Collectible
     */
    public function getCollectibleAction(Collectible $collectible) {
        $view = $this->view($collectible, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collectible/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addCollectibleAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $collectible = new Collectible();
        $context = new DeserializationContext();
        $context->setAttribute('target', $collectible);
        $collectible = $serializer->deserialize($data, 'AppBundle\Entity\Collectible', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collectible);
        $em->flush();

        $view = $this->view($collectible, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collectible/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Collectible $collectible
     * @return Response
     */
    public function updateCollectibleAction(Request $request, Collectible $collectible) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $collectible);
        $collectible = $serializer->deserialize($data, 'AppBundle\Entity\Collectible', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collectible);
        $em->flush();

        $view = $this->view($collectible, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/collectible/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Collectible $collectible
     * @return Response
     */
    public function deleteCollectibleAction(Collectible $collectible) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($collectible);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}