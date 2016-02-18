<?php

namespace AppBundle\Entity;

use AppBundle\Entity\MissionMapmarker;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * Mission
 *
 * @ORM\Table(name="xenobladex_mission")
 * @ORM\Entity()
 */
class Mission
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
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="locationNote", type="text", nullable=true)
     */
    private $location_note;

    /**
     * @var string
     *
     * @ORM\Column(name="conditions", type="text", nullable=true)
     */
    private $conditions;

    /**
     * @var string
     *
     * @ORM\Column(name="tasks", type="text", nullable=true)
     */
    private $tasks;

    /**
     * @var string
     *
     * @ORM\Column(name="solution", type="text", nullable=true)
     */
    private $solution;

    /**
     * @var string
     *
     * @ORM\Column(name="rewards", type="text", nullable=true)
     */
    private $rewards;

    /**
     * @ORM\ManyToOne(targetEntity="MissionType")
     * @ORM\JoinColumn(name="mission_type_id", referencedColumnName="id")
     */
    private $mission_type;

    /**
     * @ORM\ManyToOne(targetEntity="Person", cascade={"persist"})
     * @ORM\JoinColumn(name="person_id", referencedColumnName="id")
     */
    private $person;

    /**
     * @var string
     *
     * @ORM\Column(name="person_unrelated", type="string", length=255, nullable=true)
     */
    private $person_unrelated;

    /**
     * @var boolean
     *
     * @ORM\Column(name="has_person", type="boolean")
     */
    private $has_person = false;

    /**
     * @var string
     *
     * @ORM\Column(name="target_area", type="string", length=255, nullable=true)
     */
    private $target_area;

    /**
     * @var string
     *
     * @ORM\Column(name="sidejob_type", type="string", length=255, nullable=true)
     */
    private $sidejob_type;

    /**
     * @var integer
     *
     * @ORM\Column(name="difficulty", type="smallint")
     */
    private $difficulty = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="blade_level", type="smallint")
     */
    private $blade_level = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="chapter", type="smallint")
     */
    private $chapter = 0;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="MissionMapmarker", mappedBy="mission")
     * @Type("ArrayCollection<AppBundle\Entity\MissionMapmarker>")
     */
    private $mapmarkers;


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
     * @return Mission
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
     * @return Mission
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
     * Set tasks
     *
     * @param string $tasks
     * @return Mission
     */
    public function setTasks($tasks)
    {
        $this->tasks = $tasks;

        return $this;
    }

    /**
     * Get tasks
     *
     * @return string 
     */
    public function getTasks()
    {
        return $this->tasks;
    }

    /**
     * Set solution
     *
     * @param string $solution
     * @return Mission
     */
    public function setSolution($solution)
    {
        $this->solution = $solution;

        return $this;
    }

    /**
     * Get solution
     *
     * @return string 
     */
    public function getSolution()
    {
        return $this->solution;
    }

    /**
     * Set locationNote
     *
     * @param string $location_note
     * @return Mission
     */
    public function setLocationNote($location_note)
    {
        $this->location_note = $location_note;

        return $this;
    }

    /**
     * Get locationNote
     *
     * @return string 
     */
    public function getLocationNote()
    {
        return $this->location_note;
    }

    /**
     * Set conditions
     *
     * @param string $conditions
     * @return Mission
     */
    public function setConditions($conditions)
    {
        $this->conditions = $conditions;

        return $this;
    }

    /**
     * Get conditions
     *
     * @return string 
     */
    public function getConditions()
    {
        return $this->conditions;
    }

    /**
     * Set rewards
     *
     * @param string $rewards
     * @return Mission
     */
    public function setRewards($rewards)
    {
        $this->rewards = $rewards;

        return $this;
    }

    /**
     * Get rewards
     *
     * @return string 
     */
    public function getRewards()
    {
        return $this->rewards;
    }

    /**
     * Set mission_type
     *
     * @param \AppBundle\Entity\MissionType $mission_type
     * @return Mission
     */
    public function setMissionType(\AppBundle\Entity\MissionType $mission_type = null)
    {
        $this->mission_type = $mission_type;

        return $this;
    }

    /**
     * Get mission_type
     *
     * @return \AppBundle\Entity\MissionType 
     */
    public function getMissionType()
    {
        return $this->mission_type;
    }

    /**
     * Set person_unrelated
     *
     * @param string $personUnrelated
     * @return Mission
     */
    public function setPersonUnrelated($personUnrelated)
    {
        $this->person_unrelated = $personUnrelated;

        return $this;
    }

    /**
     * Get person_unrelated
     *
     * @return string 
     */
    public function getPersonUnrelated()
    {
        return $this->person_unrelated;
    }

    /**
     * Set person
     *
     * @param \AppBundle\Entity\Person $person
     * @return Mission
     */
    public function setPerson(\AppBundle\Entity\Person $person = null)
    {
        $this->person = $person;

        return $this;
    }

    /**
     * Get person
     *
     * @return \AppBundle\Entity\Person 
     */
    public function getPerson()
    {
        return $this->person;
    }

    /**
     * Set has_person
     *
     * @param boolean $hasPerson
     * @return Mission
     */
    public function setHasPerson($hasPerson)
    {
        $this->has_person = $hasPerson;

        return $this;
    }

    /**
     * Get has_person
     *
     * @return boolean 
     */
    public function getHasPerson()
    {
        return $this->has_person;
    }

    /**
     * Set target_area
     *
     * @param string $targetArea
     * @return Mission
     */
    public function setTargetArea($targetArea)
    {
        $this->target_area = $targetArea;

        return $this;
    }

    /**
     * Get target_area
     *
     * @return string 
     */
    public function getTargetArea()
    {
        return $this->target_area;
    }

    /**
     * Set sidejob_type
     *
     * @param string $sidejobType
     * @return Mission
     */
    public function setSidejobType($sidejobType)
    {
        $this->sidejob_type = $sidejobType;

        return $this;
    }

    /**
     * Get sidejob_type
     *
     * @return string 
     */
    public function getSidejobType()
    {
        return $this->sidejob_type;
    }

    /**
     * Set difficulty
     *
     * @param float $difficulty
     * @return Mission
     */
    public function setDifficulty($difficulty)
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    /**
     * Get difficulty
     *
     * @return float 
     */
    public function getDifficulty()
    {
        return $this->difficulty;
    }

    /**
     * Set blade_level
     *
     * @param integer $bladeLevel
     * @return Mission
     */
    public function setBladeLevel($bladeLevel)
    {
        $this->blade_level = $bladeLevel;

        return $this;
    }

    /**
     * Get blade_level
     *
     * @return integer 
     */
    public function getBladeLevel()
    {
        return $this->blade_level;
    }

    /**
     * Set chapter
     *
     * @param integer $chapter
     * @return Mission
     */
    public function setChapter($chapter)
    {
        $this->chapter = $chapter;

        return $this;
    }

    /**
     * Get chapter
     *
     * @return integer 
     */
    public function getChapter()
    {
        return $this->chapter;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->mapmarkers = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add mapmarkers
     *
     * @param MissionMapmarker $mapmarkers
     * @return Mission
     */
    public function addMapmarker(MissionMapmarker $mapmarkers)
    {
        $this->mapmarkers[] = $mapmarkers;

        return $this;
    }

    /**
     * Remove mapmarkers
     *
     * @param MissionMapmarker $mapmarker
     */
    public function removeMapmarker(MissionMapmarker $mapmarker)
    {
        $this->mapmarkers->removeElement($mapmarker);
        $mapmarker->setMission(null);
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
}
