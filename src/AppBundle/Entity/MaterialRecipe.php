<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Type;

/**
 * MaterialRecipe
 *
 * @ORM\Table(name="xenobladex_material_recipe")
 * @ORM\Entity
 */
class MaterialRecipe
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
     * @ORM\ManyToOne(targetEntity="Material")
     * @ORM\JoinColumn(name="material_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $material;

    /**
     * @ORM\ManyToOne(targetEntity="EquipUpgradeTier")
     * @ORM\JoinColumn(name="equip_upgrade_tier_id", referencedColumnName="id")
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
     * @return MaterialRecipe
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
     * Set material
     *
     * @param \AppBundle\Entity\Material $material
     * @return MaterialRecipe
     */
    public function setMaterial(\AppBundle\Entity\Material $material = null)
    {
        $this->material = $material;

        return $this;
    }

    /**
     * Get material
     *
     * @return \AppBundle\Entity\Material 
     */
    public function getMaterial()
    {
        return $this->material;
    }

    /**
     * Set equipUpgradeTier
     *
     * @param \AppBundle\Entity\EquipUpgradeTier $equipUpgradeTier
     * @return MaterialRecipe
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
