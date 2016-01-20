<?php

namespace AppBundle\Entity;

use AppBundle\Entity\MonsterType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Material
 *
 * @ORM\Table(name="xenobladex_item_material")
 * @ORM\Entity
 */
class Material extends Item
{
    /**
     * @ORM\ManyToMany(targetEntity="MonsterType", mappedBy="materials", cascade={"persist"})
     */
    private $monster_types;

    public function __construct() {
        $this->monster_types = new ArrayCollection();
    }

    /**
     * Add monster_types
     *
     * @param MonsterType $monsterType
     * @return Material
     */
    public function addMonsterType(MonsterType $monsterType)
    {
        if (!$this->monster_types->contains($monsterType)) {
            $this->monster_types->add($monsterType);
            $monsterType->addMaterial($this);
        }
        return $this;
    }

    /**
     * Remove monster_types
     *
     * @param MonsterType $monsterType
     */
    public function removeMonsterType(MonsterType $monsterType)
    {
        $this->monster_types->removeElement($monsterType);
    }

    /**
     * Get monster_types
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getMonsterTypes()
    {
        return $this->monster_types;
    }
}
