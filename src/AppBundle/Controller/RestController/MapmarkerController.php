<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Mapmarker;
use AppBundle\Entity\PersonMapmarker;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MapmarkerController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMapmarker(Mapmarker $mapmarker) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($mapmarker);
        $em->flush();
    }

    protected function addMapmarker(Mapmarker $deserialized_mapmarker) {
        $em = $this->getDoctrine()->getManager();
        $mapmarker = $em->merge($deserialized_mapmarker);
        $em->persist($mapmarker);
        $em->flush();
    }

    /**
     * @param Mapmarker $mapmarker
     * @param Mapmarker $deserialized_mapmarker
     */
    protected function updateMapmarker($mapmarker, $deserialized_mapmarker) {
        $em = $this->getDoctrine()->getManager();
        $updated_mapmarker = $em->merge($deserialized_mapmarker);
        $mapmarker->setName($updated_mapmarker->getName());
        $mapmarker->setDescription($updated_mapmarker->getDescription());
        $mapmarker->setXCoord($updated_mapmarker->getXCoord());
        $mapmarker->setYCoord($updated_mapmarker->getYCoord());
        $mapmarker->setMap($updated_mapmarker->getMap());
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMapmarkersAction() {
        $em = $this->getDoctrine()->getManager();
        $mapmarkers = $em->getRepository('AppBundle:Mapmarker')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mapmarkers, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mapmarkers/person/{id}", methods={"GET"})
     */
    public function getMapmarkersByPersonAction($id) {
        $em = $this->getDoctrine()->getManager();
        $mapmarkers = $em->getRepository('AppBundle:PersonMapmarker')->findBy(array('person'=>$id));
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mapmarkers, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mapmarkers/map/{id}", methods={"GET"})
     */
    public function getMapmarkersByMapAction($id) {
        $em = $this->getDoctrine()->getManager();
        $mapmarkers = $em->getRepository('AppBundle:Mapmarker')->findBy(array('map'=>$id));
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mapmarkers, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mapmarker/{type}/add", methods={"POST"})
     */
    public function addMapmarkerAction(Request $request, $type) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mapmarker = $serializer->deserialize($content, 'AppBundle\Entity\\'.$type, 'json');
            $this->addMapmarker($deserialized_mapmarker);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/mapmarker/update", methods={"POST"})
     */
    public function updateMapmarkerAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mapmarker = $serializer->deserialize($content, 'AppBundle\Entity\Mapmarker', 'json');
            $mapmarker = $this->getDoctrine()
                ->getRepository('AppBundle:Mapmarker')
                ->find($deserialized_mapmarker->getId());

            $this->updateMapmarker($mapmarker, $deserialized_mapmarker);
            $response = new Response($serializer->serialize($deserialized_mapmarker, 'json'));

            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    public function deleteMapmarkerAction($id) {
        $mapmarker = $this->getDoctrine()
            ->getRepository('AppBundle:Mapmarker')
            ->find($id);
        $this->deleteMapmarker($mapmarker);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mapmarker, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}