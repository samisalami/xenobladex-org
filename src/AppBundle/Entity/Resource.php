<?php

namespace AppBundle\Entity;

use AppBundle\Entity\MonsterType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;

/**
 * Material
 *
 * @ORM\Table(name="xenobladex_item_resource")
 * @ORM\Entity
 */
class Resource extends Item
{
    /**
     * @var string
     *
     * @ORM\Column(name="region", type="string", length=255)
     */
    private $region = "";

    /**
     * @return string
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * @param string $region
     * @return Resource
     */
    public function setRegion($region)
    {
        $this->region = $region;
        return $this;
    }

}
