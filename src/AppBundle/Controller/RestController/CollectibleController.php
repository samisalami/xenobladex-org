<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use AppBundle\Entity\Collectible;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class CollectibleController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteCollectible(Collectible $collectible) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($collectible);
        $em->flush();
    }

    protected function addCollectible(Collectible $deserialized_collectible) {
        $em = $this->getDoctrine()->getManager();
        $collectible = $em->merge($deserialized_collectible);
        $em->persist($collectible);
        $em->flush();
    }

    protected function updateCollectible(Collectible $deserialized_collectible) {
        $em = $this->getDoctrine()->getManager();
        $collectible = $em->merge($deserialized_collectible);
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getCollectiblesAction() {
        $em = $this->getDoctrine()->getManager();
        $collectibles = $em->getRepository('AppBundle:Collectible')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($collectibles, 'json', SerializationContext::create()->setGroups(array('Default'))));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @return Response
     */
    public function getCollectiblesDetailAction() {
        $em = $this->getDoctrine()->getManager();
        $collectibles = $em->getRepository('AppBundle:Collectible')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($collectibles, 'json', SerializationContext::create()->setGroups(array('Default', 'collectibleDetail'))));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/collectible/add", methods={"POST"})
     */
    public function addCollectibleAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_collectible = $serializer->deserialize($content, 'AppBundle\Entity\Collectible', 'json');
            $this->addCollectible($deserialized_collectible);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/collectible/update", methods={"POST"})
     */
    public function updateCollectibleAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_collectible = $serializer->deserialize($content, 'AppBundle\Entity\Collectible', 'json');

            $this->updateCollectible($deserialized_collectible);

            $response = new Response($serializer->serialize($deserialized_collectible, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/collectible/delete/{id}", methods={"DELETE"})
     * @ParamConverter("collectible", class="AppBundle:Collectible")
     * @param Collectible $collectible
     * @return Response
     */
    public function deleteCollectibleAction(Collectible $collectible) {
        $this->deleteCollectible($collectible);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($collectible, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}