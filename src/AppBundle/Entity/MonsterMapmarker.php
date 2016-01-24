<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MonsterMapmarker
 *
 * @ORM\Table(name="xenobladex_mapmarker_monster")
 * @ORM\Entity
 */
class MonsterMapmarker extends Mapmarker
{

    /**
     * @ORM\ManyToOne(targetEntity="Monster", inversedBy="monster", cascade={"all"})
     * @ORM\JoinColumn(name="monster_id", referencedColumnName="id",onDelete="CASCADE")
     */
    private $monster;

    /**
     * Set monster
     *
     * @param \AppBundle\Entity\Monster $monster
     * @return MonsterMapmarker
     */
    public function setMonster(\AppBundle\Entity\Monster $monster = null)
    {
        $this->monster = $monster;

        return $this;
    }

    /**
     * Get monster
     *
     * @return \AppBundle\Entity\Monster 
     */
    public function getMonster()
    {
        return $this->monster;
    }
}
