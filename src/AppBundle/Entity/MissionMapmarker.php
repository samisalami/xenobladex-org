<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MissionMapmarker
 *
 * @ORM\Table(name="xenobladex_mapmarker_mission")
 * @ORM\Entity
 */
class MissionMapmarker extends Mapmarker
{

    /**
     * @ORM\ManyToOne(targetEntity="Mission", inversedBy="mission", cascade={"all"})
     * @ORM\JoinColumn(name="mission_id", referencedColumnName="id",onDelete="CASCADE")
     */
    private $mission;

    /**
     * Set mission
     *
     * @param \AppBundle\Entity\Mission $mission
     * @return MapMarker
     */
    public function setMission(\AppBundle\Entity\Mission $mission = null)
    {
        $this->mission = $mission;

        return $this;
    }

    /**
     * Get mission
     *
     * @return \AppBundle\Entity\Mission
     */
    public function getMission()
    {
        return $this->mission;
    }
}
