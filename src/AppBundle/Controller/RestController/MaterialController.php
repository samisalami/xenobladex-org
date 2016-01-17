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

class MaterialController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMaterial(Material $material) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($material);
        $em->flush();
    }

    protected function addMaterial(Material $deserialized_material) {
        $em = $this->getDoctrine()->getManager();
        $material = $em->merge($deserialized_material);
        $em->persist($material);
        $em->flush();
    }

    protected function updateMaterial(Material $deserialized_material) {
        $em = $this->getDoctrine()->getManager();
        $updated_material = $em->merge($deserialized_material);
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMaterialsAction() {
        $em = $this->getDoctrine()->getManager();
        $materials = $em->getRepository('AppBundle:Material')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($materials, 'json'));
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
            $this->addMaterial($deserialized_material);
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

            $this->updateMaterial($deserialized_material);

            $response = new Response($serializer->serialize($deserialized_material, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/material/delete/{id}", methods={"DELETE"})
     */
    public function deleteMaterialAction($id) {
        $material = $this->getDoctrine()
            ->getRepository('AppBundle:Material')
            ->find($id);
        $this->deleteMaterial($material);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($material, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}