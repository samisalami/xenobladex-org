<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Person;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PersonController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deletePerson(Person $person) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($person);
        $em->flush();
    }

    protected function addPerson(Person $deserialized_person) {
        $em = $this->getDoctrine()->getManager();
        $person = $em->merge($deserialized_person);
        $em->persist($person);
        $em->flush();
    }

    protected function updatePerson(Person $person, Person $deserialized_person) {
        $em = $this->getDoctrine()->getManager();
        $updated_person = $em->merge($deserialized_person);
        $person->setName($updated_person->getName());
        $person->setDescription($updated_person->getDescription());
        $person->setConditions($updated_person->getConditions());
        $person->setActivityTime($updated_person->getActivityTime());
        $person->setAge($updated_person->getAge());
        $person->setLocationNote($updated_person->getLocationNote());
        $person->setSpecies($updated_person->getSpecies());
        $person->setJob($updated_person->getJob());
        $person->setRegion($updated_person->getRegion());
        $person->addMapMarker($updated_person->getMapMarkers());
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getPersonsAction() {
        $em = $this->getDoctrine()->getManager();
        $persons = $em->getRepository('AppBundle:Person')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($persons, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/person/add", methods={"POST"})
     */
    public function addPersonAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_person = $serializer->deserialize($content, 'AppBundle\Entity\Person', 'json');
            $this->addPerson($deserialized_person);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/person/update", methods={"POST"})
     */
    public function updatePersonAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_person = $serializer->deserialize($content, 'AppBundle\Entity\Person', 'json');
            $person = $this->getDoctrine()
                ->getRepository('AppBundle:Person')
                ->find($deserialized_person->getId());

            $this->updatePerson($person, $deserialized_person);
            $response = new Response($serializer->serialize($deserialized_person, 'json'));

            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    public function deletePersonAction($id) {
        $person = $this->getDoctrine()
            ->getRepository('AppBundle:Person')
            ->find($id);
        $this->deletePerson($person);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($person, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}