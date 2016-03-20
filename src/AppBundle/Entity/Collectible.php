<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Collectible
 *
 * @ORM\Table(name="xenobladex_collectible")
 * @ORM\Entity
 */
class Collectible
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
     * @var string
     *
     * @ORM\Column(name="rarity", type="text")
     */
    private $rarity = 'Gewöhnlich';

    /**
     * @var string
     *
     * @ORM\Column(name="location_note", type="text")
     */
    private $locationNote = '';

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_lucky_field", type="boolean")
     */
    private $isLuckyField=false;


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
     * @return Collectible
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
     * Set description
     *
     * @param string $description
     * @return Collectible
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
     * Set locationNote
     *
     * @param string $locationNote
     * @return Collectible
     */
    public function setLocationNote($locationNote)
    {
        $this->locationNote = $locationNote;

        return $this;
    }

    /**
     * Get locationNote
     *
     * @return string 
     */
    public function getLocationNote()
    {
        return $this->locationNote;
    }

    /**
     * Set rarity
     *
     * @param string $rarity
     * @return Collectible
     */
    public function setRarity($rarity)
    {
        $this->rarity = $rarity;

        return $this;
    }

    /**
     * Get rarity
     *
     * @return string 
     */
    public function getRarity()
    {
        return $this->rarity;
    }

    /**
     * Set isLuckyField
     *
     * @param boolean $isLuckyField
     * @return Collectible
     */
    public function setIsLuckyField($isLuckyField)
    {
        $this->isLuckyField = $isLuckyField;

        return $this;
    }

    /**
     * Get isLuckyField
     *
     * @return boolean 
     */
    public function getIsLuckyField()
    {
        return $this->isLuckyField;
    }
}
