<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Mapmarker;
use AppBundle\Entity\PersonMapmarker;
use Symfony\Component\HttpFoundation\AcceptHeader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MapmarkerController extends FOSRestController {
    /**
     * @return object
     */
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    /**
     * @param $mapmarker
     */
    protected function deleteMapmarker($mapmarker) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($mapmarker);
        $em->flush();
    }

    /**
     * @param $deserialized_mapmarker
     */
    protected function addMapmarker($deserialized_mapmarker) {
        $em = $this->getDoctrine()->getManager();
        $mapmarker = $em->merge($deserialized_mapmarker);
        $em->persist($mapmarker);
        $em->flush();
        return $mapmarker;
    }

    /**
     * @param Mapmarker $mapmarker
     * @param Mapmarker $deserialized_mapmarker
     */
    protected function updateMapmarker($deserialized_mapmarker) {
        $em = $this->getDoctrine()->getManager();
        $updated_mapmarker = $em->merge($deserialized_mapmarker);
        $em->flush();
    }

    /**
     * @param string $type
     * @return Response
     * @Route("/mapmarker/{type}", methods={"GET"})
     */
    public function getMapmarkersAction($type="Mapmarker") {
        $em = $this->getDoctrine()->getManager();
        $mapmarkers = $em->getRepository('AppBundle:'.$type)->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mapmarkers, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mapmarkers/person/{id}", methods={"GET"})
     * @param $id
     * @return Response
     */
    public function getMapmarkerByPersonAction($id) {
        $em = $this->getDoctrine()->getManager();
        $mapmarkers = $em->getRepository('AppBundle:PersonMapmarker')->findBy(array('person'=>$id));
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($mapmarkers, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/mapmarkers/map/{id}", methods={"GET"})
     * @param $id
     * @return Response
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
     * @param Request $request
     * @param $type
     * @return Response
     */
    public function addMapmarkerAction(Request $request, $type) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mapmarker = $serializer->deserialize($content, 'AppBundle\Entity\\'.$type, 'json');
            $mapmarker = $this->addMapmarker($deserialized_mapmarker);
            $response = new Response($serializer->serialize($mapmarker, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        } else {
            return new Response(Response::HTTP_OK);
        }
    }

    /**
     * @Route("/mapmarker/update", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function updateMapmarkerAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_mapmarker = $serializer->deserialize($content, 'AppBundle\Entity\Mapmarker', 'json');

            $this->updateMapmarker($deserialized_mapmarker);
            $response = new Response($serializer->serialize($deserialized_mapmarker, 'json'));

            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @param $id
     * @return Response
     */
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