<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\MonsterType;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;

class MonsterTypeController extends FOSRestController {
    /**
     * @Route("/monsterType", methods={"GET"})
     */
    public function getMonsterTypesAction() {
        $serializer = $this->get("jms_serializer");
        $em = $this->getDoctrine()->getManager();
        $monsterTypes = $em->getRepository('AppBundle:MonsterType')->findAll();

        $context = new SerializationContext();
        $context->setGroups(['default', 'viewOnly']);
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($monsterTypes, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/monsterType/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param MonsterType $monsterType
     * @return MonsterType
     */
    public function getMonsterTypeAction(MonsterType $monsterType) {
        $serializer = $this->get("jms_serializer");

        $context = new SerializationContext();
        $context->setGroups(['default', 'viewOnly']);
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($monsterType, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/monsterType/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addMonsterTypeAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $monsterType = new MonsterType();
        $context = new DeserializationContext();
        $context->setAttribute('target', $monsterType);
        $context->setGroups(['default']);
        $monsterType = $serializer->deserialize($data, 'AppBundle\Entity\MonsterType', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($monsterType);
        $em->flush();

        $view = $this->view($monsterType, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/monsterType/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param MonsterType $monsterType
     * @return Response
     */
    public function updateMonsterTypeAction(Request $request, MonsterType $monsterType) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $monsterType);
        $context->setGroups(['default']);
        $monsterType = $serializer->deserialize($data, 'AppBundle\Entity\MonsterType', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($monsterType);
        $em->flush();

        $view = $this->view($monsterType, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/monsterType/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param MonsterType $monsterType
     * @return Response
     */
    public function deleteMonsterTypeAction(MonsterType $monsterType) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($monsterType);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}