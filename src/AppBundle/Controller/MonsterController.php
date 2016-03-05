<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Monster;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;

class MonsterController extends FOSRestController {
    /**
     * @Route("/monster", methods={"GET"})
     */
    public function getMonstersAction() {
        $serializer = $this->get("jms_serializer");
        $em = $this->getDoctrine()->getManager();
        $monsters = $em->getRepository('AppBundle:Monster')->findAll();

        $context = new SerializationContext();
        $context->setGroups(['default', 'viewOnly']);
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($monsters, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/monster/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param Monster $monster
     * @return Monster
     */
    public function getMonsterAction(Monster $monster) {
        $serializer = $this->get("jms_serializer");

        $context = new SerializationContext();
        $context->setGroups(['default', 'viewOnly']);
        $context->enableMaxDepthChecks();

        $response = new Response($serializer->serialize($monster, 'json', $context));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/monster/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addMonsterAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $monster = new Monster();
        $context = new DeserializationContext();
        $context->setAttribute('target', $monster);
        $context->setGroups(['default']);
        $monster = $serializer->deserialize($data, 'AppBundle\Entity\Monster', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($monster);
        $em->flush();

        $view = $this->view($monster, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/monster/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param Monster $monster
     * @return Response
     */
    public function updateMonsterAction(Request $request, Monster $monster) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $monster);
        $context->setGroups(['default']);
        $monster = $serializer->deserialize($data, 'AppBundle\Entity\Monster', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($monster);
        $em->flush();

        $view = $this->view($monster, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/monster/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param Monster $monster
     * @return Response
     */
    public function deleteMonsterAction(Monster $monster) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($monster);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}