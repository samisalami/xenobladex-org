<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name = '';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description = '';

    /**
     * @var string
     *
     * @ORM\Column(name="locationNote", type="text")
     */
    private $location_note = '';

    /**
     * @var string
     *
     * @ORM\Column(name="conditions", type="text")
     */
    private $conditions = '';

    /**
     * @var string
     *
     * @ORM\Column(name="tasks", type="text")
     */
    private $tasks = '';

    /**
     * @var string
     *
     * @ORM\Column(name="solution", type="text")
     */
    private $solution = '';

    /**
     * @var string
     *
     * @ORM\Column(name="rewards", type="text")
     */
    private $rewards = '';

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
     * @ORM\Column(name="person_unrelated", type="string", length=255)
     */
    private $person_unrelated = '';

    /**
     * @var boolean
     *
     * @ORM\Column(name="has_person", type="boolean")
     */
    private $has_person = false;


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
}
