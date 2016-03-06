<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Map
 *
 * @ORM\Table(name="xenobladex_map")
 * @ORM\Entity
 */
class Map
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name = '';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description = '';

    /**
     * @var integer
     *
     * @ORM\Column(name="grid_offset_x", type="smallint")
     */
    private $gridOffsetX = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="grid_offset_y", type="smallint")
     */
    private $gridOffsetY = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="grid_width", type="smallint")
     */
    private $gridWidth = 1000;

    /**
     * @var integer
     *
     * @ORM\Column(name="grid_height", type="smallint")
     */
    private $gridHeight = 1000;

    /**
     * @var integer
     *
     * @ORM\Column(name="grid_tile_diameter", type="smallint")
     */
    private $gridTileDiameter = 100;

    /**
     * @var integer
     *
     * @ORM\Column(name="grid_tile_margin", type="smallint")
     */
    private $gridTileMargin = 1;

    /**
     * @ORM\ManyToOne(targetEntity="Attachment")
     * @ORM\JoinColumn(name="attachment_id", referencedColumnName="id")
     */
    private $attachment;


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
     * @return Map
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
     * Set attachment
     *
     * @param \AppBundle\Entity\Attachment $attachment
     * @return Attachment
     */
    public function setAttachment(\AppBundle\Entity\Attachment $attachment = null)
    {
        $this->attachment = $attachment;

        return $this;
    }

    /**
     * Get attachment
     *
     * @return \AppBundle\Entity\Attachment
     */
    public function getAttachment()
    {
        return $this->attachment;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Map
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
     * Set gridOffsetX
     *
     * @param integer $gridOffsetX
     * @return Map
     */
    public function setGridOffsetX($gridOffsetX)
    {
        $this->gridOffsetX = $gridOffsetX;

        return $this;
    }

    /**
     * Get gridOffsetX
     *
     * @return integer 
     */
    public function getGridOffsetX()
    {
        return $this->gridOffsetX;
    }

    /**
     * Set gridOffsetY
     *
     * @param integer $gridOffsetY
     * @return Map
     */
    public function setGridOffsetY($gridOffsetY)
    {
        $this->gridOffsetY = $gridOffsetY;

        return $this;
    }

    /**
     * Get gridOffsetY
     *
     * @return integer 
     */
    public function getGridOffsetY()
    {
        return $this->gridOffsetY;
    }

    /**
     * Set gridTileDiameter
     *
     * @param integer $gridTileDiameter
     * @return Map
     */
    public function setGridTileDiameter($gridTileDiameter)
    {
        $this->gridTileDiameter = $gridTileDiameter;

        return $this;
    }

    /**
     * Get gridTileDiameter
     *
     * @return integer 
     */
    public function getGridTileDiameter()
    {
        return $this->gridTileDiameter;
    }

    /**
     * Set gridTileMargin
     *
     * @param integer $gridTileMargin
     * @return Map
     */
    public function setGridTileMargin($gridTileMargin)
    {
        $this->gridTileMargin = $gridTileMargin;

        return $this;
    }

    /**
     * Get gridTileMargin
     *
     * @return integer 
     */
    public function getGridTileMargin()
    {
        return $this->gridTileMargin;
    }

    /**
     * Set gridWidth
     *
     * @param integer $gridWidth
     * @return Map
     */
    public function setGridWidth($gridWidth)
    {
        $this->gridWidth = $gridWidth;

        return $this;
    }

    /**
     * Get gridWidth
     *
     * @return integer 
     */
    public function getGridWidth()
    {
        return $this->gridWidth;
    }

    /**
     * Set gridHeight
     *
     * @param integer $gridHeight
     * @return Map
     */
    public function setGridHeight($gridHeight)
    {
        $this->gridHeight = $gridHeight;

        return $this;
    }

    /**
     * Get gridHeight
     *
     * @return integer 
     */
    public function getGridHeight()
    {
        return $this->gridHeight;
    }
}
