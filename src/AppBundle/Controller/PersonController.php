<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Person;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class PersonController extends FOSRestController {
    /**
     * @Route("/person", methods={"GET"})
     */
    public function getPersonsAction() {
        $em = $this->getDoctrine()->getManager();
        $persons = $em->getRepository('AppBundle:Person')->findAll();
        $view = $this->view($persons, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/person/{id}", methods={"GET"}, requirements={"id"="^[0-9].$"})
     * @param Person $person
     * @return Person
     */
    public function getPersonAction(Person $person) {
        $view = $this->view($person, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/person/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addPersonAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $person = new Person();
        $context = new DeserializationContext();
        $context->setAttribute('target', $person);
        $person = $serializer->deserialize($data, 'AppBundle\Entity\Person', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($person);
        $em->flush();

        return $this->getPersonsAction();
    }

    /**
     * @Route("/api/person/{id}", methods={"PUT"}, requirements={"id"="^[0-9].$"})
     * @param Request $request
     * @param Person $person
     * @return Response
     */
    public function updatePersonAction(Request $request, Person $person) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $person);
        $person = $serializer->deserialize($data, 'AppBundle\Entity\Person', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($person);
        $em->flush();

        return $this->getPersonsAction();
    }

    /**
     * @Route("/api/person/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].$"})
     * @param Person $person
     * @return Response
     */
    public function deletePersonAction(Person $person) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($person);
        $em->flush();

        return $this->getPersonsAction();
    }
}