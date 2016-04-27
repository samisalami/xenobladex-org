<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Guide;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class GuideController extends FOSRestController {
    /**
     * @Route("/guide", methods={"GET"})
     */
    public function getGuidesAction() {
        $em = $this->getDoctrine()->getManager();
        $guides = $em->getRepository('AppBundle:Guide')->findAll();
        $view = $this->view($guides, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/guide/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Guide $guide
     * @return Guide
     */
    public function getGuideAction(Guide $guide) {
        $view = $this->view($guide, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/guide/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addGuideAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $guide = new Guide();
        $context = new DeserializationContext();
        $context->setAttribute('target', $guide);
        $guide = $serializer->deserialize($data, 'AppBundle\Entity\Guide', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($guide);
        $em->flush();

        $view = $this->view($guide, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/guide/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Guide $guide
     * @return Response
     */
    public function updateGuideAction(Request $request, Guide $guide) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $guide);
        $guide = $serializer->deserialize($data, 'AppBundle\Entity\Guide', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($guide);
        $em->flush();

        $view = $this->view($guide, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/guide/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Guide $guide
     * @return Response
     */
    public function deleteGuideAction(Guide $guide) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($guide);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}