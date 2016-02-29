<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 29.02.2016 - 20:32
 */

namespace AppBundle\Serializer\Handler;


use Doctrine\ORM\EntityManager;
use JMS\Serializer\GraphNavigator;
use JMS\Serializer\Handler\SubscribingHandlerInterface;
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

    public function serializeObjectToId(JsonSerializationVisitor $visitor, $relatedEntity) {
        return $relatedEntity->getId();
    }

    public function serializeIdToObject(JsonSerializationVisitor $visitor, $id, array $type) {
        return $this->entityManager->getRepository($type['params'][0])->find($id);
    }
}