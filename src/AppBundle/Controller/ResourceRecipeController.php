<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\ResourceRecipe;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ResourceRecipeController extends FOSRestController {
    /**
     * @Route("/resource/recipe", methods={"GET"})
     */
    public function getResourceRecipesAction() {
        $em = $this->getDoctrine()->getManager();
        $resourceRecipes = $em->getRepository('AppBundle:ResourceRecipe')->findAll();
        $view = $this->view($resourceRecipes, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/resource/recipe/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param ResourceRecipe $resourceRecipe
     * @return ResourceRecipe
     */
    public function getResourceRecipeAction(ResourceRecipe $resourceRecipe) {
        $view = $this->view($resourceRecipe, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/resource/recipe/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addResourceRecipeAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $resourceRecipe = new ResourceRecipe();
        $context = new DeserializationContext();
        $context->setAttribute('target', $resourceRecipe);
        $resourceRecipe = $serializer->deserialize($data, 'AppBundle\Entity\ResourceRecipe', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($resourceRecipe);
        $em->flush();

        $view = $this->view($resourceRecipe, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/resource/recipe/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param ResourceRecipe $resourceRecipe
     * @return Response
     */
    public function updateResourceRecipeAction(Request $request, ResourceRecipe $resourceRecipe) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $resourceRecipe);
        $resourceRecipe = $serializer->deserialize($data, 'AppBundle\Entity\ResourceRecipe', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($resourceRecipe);
        $em->flush();

        $view = $this->view($resourceRecipe, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/resource/recipe/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param ResourceRecipe $resourceRecipe
     * @return Response
     */
    public function deleteResourceRecipeAction(ResourceRecipe $resourceRecipe) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($resourceRecipe);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}