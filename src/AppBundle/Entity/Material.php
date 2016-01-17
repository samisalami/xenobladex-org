<?php

namespace AppBundle\Entity;

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
        $this->monster_types = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add monster_types
     *
     * @param \AppBundle\Entity\MonsterType $monsterTypes
     * @return Material
     */
    public function addMonsterType(\AppBundle\Entity\MonsterType $monsterTypes)
    {
        $this->monster_types[] = $monsterTypes;

        return $this;
    }

    /**
     * Remove monster_types
     *
     * @param \AppBundle\Entity\MonsterType $monsterTypes
     */
    public function removeMonsterType(\AppBundle\Entity\MonsterType $monsterTypes)
    {
        $this->monster_types->removeElement($monsterTypes);
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
