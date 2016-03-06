<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;

/**
 * Monster
 *
 * @ORM\Table(name="xenobladex_monster")
 * @ORM\Entity
 */
class Monster
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
    private $name='';

    /**
     * @var integer
     *
     * @ORM\Column(name="level_min", type="smallint")
     */
    private $levelMin=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="level_max", type="smallint")
     */
    private $levelMax=0;

    /**
     * @var string
     *
     * @ORM\Column(name="time", type="string", length=255)
     */
    private $time='Immer';

    /**
     * @var string
     *
     * @ORM\Column(name="weather", type="string", length=255)
     */
    private $weather='Immer';

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_unique", type="boolean")
     */
    private $isUnique=false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_story", type="boolean")
     */
    private $isStory=false;

    /**
     * @var string
     *
     * @ORM\Column(name="ep", type="string", length=255)
     */
    private $ep='';

    /**
     * @var string
     *
     * @ORM\Column(name="hp", type="string", length=255)
     */
    private $hp='';

    /**
     * @var integer
     *
     * @ORM\Column(name="res_physic", type="smallint")
     */
    private $resPhysic=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="res_laser", type="smallint")
     */
    private $resLaser=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="res_ether", type="smallint")
     */
    private $resEther=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="res_thermo", type="smallint")
     */
    private $resThermo=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="res_electric", type="smallint")
     */
    private $resElectric=0;

    /**
     * @var integer
     *
     * @ORM\Column(name="res_gravit", type="smallint")
     */
    private $resGravit=0;

    /**
     * @var string
     *
     * @ORM\Column(name="aggression_day", type="string", length=255)
     */
    private $aggressionDay='Harmlos';

    /**
     * @var string
     *
     * @ORM\Column(name="agression_night", type="string", length=255)
     */
    private $agressionNight='Harmlos';

    /**
     * @var string
     *
     * @ORM\Column(name="agression_skell_day", type="string", length=255)
     */
    private $agressionSkellDay='Harmlos';

    /**
     * @var string
     *
     * @ORM\Column(name="agression_skell_night", type="string", length=255)
     */
    private $agressionSkellNight='Harmlos';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description='';

    /**
     * @var string
     *
     * @ORM\Column(name="location_note", type="text")
     */
    private $locationNote='';

    /**
     * @var string
     *
     * @ORM\Column(name="region", type="string", length=255)
     */
    private $region='Primordia';

    /**
     * @ORM\ManyToOne(targetEntity="MonsterType")
     * @ORM\JoinColumn(name="monster_type_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:MonsterType'>")
     * @MaxDepth(1)
     */
    private $monsterType;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="MonsterMapmarker", mappedBy="monster", fetch="EXTRA_LAZY")
     * @Type("RelatedEntity<'AppBundle:MonsterMapmarker'>")
     * @MaxDepth(1)
     */
    private $mapmarkers;

    /**
     * @ORM\ManyToMany(targetEntity="Material", fetch="EXTRA_LAZY")
     * @ORM\JoinTable(name="xenobladex_monster_material",
     *      joinColumns={@ORM\JoinColumn(name="monster_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="material_id", referencedColumnName="id", onDelete="CASCADE")}
     *      )
     * @Type("RelatedEntity<'AppBundle:Material'>")
     * @MaxDepth(1)
     */
    private $materials;

    /**
     * @VirtualProperty
     * @SerializedName("monster_type_prio")
     */
    public function getMonsterTypePrio() {
        if(!$this->getMonsterType()) {
            return null;
        }
        return $this->getMonsterType()->getPrio();
    }

    /**
     * Monster constructor.
     */
    public function __construct()
    {
        $this->materials = new ArrayCollection();
        $this->mapmarkers = new ArrayCollection();
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
     * @return Monster
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
     * Set levelMin
     *
     * @param integer $levelMin
     * @return Monster
     */
    public function setLevelMin($levelMin)
    {
        $this->levelMin = $levelMin;

        return $this;
    }

    /**
     * Get levelMin
     *
     * @return integer 
     */
    public function getLevelMin()
    {
        return $this->levelMin;
    }

    /**
     * Set levelMax
     *
     * @param integer $levelMax
     * @return Monster
     */
    public function setLevelMax($levelMax)
    {
        $this->levelMax = $levelMax;

        return $this;
    }

    /**
     * Get levelMax
     *
     * @return integer 
     */
    public function getLevelMax()
    {
        return $this->levelMax;
    }

    /**
     * Set time
     *
     * @param string $time
     * @return Monster
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return string 
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set weather
     *
     * @param string $weather
     * @return Monster
     */
    public function setWeather($weather)
    {
        $this->weather = $weather;

        return $this;
    }

    /**
     * Get weather
     *
     * @return string 
     */
    public function getWeather()
    {
        return $this->weather;
    }

    /**
     * Set isUnique
     *
     * @param boolean $isUnique
     * @return Monster
     */
    public function setIsUnique($isUnique)
    {
        $this->isUnique = $isUnique;

        return $this;
    }

    /**
     * Get isUnique
     *
     * @return boolean 
     */
    public function getIsUnique()
    {
        return $this->isUnique;
    }


    /**
     * Set aggressionDay
     *
     * @param string $aggressionDay
     * @return Monster
     */
    public function setAggressionDay($aggressionDay)
    {
        $this->aggressionDay = $aggressionDay;

        return $this;
    }

    /**
     * Get aggressionDay
     *
     * @return string 
     */
    public function getAggressionDay()
    {
        return $this->aggressionDay;
    }

    /**
     * Set agressionNight
     *
     * @param string $agressionNight
     * @return Monster
     */
    public function setAgressionNight($agressionNight)
    {
        $this->agressionNight = $agressionNight;

        return $this;
    }

    /**
     * Get agressionNight
     *
     * @return string 
     */
    public function getAgressionNight()
    {
        return $this->agressionNight;
    }

    /**
     * Set agressionSkellDay
     *
     * @param string $agressionSkellDay
     * @return Monster
     */
    public function setAgressionSkellDay($agressionSkellDay)
    {
        $this->agressionSkellDay = $agressionSkellDay;

        return $this;
    }

    /**
     * Get agressionSkellDay
     *
     * @return string 
     */
    public function getAgressionSkellDay()
    {
        return $this->agressionSkellDay;
    }

    /**
     * Set agressionSkellNight
     *
     * @param string $agressionSkellNight
     * @return Monster
     */
    public function setAgressionSkellNight($agressionSkellNight)
    {
        $this->agressionSkellNight = $agressionSkellNight;

        return $this;
    }

    /**
     * Get agressionSkellNight
     *
     * @return string 
     */
    public function getAgressionSkellNight()
    {
        return $this->agressionSkellNight;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Monster
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
     * Set locationNote
     *
     * @param string $locationNote
     * @return Monster
     */
    public function setLocationNote($locationNote)
    {
        $this->locationNote = $locationNote;

        return $this;
    }

    /**
     * Get locationNote
     *
     * @return string 
     */
    public function getLocationNote()
    {
        return $this->locationNote;
    }

    /**
     * Set monsterType
     *
     * @param \AppBundle\Entity\MonsterType $monsterType
     * @return Monster
     */
    public function setMonsterType(\AppBundle\Entity\MonsterType $monsterType = null)
    {
        $this->monsterType = $monsterType;

        return $this;
    }

    /**
     * Get monsterType
     *
     * @return \AppBundle\Entity\MonsterType 
     */
    public function getMonsterType()
    {
        return $this->monsterType;
    }

    /**
     * Add mapmarkers
     *
     * @param \AppBundle\Entity\MonsterMapmarker $mapmarker
     * @return Monster
     */
    public function addMapmarker(\AppBundle\Entity\MonsterMapmarker $mapmarker)
    {
        if (!$this->mapmarkers->contains($mapmarker)) {
            $this->mapmarkers[] = $mapmarker;
            $mapmarker->setMonster($this);
        }

        return $this;
    }

    /**
     * Remove mapmarkers
     *
     * @param \AppBundle\Entity\MonsterMapmarker $mapmarker
     */
    public function removeMapmarker(\AppBundle\Entity\MonsterMapmarker $mapmarker)
    {
        $this->mapmarkers->removeElement($mapmarker);
        $mapmarker->setMonster(null);
    }

    /**
     * Get mapmarkers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getMapmarkers()
    {
        return $this->mapmarkers;
    }

    /**
     * Add materials
     *
     * @param \AppBundle\Entity\Material $material
     * @return Monster
     */
    public function addMaterial(\AppBundle\Entity\Material $material)
    {
        if (!$this->materials->contains($material)) {
            $this->materials[] = $material;
            $material->addMonster($this);
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
     * Set ep
     *
     * @param string $ep
     * @return Monster
     */
    public function setEp($ep)
    {
        $this->ep = $ep;

        return $this;
    }

    /**
     * Get ep
     *
     * @return string 
     */
    public function getEp()
    {
        return $this->ep;
    }

    /**
     * Set region
     *
     * @param string $region
     * @return Monster
     */
    public function setRegion($region)
    {
        $this->region = $region;

        return $this;
    }

    /**
     * Get region
     *
     * @return string 
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * Set isStory
     *
     * @param boolean $isStory
     * @return Monster
     */
    public function setIsStory($isStory)
    {
        $this->isStory = $isStory;

        return $this;
    }

    /**
     * Get isStory
     *
     * @return boolean 
     */
    public function getIsStory()
    {
        return $this->isStory;
    }

    /**
     * Set hp
     *
     * @param string $hp
     * @return Monster
     */
    public function setHp($hp)
    {
        $this->hp = $hp;

        return $this;
    }

    /**
     * Get hp
     *
     * @return string 
     */
    public function getHp()
    {
        return $this->hp;
    }

    /**
     * Set resPhysic
     *
     * @param integer $resPhysic
     * @return Monster
     */
    public function setResPhysic($resPhysic)
    {
        $this->resPhysic = $resPhysic;

        return $this;
    }

    /**
     * Get resPhysic
     *
     * @return integer 
     */
    public function getResPhysic()
    {
        return $this->resPhysic;
    }

    /**
     * Set resLaser
     *
     * @param integer $resLaser
     * @return Monster
     */
    public function setResLaser($resLaser)
    {
        $this->resLaser = $resLaser;

        return $this;
    }

    /**
     * Get resLaser
     *
     * @return integer 
     */
    public function getResLaser()
    {
        return $this->resLaser;
    }

    /**
     * Set resEther
     *
     * @param integer $resEther
     * @return Monster
     */
    public function setResEther($resEther)
    {
        $this->resEther = $resEther;

        return $this;
    }

    /**
     * Get resEther
     *
     * @return integer 
     */
    public function getResEther()
    {
        return $this->resEther;
    }

    /**
     * Set resThermo
     *
     * @param integer $resThermo
     * @return Monster
     */
    public function setResThermo($resThermo)
    {
        $this->resThermo = $resThermo;

        return $this;
    }

    /**
     * Get resThermo
     *
     * @return integer 
     */
    public function getResThermo()
    {
        return $this->resThermo;
    }

    /**
     * Set resElectric
     *
     * @param integer $resElectric
     * @return Monster
     */
    public function setResElectric($resElectric)
    {
        $this->resElectric = $resElectric;

        return $this;
    }

    /**
     * Get resElectric
     *
     * @return integer 
     */
    public function getResElectric()
    {
        return $this->resElectric;
    }

    /**
     * Set resGravit
     *
     * @param integer $resGravit
     * @return Monster
     */
    public function setResGravit($resGravit)
    {
        $this->resGravit = $resGravit;

        return $this;
    }

    /**
     * Get resGravit
     *
     * @return integer 
     */
    public function getResGravit()
    {
        return $this->resGravit;
    }
}
