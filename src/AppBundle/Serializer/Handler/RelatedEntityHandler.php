<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 29.02.2016 - 20:32
 */

namespace AppBundle\Serializer\Handler;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use JMS\Serializer\Context;
use JMS\Serializer\GraphNavigator;
use JMS\Serializer\Handler\SubscribingHandlerInterface;
use JMS\Serializer\JsonDeserializationVisitor;
use JMS\Serializer\JsonSerializationVisitor;

class RelatedEntityHandler implements SubscribingHandlerInterface
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct(EntityManager $entityManager) {

        $this->entityManager = $entityManager;
    }

    public static function getSubscribingMethods()
    {
        return array(
            array(
                'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
                'format' => 'json',
                'type' => 'RelatedEntity',
                'method' => 'serializeObjectToId',
            ),
            array(
                'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
                'format' => 'json',
                'type' => 'RelatedEntity',
                'method' => 'serializeIdToObject',
            ),
        );
    }

    public function serializeObjectToId(JsonSerializationVisitor $visitor, $relatedEntity, array $type, Context $context) {
        if(is_array($relatedEntity) || $relatedEntity instanceof \Traversable) {
            $entities = [];
            foreach ($relatedEntity as $entity) {
                $entities[] = ($entity->getId());
            }
            return $entities;
        }
        return $relatedEntity->getId();
    }

    public function serializeIdToObject(JsonDeserializationVisitor $visitor, $relatedEntity, array $type, Context $context) {
        if(is_array($relatedEntity) || $relatedEntity instanceof \Traversable) {
            $entities = new ArrayCollection();
            foreach ($relatedEntity as $entity) {
                $entities->add($this->entityManager->getRepository($type['params'][0])->find($entity));
            }
            return $entities;
        }
        return $this->entityManager->getRepository($type['params'][0])->find($relatedEntity);
    }
}