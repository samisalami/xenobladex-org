<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PersonMapmarker
 *
 * @ORM\Table(name="xenobladex_mapmarker_person")
 * @ORM\Entity
 */
class PersonMapmarker extends Mapmarker
{

    /**
     * @ORM\ManyToOne(targetEntity="Person", inversedBy="person", cascade={"all"})
     * @ORM\JoinColumn(name="person_id", referencedColumnName="id",onDelete="CASCADE")
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
