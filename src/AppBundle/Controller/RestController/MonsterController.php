<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller\RestController;

use AppBundle\Entity\Monster;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class MonsterController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteMonster(Monster $monster) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($monster);
        $em->flush();
    }

    protected function addMonster(Monster $deserialized_monster) {
        $em = $this->getDoctrine()->getManager();
        $monster = $em->merge($deserialized_monster);
        $em->persist($monster);
        foreach($deserialized_monster->getMaterials() as $material) {
            $material = $em->merge($material);
            $material->addMonster($monster);
        }
        $em->flush();
    }

    protected function updateMonster(Monster $deserialized_monster) {
        $em = $this->getDoctrine()->getManager();

        //material
        $newMaterials = [];
        $monster = $em->getRepository('AppBundle:Monster')->find($deserialized_monster->getId());

        foreach($deserialized_monster->getMaterials() as $material) {
            $material =  $em->merge($material);
            $material->addMonster($monster);
            $newMaterials[] = $material;
        }

        $monsterMaterials = $monster->getMaterials();

        foreach ($monsterMaterials as $material) {
            if(!in_array($material,$newMaterials,true)) {
                $monster->removeMaterial($material);
            }
        }


        //mapmarkers
        $newMapmarkers = $deserialized_monster->getMapmarkers();
        $countNewMapmarkers = count($newMapmarkers);
        $currentMapmarkers = $monster->getMapmarkers();

        foreach($currentMapmarkers as $currentMapmarker) {
            $counter = 0;
            $exists = false;
            foreach($newMapmarkers as $newMapmarker) {
                if($newMapmarker->getId()) {
                    if($newMapmarker->getId() == $currentMapmarker->getId()) {
                        $exists = true;
                    }
                }

                $counter++;

                if($counter==$countNewMapmarkers && !$exists) {
                    $deserialized_monster->removeMapmarker($currentMapmarker);
                    $em->remove($currentMapmarker);
                }
            }
        }

        $em->merge($deserialized_monster);
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getMonstersAction() {
        $em = $this->getDoctrine()->getManager();
        $monsters = $em->getRepository('AppBundle:Monster')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($monsters, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/monster/add", methods={"POST"})
     */
    public function addMonsterAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_monster = $serializer->deserialize($content, 'AppBundle\Entity\Monster', 'json');
            $this->addMonster($deserialized_monster);
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/monster/update", methods={"POST"})
     */
    public function updateMonsterAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_monster = $serializer->deserialize($content, 'AppBundle\Entity\Monster', 'json');

            $this->updateMonster($deserialized_monster);

            $response = new Response($serializer->serialize($deserialized_monster, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/api/monster/delete/{id}", methods={"DELETE"})
     * @ParamConverter("monster", class="AppBundle:Monster")
     * @param Monster $monster
     * @return Response
     */
    public function deleteMonsterAction(Monster $monster) {
        $this->deleteMonster($monster);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($monster, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}