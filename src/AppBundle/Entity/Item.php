<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Item
 *
 * @ORM\Table(name="xenobladex_item")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="item_type", type="string")
 * @ORM\Entity
 */
class Item
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
    protected $name = "";

    /**
     * @var string
     *
     * @ORM\Column(name="rarity", type="string", length=255)
     */
    protected $rarity = "Gewöhnlich";

    /**
     * @var integer
     *
     * @ORM\Column(name="credit_cost", type="integer")
     */
    protected $creditCost = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="ticket_cost", type="smallint")
     */
    protected $ticketCost = 0;

    /**
     * @var string
     *
     * @ORM\Column(name="body_part", type="string", length=255)
     */
    protected $bodyPart = "";

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    protected $description = "";


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
     * @return Item
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
     * Set rarity
     *
     * @param string $rarity
     * @return Item
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
     * Set creditCost
     *
     * @param integer $creditCost
     * @return Item
     */
    public function setCreditCost($creditCost)
    {
        $this->creditCost = $creditCost;

        return $this;
    }

    /**
     * Get creditCost
     *
     * @return integer 
     */
    public function getCreditCost()
    {
        return $this->creditCost;
    }

    /**
     * Set ticketCost
     *
     * @param integer $ticketCost
     * @return Item
     */
    public function setTicketCost($ticketCost)
    {
        $this->ticketCost = $ticketCost;

        return $this;
    }

    /**
     * Get ticketCost
     *
     * @return integer 
     */
    public function getTicketCost()
    {
        return $this->ticketCost;
    }

    /**
     * Set bodyPart
     *
     * @param string $bodyPart
     * @return Item
     */
    public function setBodyPart($bodyPart)
    {
        $this->bodyPart = $bodyPart;

        return $this;
    }

    /**
     * Get bodyPart
     *
     * @return string 
     */
    public function getBodyPart()
    {
        return $this->bodyPart;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Item
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
}
