<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MapMarker
 *
 * @ORM\Table(name="xenobladex_mapmarker_person")
 * @ORM\Entity
 */
class PersonMapmarker extends Mapmarker
{

    /**
     * @ORM\ManyToOne(targetEntity="Person")
     * @ORM\JoinColumn(name="person_id", referencedColumnName="id",nullable=true)
     */
    private $person;

    /**
     * Set person
     *
     * @param \AppBundle\Entity\Person $person
     * @return MapMarker
     */
    public function setPerson(\AppBundle\Entity\Person $person = null)
    {
        $this->person = $person;

        return $this;
    }

    /**
     * Get person
     *
     * @return \AppBundle\Entity\Person
     */
    public function getPerson()
    {
        return $this->person;
    }
}
