<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Type;

/**
 * ResourceRecipe
 *
 * @ORM\Table(name="xenobladex_resource_recipe")
 * @ORM\Entity
 */
class ResourceRecipe
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
     * @var integer
     *
     * @ORM\Column(name="count", type="smallint")
     */
    private $count;

    /**
     * @ORM\ManyToOne(targetEntity="Resource")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id", onDelete="CASCADE")
     * @Type("RelatedEntity<'AppBundle:Resource'>")
     * @MaxDepth(1)
     */
    private $resource;

    /**
     * @ORM\ManyToOne(targetEntity="EquipUpgradeTier")
     * @ORM\JoinColumn(name="equip_upgrade_tier_id", referencedColumnName="id", onDelete="CASCADE")
     * @Type("RelatedEntity<'AppBundle:EquipUpgradeTier'>")
     * @MaxDepth(1)
     */
    private $equipUpgradeTier;



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
     * Set count
     *
     * @param integer $count
     * @return ResourceRecipe
     */
    public function setCount($count)
    {
        $this->count = $count;

        return $this;
    }

    /**
     * Get count
     *
     * @return integer 
     */
    public function getCount()
    {
        return $this->count;
    }

    /**
     * Set resource
     *
     * @param \AppBundle\Entity\Resource $resource
     * @return ResourceRecipe
     */
    public function setResource(\AppBundle\Entity\Resource $resource = null)
    {
        $this->resource = $resource;

        return $this;
    }

    /**
     * Get resource
     *
     * @return \AppBundle\Entity\Resource 
     */
    public function getResource()
    {
        return $this->resource;
    }

    /**
     * Set equipUpgradeTier
     *
     * @param \AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier
     * @return ResourceRecipe
     */
    public function setEquipUpgradeTier(\AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier = null)
    {
        $this->equipUpgradeTier = $equipUpgradeTier;

        return $this;
    }

    /**
     * Get equipUpgradeTier
     *
     * @return \AppBundle\Entity\EquipUpgradeTier 
     */
    public function getEquipUpgradeTier()
    {
        return $this->equipUpgradeTier;
    }
}
