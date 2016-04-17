<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\SerializedName;

/**
 * EquipUpgrade
 *
 * @ORM\Table(name="xenobladex_equip_upgrade")
 * @ORM\Entity
 */
class EquipUpgrade
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
    private $name="";

    /**
     * @var string
     *
     * @ORM\Column(name="alternative_name", type="string", length=255)
     */
    private $alternativeName="";

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description="";

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_not_manufacturable", type="boolean")
     */
    private $isNotManufacturable = false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="has_no_tiers", type="boolean")
     */
    private $hasNoTiers = false;

    /**
     * @ORM\ManyToOne(targetEntity="EquipUpgradeCategory")
     * @ORM\JoinColumn(name="equip_upgrade_category_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:EquipUpgradeCategory'>")
     * @MaxDepth(1)
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_small1_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material_small1;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_small2_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material_small2;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_small3_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material_small3;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_large1_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material_large1;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_large2_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material_large2;

    /**
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_large3_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material_large3;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="EquipUpgradeTier", mappedBy="equipUpgrade", fetch="EXTRA_LAZY")
     * @Type("RelatedEntity<'AppBundle:EquipUpgradeTier'>")
     * @MaxDepth(1)
     */
    private $equipUpgradeTiers;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->equipUpgradeTiers = new ArrayCollection();
    }

    /**
     * @VirtualProperty
     * @SerializedName("category_name")
     */
    public function getCategoryName() {
        if(!$this->getCategory()) {
            return null;
        }
        return $this->getCategory()->getName();
    }

    /**
     * @VirtualProperty
     * @SerializedName("category_type")
     */
    public function getCategoryType() {
        if(!$this->getCategory()) {
            return null;
        }
        return $this->getCategory()->getType();
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
     * @return EquipUpgrade
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
     * @return EquipUpgrade
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
     * Set category
     *
     * @param \AppBundle\Entity\EquipUpgradeCategory $category
     * @return EquipUpgrade
     */
    public function setCategory(\AppBundle\Entity\EquipUpgradeCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \AppBundle\Entity\EquipUpgradeCategory 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Add equipUpgradeTiers
     *
     * @param \AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier
     * @return EquipUpgrade
     */
    public function addEquipUpgradeTier(\AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier)
    {
        $this->equipUpgradeTiers[] = $equipUpgradeTier;

        return $this;
    }

    /**
     * Remove equipUpgradeTiers
     *
     * @param \AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier
     */
    public function removeEquipUpgradeTier(\AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier)
    {
        $this->equipUpgradeTiers->removeElement($equipUpgradeTier);
    }

    /**
     * Get equipUpgradeTiers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getEquipUpgradeTiers()
    {
        return $this->equipUpgradeTiers;
    }

    /**
     * Set isNotManufacturable
     *
     * @param boolean $isNotManufacturable
     * @return EquipUpgrade
     */
    public function setIsNotManufacturable($isNotManufacturable)
    {
        $this->isNotManufacturable = $isNotManufacturable;

        return $this;
    }

    /**
     * Get isNotManufacturable
     *
     * @return boolean 
     */
    public function getIsNotManufacturable()
    {
        return $this->isNotManufacturable;
    }

    /**
     * Set material_small1
     *
     * @param \AppBundle\Entity\Material $materialSmall1
     * @return EquipUpgrade
     */
    public function setMaterialSmall1(\AppBundle\Entity\Material $materialSmall1 = null)
    {
        $this->material_small1 = $materialSmall1;

        return $this;
    }

    /**
     * Get material_small1
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterialSmall1()
    {
        return $this->material_small1;
    }

    /**
     * Set material_small2
     *
     * @param \AppBundle\Entity\Material $materialSmall2
     * @return EquipUpgrade
     */
    public function setMaterialSmall2(\AppBundle\Entity\Material $materialSmall2 = null)
    {
        $this->material_small2 = $materialSmall2;

        return $this;
    }

    /**
     * Get material_small2
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterialSmall2()
    {
        return $this->material_small2;
    }

    /**
     * Set material_small3
     *
     * @param \AppBundle\Entity\Material $materialSmall3
     * @return EquipUpgrade
     */
    public function setMaterialSmall3(\AppBundle\Entity\Material $materialSmall3 = null)
    {
        $this->material_small3 = $materialSmall3;

        return $this;
    }

    /**
     * Get material_small3
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterialSmall3()
    {
        return $this->material_small3;
    }

    /**
     * Set material_large1
     *
     * @param \AppBundle\Entity\Material $materialLarge1
     * @return EquipUpgrade
     */
    public function setMaterialLarge1(\AppBundle\Entity\Material $materialLarge1 = null)
    {
        $this->material_large1 = $materialLarge1;

        return $this;
    }

    /**
     * Get material_large1
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterialLarge1()
    {
        return $this->material_large1;
    }

    /**
     * Set material_large2
     *
     * @param \AppBundle\Entity\Material $materialLarge2
     * @return EquipUpgrade
     */
    public function setMaterialLarge2(\AppBundle\Entity\Material $materialLarge2 = null)
    {
        $this->material_large2 = $materialLarge2;

        return $this;
    }

    /**
     * Get material_large2
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterialLarge2()
    {
        return $this->material_large2;
    }

    /**
     * Set material_large3
     *
     * @param \AppBundle\Entity\Material $materialLarge3
     * @return EquipUpgrade
     */
    public function setMaterialLarge3(\AppBundle\Entity\Material $materialLarge3 = null)
    {
        $this->material_large3 = $materialLarge3;

        return $this;
    }

    /**
     * Get material_large3
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterialLarge3()
    {
        return $this->material_large3;
    }

    /**
     * Set alternativeName
     *
     * @param string $alternativeName
     * @return EquipUpgrade
     */
    public function setAlternativeName($alternativeName)
    {
        $this->alternativeName = $alternativeName;

        return $this;
    }

    /**
     * Get alternativeName
     *
     * @return string 
     */
    public function getAlternativeName()
    {
        return $this->alternativeName;
    }
}
