<?php

namespace AppBundle\Entity;

use AppBundle\Entity\MonsterType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\Groups;

/**
 * Material
 *
 * http://stackoverflow.com/questions/33399403/symfony2-entity-findall-return-large-response-on-api
 *
 * @ORM\Table(name="xenobladex_item_material")
 * @ORM\Entity
 */
class Material extends Item
{
    /**
     * @ORM\ManyToMany(targetEntity="MonsterType", mappedBy="materials", cascade={"persist"})
     * @Type("ArrayCollection<AppBundle\Entity\MonsterType>")
     * @Groups({"materialDetail"})
     */
    private $monster_types;

    /**
     * @ORM\ManyToMany(targetEntity="Monster", mappedBy="materials", cascade={"persist"})
     * @Type("ArrayCollection<AppBundle\Entity\Monster>")
     * @Groups({"materialDetail"})
     */
    private $monsters;

    public function __construct() {
        $this->monster_types = new ArrayCollection();
        $this->monsters = new ArrayCollection();
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

    /**
     * Add monsters
     *
     * @param \AppBundle\Entity\Monster $monster
     * @return Material
     */
    public function addMonster(\AppBundle\Entity\Monster $monster)
    {
        if (!$this->monsters->contains($monster)) {
            $this->monsters[] = $monster;
            $monster->addMaterial($this);
        }

        return $this;
    }

    /**
     * Remove monsters
     *
     * @param \AppBundle\Entity\Monster $monsters
     */
    public function removeMonster(\AppBundle\Entity\Monster $monster)
    {
        $this->monsters->removeElement($monster);
    }

    /**
     * Get monsters
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getMonsters()
    {
        return $this->monsters;
    }
}
