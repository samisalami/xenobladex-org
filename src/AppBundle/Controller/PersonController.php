<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Person;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

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

    /**
     * @param Person $deserialized_person
     */
    protected function updatePerson(Person $deserialized_person) {
        $em = $this->getDoctrine()->getManager();

        //mapmarkers
        $person = $em->getRepository('AppBundle:Person')->find($deserialized_person->getId());
        $newMapmarkers = $deserialized_person->getMapmarkers();
        $countNewMapmarkers = count($newMapmarkers);
        $currentMapmarkers = $person->getMapmarkers();

        foreach($currentMapmarkers as $currentMapmarker) {
            $counter = 0;
            $exists = false;
            foreach($newMapmarkers as $newMapmarker) {
                if($newMapmarker->getId()) {
                    if($newMapmarker->getId() == $currentMapmarker->getId()) {
                        $exists = true;
                    }
                }

                $counter++;

                if($counter==$countNewMapmarkers && !$exists) {
                    $deserialized_person->removeMapmarker($currentMapmarker);
                    $em->remove($currentMapmarker);
                }
            }
        }

        $em->merge($deserialized_person);
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

            $this->updatePerson($deserialized_person);

            $response = new Response($serializer->serialize($deserialized_person, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /*
     * @Route("/api/person/delete/{id}", methods={"DELETE"})
     * @ParamConverter("person", class="AppBundle:Person")
     * @param Person $person
     * @return Response
     */
    public function deletePersonAction(Person $person) {
        $this->deletePerson($person);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($person, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}