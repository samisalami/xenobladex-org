<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use AppBundle\Entity\MonsterType;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MonsterTypeController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMonsterType(MonsterType $monsterType) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($monsterType);
        $em->flush();
    }

    protected function addMonsterType(MonsterType $deserialized_monsterType) {
        $em = $this->getDoctrine()->getManager();
        $monsterType = $em->merge($deserialized_monsterType);
        $em->persist($monsterType);
        $em->flush();
    }

    protected function updateMonsterType(MonsterType $deserialized_monsterType) {
        $em = $this->getDoctrine()->getManager();
        $updated_monsterType = $em->merge($deserialized_monsterType);
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMonsterTypesAction() {
        $em = $this->getDoctrine()->getManager();
        $monsterTypes = $em->getRepository('AppBundle:MonsterType')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($monsterTypes, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/monster_type/add", methods={"POST"})
     */
    public function addMonsterTypeAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_monsterType = $serializer->deserialize($content, 'AppBundle\Entity\MonsterType', 'json');
            $this->addMonsterType($deserialized_monsterType);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/monster_type/update", methods={"POST"})
     */
    public function updateMonsterTypeAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_monsterType = $serializer->deserialize($content, 'AppBundle\Entity\MonsterType', 'json');

            $this->updateMonsterType($deserialized_monsterType);

            $response = new Response($serializer->serialize($deserialized_monsterType, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/monster_type/delete/{id}", methods={"DELETE"})
     */
    public function deleteMonsterTypeAction($id) {
        $monsterType = $this->getDoctrine()
            ->getRepository('AppBundle:MonsterType')
            ->find($id);
        $this->deleteMonsterType($monsterType);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($monsterType, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}