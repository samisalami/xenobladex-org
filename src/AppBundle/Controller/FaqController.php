<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Faq;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FaqController extends FOSRestController {
    /**
     * @Route("/faq", methods={"GET"})
     */
    public function getFaqsAction() {
        $em = $this->getDoctrine()->getManager();
        $faqs = $em->getRepository('AppBundle:Faq')->findAll();
        $view = $this->view($faqs, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/faq/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Faq $faq
     * @return Faq
     */
    public function getFaqAction(Faq $faq) {
        $view = $this->view($faq, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/faq/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addFaqAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $faq = new Faq();
        $context = new DeserializationContext();
        $context->setAttribute('target', $faq);
        $faq = $serializer->deserialize($data, 'AppBundle\Entity\Faq', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($faq);
        $em->flush();

        $view = $this->view($faq, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/faq/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Faq $faq
     * @return Response
     */
    public function updateFaqAction(Request $request, Faq $faq) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $faq);
        $faq = $serializer->deserialize($data, 'AppBundle\Entity\Faq', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($faq);
        $em->flush();

        return $this->getFaqsAction();
    }

    /**
     * @Route("/api/faq/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Faq $faq
     * @return Response
     */
    public function deleteFaqAction(Faq $faq) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($faq);
        $em->flush();

        return $this->getFaqsAction();
    }
}