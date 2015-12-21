<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Map;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MapController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMap(Map $map) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($map);
        $em->flush();
    }

    protected function addMap(Map $deserialized_map) {
        $em = $this->getDoctrine()->getManager();
        $map = $em->merge($deserialized_map);
        $em->persist($map);
        $em->flush();
    }

    protected function updateMap(Map $map, Map $deserialized_map) {
        $em = $this->getDoctrine()->getManager();
        $updated_map = $em->merge($deserialized_map);
        $map->setName($updated_map->getName());
        $map->setDescription($updated_map->getDescription());
        $map->setAttachment($updated_map->getAttachment());
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMapsAction() {
        $em = $this->getDoctrine()->getManager();
        $maps = $em->getRepository('AppBundle:Map')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($maps, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/map/add", methods={"POST"})
     */
    public function addMapAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_map = $serializer->deserialize($content, 'AppBundle\Entity\Map', 'json');
            $this->addMap($deserialized_map);

            $response = new Response($serializer->serialize($deserialized_map, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }

    /**
     * @Route("/map/update", methods={"POST"})
     */
    public function updateMapAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_map = $serializer->deserialize($content, 'AppBundle\Entity\Map', 'json');
            $map = $this->getDoctrine()
                ->getRepository('AppBundle:Map')
                ->find($deserialized_map->getId());

            $this->updateMap($map, $deserialized_map);
            $response = new Response($serializer->serialize($deserialized_map, 'json'));

            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }

    public function deleteMapAction($id) {
        $map = $this->getDoctrine()
            ->getRepository('AppBundle:Map')
            ->find($id);
        $this->deleteMap($map);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($map, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}