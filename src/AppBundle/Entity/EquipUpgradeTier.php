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
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="MaterialRecipe", mappedBy="equipUpgradeTier", fetch="EXTRA_LAZY")
     * @Type("RelatedEntity<'AppBundle:MaterialRecipe'>")
     * @MaxDepth(1)
     */
    private $materialRecipes;

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
     * Add materialRecipe
     *
     * @param MaterialRecipe $materialRecipe
     * @return EquipUpgradeTier
     */
    public function addMaterialRecipe(MaterialRecipe $materialRecipe)
    {
        $this->materialRecipes[] = $materialRecipe;

        return $this;
    }

    /**
     * Remove materialRecipe
     * @param MaterialRecipe $materialRecipe
     */
    public function removeMaterialRecipe(MaterialRecipe $materialRecipe)
    {
        $this->materialRecipes->removeElement($materialRecipe);
    }

    /**
     * Get materialRecipes
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getMaterialRecipes()
    {
        return $this->materialRecipes;
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
}
