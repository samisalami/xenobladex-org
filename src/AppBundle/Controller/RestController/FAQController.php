<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Faq;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FaqController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteFaq(Faq $faq) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($faq);
        $em->flush();
    }

    protected function addFaq(Faq $deserialized_faq) {
        $em = $this->getDoctrine()->getManager();
        $faq = $em->merge($deserialized_faq);
        $em->persist($faq);
        $em->flush();
    }

    protected function updateFaq(Faq $faq, Faq $deserialized_faq) {
        $em = $this->getDoctrine()->getManager();
        $updated_faq = $em->merge($deserialized_faq);
        $faq->setAnswer($updated_faq->getAnswer());
        $faq->setQuestion($updated_faq->getQuestion());
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getFaqsAction() {
        $em = $this->getDoctrine()->getManager();
        $faqs = $em->getRepository('AppBundle:Faq')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($faqs, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/faq/add", methods={"POST"})
     */
    public function addFaqAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_faq = $serializer->deserialize($content, 'AppBundle\Entity\Faq', 'json');
            $this->addFaq($deserialized_faq);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/faq/update", methods={"POST"})
     */
    public function updateFaqAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_faq = $serializer->deserialize($content, 'AppBundle\Entity\Faq', 'json');
            $faq = $this->getDoctrine()
                ->getRepository('AppBundle:Faq')
                ->find($deserialized_faq->getId());

            $this->updateFaq($faq, $deserialized_faq);
            $response = new Response($serializer->serialize($deserialized_faq, 'json'));

            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    public function deleteFaqAction($id) {
        $faq = $this->getDoctrine()
            ->getRepository('AppBundle:Faq')
            ->find($id);
        $this->deleteFaq($faq);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($faq, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}