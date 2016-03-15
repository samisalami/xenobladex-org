<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\MaterialRecipe;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MaterialRecipeController extends FOSRestController {
    /**
     * @Route("/material/recipe", methods={"GET"})
     */
    public function getMaterialRecipesAction() {
        $em = $this->getDoctrine()->getManager();
        $materialRecipes = $em->getRepository('AppBundle:MaterialRecipe')->findAll();
        $view = $this->view($materialRecipes, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/material/recipe/{id}", methods={"GET"}, requirements={"id"="^[0-9].*$"})
     * @param MaterialRecipe $materialRecipe
     * @return MaterialRecipe
     */
    public function getMaterialRecipeAction(MaterialRecipe $materialRecipe) {
        $view = $this->view($materialRecipe, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/material/recipe/", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addMaterialRecipeAction(Request $request) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $materialRecipe = new MaterialRecipe();
        $context = new DeserializationContext();
        $context->setAttribute('target', $materialRecipe);
        $materialRecipe = $serializer->deserialize($data, 'AppBundle\Entity\MaterialRecipe', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($materialRecipe);
        $em->flush();

        $view = $this->view($materialRecipe, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/material/recipe/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     * @param Request $request
     * @param MaterialRecipe $materialRecipe
     * @return Response
     */
    public function updateMaterialRecipeAction(Request $request, MaterialRecipe $materialRecipe) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $materialRecipe);
        $materialRecipe = $serializer->deserialize($data, 'AppBundle\Entity\MaterialRecipe', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($materialRecipe);
        $em->flush();

        $view = $this->view($materialRecipe, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/api/material/recipe/{id}", methods={"DELETE"}, requirements={"id"="^[0-9].*$"})
     * @param MaterialRecipe $materialRecipe
     * @return Response
     */
    public function deleteMaterialRecipeAction(MaterialRecipe $materialRecipe) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($materialRecipe);
        $em->flush();

        return new Response(Response::HTTP_OK);
    }
}