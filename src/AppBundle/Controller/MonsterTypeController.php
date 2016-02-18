<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\MonsterType;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class MonsterTypeController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMonsterType(MonsterType $monsterType) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($monsterType);
        $em->flush();
    }

    protected function saveMonsterType(MonsterType $monsterType) {
        $em = $this->getDoctrine()->getManager();
        $em->persist($monsterType);
        $em->flush();
        $em->clear();
    }

    /**
     * @param $context
     * @return Response
     * @Route("/monster_types/{context}", methods={"GET"})
     */
    public function getMonsterTypesAction($context="") {
        $groups = array('monsterTypeDetail');

        $em = $this->getDoctrine()->getManager();
        $monsterTypes = $em->getRepository('AppBundle:MonsterType')->findAll();
        $serializer = $this->getJMSSerializer();

        if(in_array($context, $groups)) {
            $data = $serializer->serialize($monsterTypes, 'json', SerializationContext::create()->setGroups(array('default',$context)));
        } else {
            $data = $serializer->serialize($monsterTypes, 'json', SerializationContext::create()->setGroups(array('default')));
        }

        $response = new Response($data);
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
            $this->saveMonsterType($deserialized_monsterType);
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

            $this->saveMonsterType($deserialized_monsterType);

            $response = new Response($serializer->serialize($deserialized_monsterType, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/monster_type/delete/{id}", methods={"DELETE"})
     * @ParamConverter("monsterType", class="AppBundle:MonsterType")
     * @param MonsterType $monsterType
     * @return Response
     */
    public function deleteMonsterTypeAction(MonsterType $monsterType) {
        $this->deleteMonsterType($monsterType);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($monsterType, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}