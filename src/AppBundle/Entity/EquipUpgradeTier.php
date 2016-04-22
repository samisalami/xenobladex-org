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
    private $resourceCount=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="material_count", type="integer")
     */
    private $materialCount=0;

    /**
     * @var boolean
     *
     * @ORM\Column(name="material_count_individual", type="boolean")
     */
    private $materialCountIndividual=false;

    /**
     * @var integer
     *
     * @ORM\Column(name="material1_count", type="integer")
     */
    private $material1Count=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="material2_count", type="integer")
     */
    private $material2Count=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="material3_count", type="integer")
     */
    private $material3Count=0;

    /**
     * @ORM\ManyToOne(targetEntity="EquipUpgrade")
     * @ORM\JoinColumn(name="equipupgrade_id", referencedColumnName="id", onDelete="CASCADE")
     * @Type("RelatedEntity<'AppBundle:EquipUpgrade'>")
     * @MaxDepth(1)
     */
    private $equipUpgrade;

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
        $this->resourceCount = $resourceCount;

        return $this;
    }

    /**
     * Get resource_count
     *
     * @return integer 
     */
    public function getResource1Count()
    {
        return $this->resourceCount;
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
        $this->resourceCount = $resourceCount;

        return $this;
    }

    /**
     * Get resource_count
     *
     * @return integer 
     */
    public function getResourceCount()
    {
        return $this->resourceCount;
    }

    /**
     * Set material_count
     *
     * @param integer $materialCount
     * @return EquipUpgradeTier
     */
    public function setMaterialCount($materialCount)
    {
        $this->materialCount = $materialCount;

        return $this;
    }

    /**
     * Get material_count
     *
     * @return integer 
     */
    public function getMaterialCount()
    {
        return $this->materialCount;
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

    /**
     * Set materialCountIndividual
     *
     * @param boolean $materialCountIndividual
     * @return EquipUpgradeTier
     */
    public function setMaterialCountIndividual($materialCountIndividual)
    {
        $this->materialCountIndividual = $materialCountIndividual;

        return $this;
    }

    /**
     * Get materialCountIndividual
     *
     * @return boolean 
     */
    public function getMaterialCountIndividual()
    {
        return $this->materialCountIndividual;
    }

    /**
     * Set material1Count
     *
     * @param integer $material1Count
     * @return EquipUpgradeTier
     */
    public function setMaterial1Count($material1Count)
    {
        $this->material1Count = $material1Count;

        return $this;
    }

    /**
     * Get material1Count
     *
     * @return integer 
     */
    public function getMaterial1Count()
    {
        return $this->material1Count;
    }

    /**
     * Set material2Count
     *
     * @param integer $material2Count
     * @return EquipUpgradeTier
     */
    public function setMaterial2Count($material2Count)
    {
        $this->material2Count = $material2Count;

        return $this;
    }

    /**
     * Get material2Count
     *
     * @return integer 
     */
    public function getMaterial2Count()
    {
        return $this->material2Count;
    }

    /**
     * Set material3Count
     *
     * @param integer $material3Count
     * @return EquipUpgradeTier
     */
    public function setMaterial3Count($material3Count)
    {
        $this->material3Count = $material3Count;

        return $this;
    }

    /**
     * Get material3Count
     *
     * @return integer 
     */
    public function getMaterial3Count()
    {
        return $this->material3Count;
    }
}
