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
     * @var integer
     *
     * @ORM\Column(name="credit_cost", type="integer")
     */
    protected $creditCost = 0;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material1_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material1;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material2_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material2;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material3_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material3;

    /**
     * @ORM\ManyToOne(targetEntity="Resource")
     * @ORM\JoinColumn(name="resource1_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Resource'>")
     * @MaxDepth(1)
     */
    private $resource1;

    /**
     * @var integer
     *
     * @ORM\Column(name="material1_count", type="integer")
     */
    private $material1_count;

    /**
     * @var integer
     *
     * @ORM\Column(name="material2_count", type="integer")
     */
    private $material2_count;

    /**
     * @var integer
     *
     * @ORM\Column(name="material3_count", type="integer")
     */
    private $material3_count;

    /**
     * @var integer
     *
     * @ORM\Column(name="resource1_count", type="integer")
     */
    private $resource1_count;

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
     * Set material1_count
     *
     * @param integer $material1Count
     * @return EquipUpgradeTier
     */
    public function setMaterial1Count($material1Count)
    {
        $this->material1_count = $material1Count;

        return $this;
    }

    /**
     * Get material1_count
     *
     * @return integer 
     */
    public function getMaterial1Count()
    {
        return $this->material1_count;
    }

    /**
     * Set material2_count
     *
     * @param integer $material2Count
     * @return EquipUpgradeTier
     */
    public function setMaterial2Count($material2Count)
    {
        $this->material2_count = $material2Count;

        return $this;
    }

    /**
     * Get material2_count
     *
     * @return integer 
     */
    public function getMaterial2Count()
    {
        return $this->material2_count;
    }

    /**
     * Set material3_count
     *
     * @param integer $material3Count
     * @return EquipUpgradeTier
     */
    public function setMaterial3Count($material3Count)
    {
        $this->material3_count = $material3Count;

        return $this;
    }

    /**
     * Get material3_count
     *
     * @return integer 
     */
    public function getMaterial3Count()
    {
        return $this->material3_count;
    }

    /**
     * Set resource1_count
     *
     * @param integer $resource1Count
     * @return EquipUpgradeTier
     */
    public function setResource1Count($resource1Count)
    {
        $this->resource1_count = $resource1Count;

        return $this;
    }

    /**
     * Get resource1_count
     *
     * @return integer 
     */
    public function getResource1Count()
    {
        return $this->resource1_count;
    }

    /**
     * Set material1
     *
     * @param \AppBundle\Entity\Material $material1
     * @return EquipUpgradeTier
     */
    public function setMaterial1(\AppBundle\Entity\Material $material1 = null)
    {
        $this->material1 = $material1;

        return $this;
    }

    /**
     * Get material1
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterial1()
    {
        return $this->material1;
    }

    /**
     * Set material2
     *
     * @param \AppBundle\Entity\Material $material2
     * @return EquipUpgradeTier
     */
    public function setMaterial2(\AppBundle\Entity\Material $material2 = null)
    {
        $this->material2 = $material2;

        return $this;
    }

    /**
     * Get material2
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterial2()
    {
        return $this->material2;
    }

    /**
     * Set material3
     *
     * @param \AppBundle\Entity\Material $material3
     * @return EquipUpgradeTier
     */
    public function setMaterial3(\AppBundle\Entity\Material $material3 = null)
    {
        $this->material3 = $material3;

        return $this;
    }

    /**
     * Get material3
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterial3()
    {
        return $this->material3;
    }

    /**
     * Set resource1
     *
     * @param \AppBundle\Entity\Resource $resource1
     * @return EquipUpgradeTier
     */
    public function setResource1(\AppBundle\Entity\Resource $resource1 = null)
    {
        $this->resource1 = $resource1;

        return $this;
    }

    /**
     * Get resource1
     *
     * @return \AppBundle\Entity\Resource 
     */
    public function getResource1()
    {
        return $this->resource1;
    }
}
