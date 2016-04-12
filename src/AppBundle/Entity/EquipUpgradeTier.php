<?php

namespace AppBundle\Entity;

use AppBundle\Entity\MaterialRecipe;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Type;

/**
 * EquipUpgradeTier
 *
 * @ORM\Table(name="xenobladex_equipupgrade_tier")
 * @ORM\Entity
 */
class EquipUpgradeTier
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
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description="";

    /**
     * @var integer
     *
     * @ORM\Column(name="credit_cost", type="integer")
     */
    protected $creditCost = 0;

    /**
     * @ORM\ManyToOne(targetEntity="Resource")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Resource'>")
     * @MaxDepth(1)
     */
    private $resource;

    /**
     * @var integer
     *
     * @ORM\Column(name="resource_count", type="integer")
     */
    private $resource_count=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="material_count", type="integer")
     */
    private $material_count=0;

    /**
     * @ORM\ManyToOne(targetEntity="EquipUpgrade")
     * @ORM\JoinColumn(name="equipupgrade_id", referencedColumnName="id", onDelete="CASCADE")
     * @Type("RelatedEntity<'AppBundle:EquipUpgrade'>")
     * @MaxDepth(1)
     */
    private $equipUpgrade;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->materialRecipes = new ArrayCollection();
        $this->resourceRecipes = new ArrayCollection();
    }

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
     * @return EquipUpgradeTier
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
     * Set equipUpgrade
     *
     * @param \AppBundle\Entity\EquipUpgrade $equipUpgrade
     * @return EquipUpgradeTier
     */
    public function setEquipUpgrade(\AppBundle\Entity\EquipUpgrade $equipUpgrade = null)
    {
        $this->equipUpgrade = $equipUpgrade;

        return $this;
    }

    /**
     * Get equipUpgrade
     *
     * @return \AppBundle\Entity\EquipUpgrade
     */
    public function getEquipUpgrade()
    {
        return $this->equipUpgrade;
    }

    /**
     * Set creditCost
     *
     * @param integer $creditCost
     * @return EquipUpgradeTier
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
     * Set resource_count
     *
     * @param integer $resourceCount
     * @return EquipUpgradeTier
     */
    public function setResource1Count($resourceCount)
    {
        $this->resource_count = $resourceCount;

        return $this;
    }

    /**
     * Get resource_count
     *
     * @return integer 
     */
    public function getResource1Count()
    {
        return $this->resource_count;
    }

    /**
     * Set resource
     *
     * @param \AppBundle\Entity\Resource $resource
     * @return EquipUpgradeTier
     */
    public function setResource1(\AppBundle\Entity\Resource $resource = null)
    {
        $this->resource = $resource;

        return $this;
    }

    /**
     * Get resource
     *
     * @return \AppBundle\Entity\Resource 
     */
    public function getResource1()
    {
        return $this->resource;
    }

    /**
     * Set resource_count
     *
     * @param integer $resourceCount
     * @return EquipUpgradeTier
     */
    public function setResourceCount($resourceCount)
    {
        $this->resource_count = $resourceCount;

        return $this;
    }

    /**
     * Get resource_count
     *
     * @return integer 
     */
    public function getResourceCount()
    {
        return $this->resource_count;
    }

    /**
     * Set material_count
     *
     * @param integer $materialCount
     * @return EquipUpgradeTier
     */
    public function setMaterialCount($materialCount)
    {
        $this->material_count = $materialCount;

        return $this;
    }

    /**
     * Get material_count
     *
     * @return integer 
     */
    public function getMaterialCount()
    {
        return $this->material_count;
    }

    /**
     * Set resource
     *
     * @param \AppBundle\Entity\Resource $resource
     * @return EquipUpgradeTier
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
     * Set description
     *
     * @param string $description
     * @return EquipUpgradeTier
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
