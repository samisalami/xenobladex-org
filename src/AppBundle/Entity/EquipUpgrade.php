<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Type;

/**
 * EquipUpgrade
 *
 * @ORM\Table()
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
     * @ORM\Column(name="description", type="text")
     */
    private $description="";

    /**
     * @ORM\ManyToOne(targetEntity="EquipUpgradeCategory")
     * @ORM\JoinColumn(name="equip_upgrade_category_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:EquipUpgradeCategory'>")
     * @MaxDepth(1)
     */
    private $category;

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
}
