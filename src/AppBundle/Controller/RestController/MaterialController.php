<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use AppBundle\Entity\Material;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class MaterialController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMaterial(Material $material) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($material);
        $em->flush();
        $em->clear();
    }

    protected function saveMaterial(Material $material) {
        $em = $this->getDoctrine()->getManager();
        $em->persist($material);
        $em->flush();
        $em->clear();
    }

    /**
     * @param $context
     * @return Response
     * @Route("/materials/{context}", methods={"GET"})
     */
    public function getMaterialsAction($context="") {
        $groups = array('itemDetail');

        $em = $this->getDoctrine()->getManager();
        $materials = $em->getRepository('AppBundle:Material')->findAll();
        $serializer = $this->getJMSSerializer();

        if(in_array($context, $groups)) {
            $data = $serializer->serialize($materials, 'json', SerializationContext::create()->setGroups(array('default',$context)));
        } else {
            $data = $serializer->serialize($materials, 'json', SerializationContext::create()->setGroups(array('default')));
        }

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/api/material/add", methods={"POST"})
     */
    public function addMaterialAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_material = $serializer->deserialize($content, 'AppBundle\Entity\Material', 'json');
            $this->saveMaterial($deserialized_material);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/material/update", methods={"POST"})
     */
    public function updateMaterialAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_material = $serializer->deserialize($content, 'AppBundle\Entity\Material', 'json');

            $this->saveMaterial($deserialized_material);

            $response = new Response($serializer->serialize($deserialized_material, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/material/delete/{id}", methods={"DELETE"})
     * @ParamConverter("material", class="AppBundle:Material")
     * @param Material $material
     * @return Response
     */
    public function deleteMaterialAction($material) {
        $this->deleteMaterial($material);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($material, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}