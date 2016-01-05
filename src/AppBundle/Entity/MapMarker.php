<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MapMarker
 *
 * @ORM\Table(name="xenobladex_mapmarker")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="mapmarker_type", type="string")
 * @ORM\Entity
 */
class Mapmarker
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name='';

    /**
     * @var string
     *
     * @ORM\Column(name="x_coord", type="string", length=255)
     */
    protected $xCoord='';

    /**
     * @var string
     *
     * @ORM\Column(name="y_coord", type="string", length=255)
     */
    protected $yCoord='';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    protected $description='';

    /**
     * @ORM\ManyToOne(targetEntity="Map", inversedBy="person")
     * @ORM\JoinColumn(name="map_id", referencedColumnName="id")
     */
    protected $map;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return MapMarker
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set xCoord
     *
     * @param string $xCoord
     * @return MapMarker
     */
    public function setXCoord($xCoord)
    {
        $this->xCoord = $xCoord;

        return $this;
    }

    /**
     * Get xCoord
     *
     * @return string 
     */
    public function getXCoord()
    {
        return $this->xCoord;
    }

    /**
     * Set yCoord
     *
     * @param string $yCoord
     * @return MapMarker
     */
    public function setYCoord($yCoord)
    {
        $this->yCoord = $yCoord;

        return $this;
    }

    /**
     * Get yCoord
     *
     * @return string 
     */
    public function getYCoord()
    {
        return $this->yCoord;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return MapMarker
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set map
     *
     * @param \AppBundle\Entity\Map $map
     * @return MapMarker
     */
    public function setMap($map)
    {
        $this->map = $map;

        return $this;
    }

    /**
     * Get map
     *
     * @return \AppBundle\Entity\Map
     */
    public function getMap()
    {
        return $this->map;
    }

    public function getCustomRelation()
    {
        return null;
    }

    public function setCustomRelation()
    {
        return $this;
    }
}
