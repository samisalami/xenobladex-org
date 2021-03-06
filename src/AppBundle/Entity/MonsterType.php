<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;

/**
 * MonsterType
 *
 * @ORM\Table(name="xenobladex_monster_type")
 * @ORM\Entity
 */
class MonsterType
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
     * @var integer
     *
     * @ORM\Column(name="prio", type="smallint")
     */
    private $prio=0;

    /**
     * @ORM\ManyToMany(targetEntity="Material", fetch="EXTRA_LAZY")
     * @ORM\JoinTable(name="xenobladex_monster_type_material",
     *      joinColumns={@ORM\JoinColumn(name="monster_type_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="material_id", referencedColumnName="id", onDelete="CASCADE")}
     *      )
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $materials;

    public function __construct() {
        $this->materials = new ArrayCollection();
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
     * @return MonsterType
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
     * @return MonsterType
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
     * Add materials
     *
     * @param \AppBundle\Entity\Material $material
     * @return MonsterType
     */
    public function addMaterial(\AppBundle\Entity\Material $material)
    {
        if (!$this->materials->contains($material)) {
            $this->materials->add($material);
            $material->addMonsterType($this);
        }
        return $this;
    }

    /**
     * Remove materials
     *
     * @param \AppBundle\Entity\Material $material
     */
    public function removeMaterial(\AppBundle\Entity\Material $material)
    {
        $this->materials->removeElement($material);
    }

    /**
     * Get materials
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getMaterials()
    {
        return $this->materials;
    }

    /**
     * Set prio
     *
     * @param integer $prio
     * @return MonsterType
     */
    public function setPrio($prio)
    {
        $this->prio = $prio;

        return $this;
    }

    /**
     * Get prio
     *
     * @return integer 
     */
    public function getPrio()
    {
        return $this->prio;
    }
}
